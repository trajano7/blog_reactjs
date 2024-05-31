import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import { BlogProvider } from "../store/BlogContext";
import { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { apiAcessToken, apiSpaceID } from "../config";

const RootPage = (props) => {
  const { sendRequest, error } = useHttp();
  const [tags, setTags] = useState(["All Tags"]);

  const setTagList = (tagsData) => {
    const tags = tagsData.items.map((tag) => {
      return tag.name;
    });
    setTags((prev) => {
      return [...prev, ...tags];
    });
  };

  useEffect(() => {
    sendRequest({ url }, setTagList);
  }, []);

  return (
    <>
      <Header />
      <BlogProvider>
        <Outlet context={{ tags: tags }} />
      </BlogProvider>
    </>
  );
};

export default RootPage;

const url =
  `https://cdn.contentful.com/spaces/${apiSpaceID}/environments/master/tags?access_token=${apiAcessToken}`;
