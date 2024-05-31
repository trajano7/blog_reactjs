import { createContext, useState } from "react";
import { extractPosts } from "../utils/postUtils";

const BlogContext = createContext({
  posts: [],
  currentPage: 0,
  isLastPage: false,
  isLoading: false,
  tags: [],
  addNewPage: () => {},
  resetPagination: () => {},
  setIsLastPage: () => {},
  setTagList: () => {},
});

const BlogProvider = ({ children }) => {
  const [postsData, setPostsData] = useState({
    posts: [],
    currentPage: 0,
    isLastPage: false,
    tags: [],
  });

  const addNewPage = (newPosts) => {
    const formattedPosts = extractPosts(newPosts);
    setPostsData((prev) => {
      return {
        ...prev,
        posts: [...prev.posts, ...formattedPosts],
        currentPage: prev.currentPage + 1,
      };
    });
  };

  const resetPagination = (initialPosts) => {
    const formattedPosts = extractPosts(initialPosts);
    setPostsData((prev) => {
      return {
        posts: formattedPosts,
        currentPage: 1,
        isLastPage: false,
      };
    });
  };

  const setIsLastPage = () => {
    setPostsData((prev) => {
      return {
        ...prev,
        isLastPage: true,
      };
    });
  };

  const setTagList = (tags) => {
    const tagsList = tags.items.map((tag) => {
      return tag.name;
    });
    setPostsData((prev) => {
      return { ...prev, tags: tagsList };
    });
  };

  return (
    <BlogContext.Provider
      value={{
        ...postsData,
        addNewPage,
        resetPagination,
        setIsLastPage,
        setTagList,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export { BlogContext, BlogProvider };
