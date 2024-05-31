import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { formatDate } from "../../utils/postUtils";
import AuthorInfo from "./AuthorInfo";
import styles from "./PostContent.module.css";
import { useEffect } from "react";

const PostContent = ({ postInfo }) => {
  const data = formatDate(postInfo.data);
  const tag = postInfo.tag.charAt(0).toUpperCase() + postInfo.tag.slice(1);
  const bodyHTML = documentToHtmlString(postInfo.body);

  useEffect(() => {
    window.scrollTo(0, 0);
  })

  return (
    <article className={styles["main-article"]}>
      <header>
        <div className={styles["article-meta"]}>
          <div>
            <span className={styles["article-category"]}>{tag} - </span>
            <span>{data}</span>
          </div>
          <div className={styles["article-desc"]}>
            <h1>{postInfo.title}</h1>
            <h3>{postInfo.summary}</h3>
          </div>
          <AuthorInfo
            className={styles["author-info"]}
            authorInfo={postInfo.author}
          />
        </div>
        <figure className={styles["article-img"]}>
          <img src={postInfo.featuredImage} alt={postInfo.imgTitle} />
        </figure>
      </header>
      <section>
        <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />
      </section>
    </article>
  );
};

export default PostContent;
