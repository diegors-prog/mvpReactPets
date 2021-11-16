import React, { useContext } from 'react';
import styles from './Profile.module.css';
import { UserContext } from '../../UserContext';

const Profile = () => {
  const { data } = React.useContext(UserContext);

  function firstLetterUppercase(changeLetter) {
    let letter = changeLetter.slice(0, 1).toUpperCase();
    let restOfTheWord = changeLetter.slice(1);
    return letter + restOfTheWord;
  }

  return (
    <section className={`${styles.profile} container`}>
      <div className={styles.top}>
        <div className={styles.spanImage}>
          <span>{data.nome.slice(0, 1).toUpperCase()}</span>
        </div>
      </div>
      <div className={styles.title}>
        <h3>Olá, {firstLetterUppercase(data.nome)}</h3>
      </div>
    </section>
  );
};

export default Profile;
