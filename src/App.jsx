import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RootPage from "./pages/Root";
import PostPage, { loader as postLoader } from "./pages/Post";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import { apiAcessToken, apiSpaceID, basename } from "./config";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Navigate to="/posts" />,
        },
        {
          path: "posts",
          children: [
            {
              index: true,
              element: <HomePage />,
            },
            {
              path: ":postID",
              element: <PostPage />,
              loader: postLoader,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: basename,
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
