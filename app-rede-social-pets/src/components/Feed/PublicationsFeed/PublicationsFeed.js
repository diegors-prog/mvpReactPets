import React from 'react';
import styles from './PublicationsFeed.module.css';
import { ReactComponent as Views } from '../../../Assets/ionic-md-thumbs-up.svg';
import { ReactComponent as Comments } from '../../../Assets/awesome-comment-dots.svg';
import { UserContext } from '../../../UserContext';
import PublicationDelete from './PublicationDelete/PublicationDelete';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from '../../../Hooks/useFetch';
import { PUBLICATION_GET } from '../../../api';
import CommentPublication from '../CommentPublication/CommentPublication';
import CommentForm from '../CommentForm/CommentForm';

const PublicationsFeed = ({ publication }) => {
  const user = React.useContext(UserContext);
  const { data, error, loading, request } = useFetch();
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    async function fetchPublication() {
      const { url, options } = PUBLICATION_GET(publication.id);
      const { response, json } = await request(url, options);
      console.log(json);
    }
    fetchPublication();
  }, [publication, request]);

  if (data)
    return (
      <div className={styles.publication}>
        <div className={styles.profile}>
          <div className={styles.profile2}>
            <div>
              <span>{publication.author.slice(0, 1).toUpperCase()}</span>
            </div>
            <p>{publication.author}</p>
          </div>
          {user.data && user.data.username === publication.author ? (
            <PublicationDelete id={publication.id} />
          ) : (
            <p></p>
          )}
        </div>
        <div>
          <img src={publication.src} className={styles.img} alt="imagem html" />
        </div>
        <div className={styles.description}>
          <div className={styles.viewComment}>
            <h2>{publication.title}</h2>
            <div className={styles.icons}>
              <Views className={styles.svg} />
              <Button
                className={styles.commentButton}
                variant="primary"
                onClick={handleShow}
              >
                <Comments className={styles.svg} />
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Comentários</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {data && data.comments.length == 0 ? (
                    <div key={data.photo.id}>
                      <p>Sem comentários</p>
                    </div>
                  ) : (
                    data.comments.map((item) => (
                      <CommentPublication
                        key={item.comment_ID}
                        id={item.comment_post_ID}
                        item={item}
                      />
                    ))
                  )}
                  <CommentForm id={data.comment_post_ID} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <span>{publication.tipo_animal}</span>
          <p>{publication.description}</p>
        </div>
      </div>
    );
  else return null;
};

export default PublicationsFeed;
