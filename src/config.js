const apiSpaceID = import.meta.env.VITE_REACT_APP_CONTENTFUL_SPACE_ID;
const apiAcessToken = import.meta.env.VITE_REACT_APP_CONTENTFUL_ACCESS_TOKEN;
const basename = process.env.NODE_ENV === "production" ? basename = "/blog_reactjs" : "/";
  
export { apiSpaceID, apiAcessToken, basename };
