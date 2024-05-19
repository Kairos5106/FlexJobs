import {
    createBrowserRouter
  } from "react-router-dom";
import App from "../App";
import Home from "../modules/Module1/Home";
import JobSearch from "../modules/Module2/JobSearch";
import Module3Page from "../modules/Module3/Module3Page";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        { path: "/", element: <Home/> },
        { path: "/JobSearch", element: <JobSearch/> },
        { path: "/Module3Page", element: <Module3Page/> }
      ]
    },
  ]);

export default router;