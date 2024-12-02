import styles from './Loader.module.css'; // Подключаем CSS-модуль

const Loader = () => {
  return (
    <div className={styles.circle}>
      <div className={styles.wave}></div>
    </div>
  );
};

export default Loader;
