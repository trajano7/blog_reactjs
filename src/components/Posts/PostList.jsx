import PostCard from "./PostCard";
import { Link } from "react-router-dom";

import styles from "./PostList.module.css";
import { IoIosArrowDown } from "react-icons/io";
import BubblesLoading from "../UI/BubbleLoading";
import { IconContext } from "react-icons";

const PostList = ({ postList, onMorePosts, lastPage, isLoading }) => {
  const posts = postList.map((post, index) => (
    <li key={post.id} className={styles["fade-in"]} style={{ animationDelay: `${index * 0.1}s` }}>
      <Link to={post.id}>
        <PostCard postInfo={post} />
      </Link>
    </li>
  ));

  const getMorePosts = (event) => {
    event.preventDefault();
    onMorePosts();
  };

  let nextPage = (
    <div>
      <button onClick={getMorePosts}>
        <IconContext.Provider value={{ className: styles["arrow-icon"] }}>
          <IoIosArrowDown />
        </IconContext.Provider>
        Show More
      </button>
    </div>
  );
  if (lastPage) {
    nextPage = <p>No More Posts</p>;
  }

  if (isLoading) {
    nextPage = <BubblesLoading />;
  }

  return (
    <div className={styles["main-page"]}>
      <ul className={styles["post-list"]}>{posts}</ul>
      {nextPage}
    </div>
  );
};

export default PostList;
