import { useLoaderData } from "react-router-dom";
import PostContent from "../components/Posts/PostContent";
import { extractPosts } from "../utils/postUtils";
import HttpError from "../errors/HttpError";
import { apiAcessToken, apiSpaceID } from "../config";

const PostPage = (props) => {
  const postData = useLoaderData();
  const formatedData = extractPosts(postData);

  if (formatedData.length === 0) {
    throw new HttpError(404, "Page not found.");
  }

  return <PostContent postInfo={formatedData[0]} />;
};

export default PostPage;

export async function loader({ request, params }) {
  const url = `https://cdn.contentful.com/spaces/${apiSpaceID}/environments/master/entries?access_token=${apiAcessToken}&sys.id=${params.postID}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw HttpError(
      response.status,
      "Could not fetch details for selected event."
    );
  } else {
    const data = await response.json();
    return data;
  }
}

