import PostList from "./PostList";
import {
  useSearchParams,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../../store/BlogContext";
import useHttp from "../../hooks/use-http";
import BubblesLoading from "../UI/BubbleLoading";
import PageContent from "../UI/PageContent";

import styles from "./Posts.module.css";
import { apiAcessToken, apiSpaceID, basename } from "../../config";

const Posts = (props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [searchParams] = useSearchParams();
  const { isLoading, error, sendRequest } = useHttp();
  const ctx = useContext(BlogContext);
  const hasPosts = ctx.posts.length !== 0;

  if (error) {
    throw error;
  }

  const fetchPosts = (reset = false) => {
    const query = searchParams.get("query") || "";
    const tag = searchParams.get("tag");
    const order = searchParams.get("order") || "";

    const orderArg =
      order === "dateAsc" ? "fields.postData" : "-fields.postData";
    const queryArg = query && `&query=${query}`;
    const tagArg = tag ? `&metadata.tags.sys.id[in]=${tag.toLowerCase()}` : "";
    let url = requestURL + orderArg + queryArg + tagArg + "&limit=6&skip=";
    let applyFn = ctx.addNewPage;

    if (reset) {
      url += "0";
      applyFn = ctx.resetPagination;
    } else {
      url += ctx.currentPage * 6;
    }

    sendRequest({ url }, applyFn);
  };

  const onMorePostsHandler = () => {
    if (ctx.posts.length % 6 !== 0) {
      ctx.setIsLastPage();
    }
    fetchPosts();
  };

  useEffect(() => {
    if (!hasPosts || isMounted) {
      fetchPosts(true);
    }
  }, [searchParams]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {!hasPosts && !isLoading && (
        <PageContent title="No Posts Found">
          <a href={basename}>
            <p>Back to Home</p>
          </a>
        </PageContent>
      )}
      {hasPosts && (
        <PostList
          postList={ctx.posts}
          onMorePosts={onMorePostsHandler}
          lastPage={ctx.isLastPage}
          isLoading={isLoading}
        />
      )}
      {!hasPosts && isLoading && (
        <BubblesLoading className={styles["bubble-loading"]} />
      )}
    </>
  );
};

export default Posts;

const requestURL =
  `https://cdn.contentful.com/spaces/${apiSpaceID}/environments/master/entries?access_token=${apiAcessToken}&content_type=blogPost&select=sys.id,fields.postTitle,fields.postSummary,fields.featuredImage,fields.postData,fields.authorInfo,metadata.tags&order=`;
