import { formatDate } from "../../utils/postUtils";
import AuthorInfo from "./AuthorInfo";
import styles from "./PostCard.module.css";

const limitString = (str, limite) => {
  if (str.length > limite) {
    return str.substring(0, limite - 3) + '...';
  } else {
    return str;
  }
}

const PostCard = ({ postInfo, verticalLayout }) => {
  const data = formatDate(postInfo.data);
  const summary = limitString(postInfo.summary, 128);
  const title = limitString(postInfo.title, 56);
  const tag = postInfo.tag.charAt(0).toUpperCase() + postInfo.tag.slice(1);
  const image = postInfo.featuredImage + "?f=center&fit=fill&w=1600&h=900"

  const classes = `${styles["article-card"]} ${verticalLayout ? styles["article-card--vertical"] : ''}`

  return (
    <article className={classes}>
      <figure className={styles["article-img"]}>
        <img
          src={image}
          alt={postInfo.imgTitle}
        />
      </figure>
      <div className={styles["article-info"]}>
        <div className={styles["article-content"]}>
          <div className={styles["article-meta"]}>
            <span className={styles["article-category"]}>{tag} - </span>
            <span>{data}</span>
          </div>
          <h2>{title}</h2>
          <p>
            {summary}
          </p>
        </div>
        <AuthorInfo authorInfo={postInfo.author} />
      </div>
    </article>
  );
};

export default PostCard;
