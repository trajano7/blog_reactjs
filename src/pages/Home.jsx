import { useLoaderData, useOutletContext } from "react-router-dom";
import FilterMenu from "../components/FilterMenu";
import Posts from "../components/Posts/Posts";
import { useEffect } from "react";

const HomePage = (props) => {
  const { tags } = useOutletContext();

  return (
    <>
      <FilterMenu tags={tags} />
      <Posts />
    </>
  );
};

export default HomePage;

