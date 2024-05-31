import styles from "./AuthorInfo.module.css";

const AuthorInfo = ({ authorInfo, className }) => {
  const classes = `${styles["article-author"]} ${className ? className : ""}`

  return (
    <div className={classes}>
      <img
        src={authorInfo.photo}
        alt="Author Profile Picture"
      />
      <div className={styles["author-info"]}>
        <h4>{authorInfo.name}</h4>
        <small>{authorInfo.title}</small>
      </div>
    </div>
  );
};

export default AuthorInfo;
