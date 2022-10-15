import styles from "./notfound.module.css";

function PageNotFound() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={styles.box}>
          <div className={styles.text404}>404</div>
          <div className={styles.textnot}>Página no encontrada</div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;