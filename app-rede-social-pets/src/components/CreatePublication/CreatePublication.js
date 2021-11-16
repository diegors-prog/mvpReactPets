import React from 'react';
import styles from './CreatePublication.module.css';
import { useNavigate } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { PUBLICATION_POST } from '../../api';
import Error from '../Errors/Error';

const CreatePublication = () => {
  const nome = useForm();
  const tipo = useForm();
  const descricao = useForm();
  const [img, setImg] = React.useState({ preview: null, raw: null });
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate('/');
  }, [data, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nome', nome.value);
    formData.append('tipo_animal', tipo.value);
    formData.append('descricao', descricao.value);
    formData.append('img', img.raw);
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
    }

    const token = window.localStorage.getItem('token');
    const { url, options } = PUBLICATION_POST(formData, token);
    request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.createPublication} animeLeft container`}>
      <form onSubmit={handleSubmit}>
        <h3 className="title">Poste a fuga de seu pet</h3>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Tipo" type="text" name="tipo" {...tipo} />
        <Input label="Decrição" type="text" name="descricao" {...descricao} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default CreatePublication;
