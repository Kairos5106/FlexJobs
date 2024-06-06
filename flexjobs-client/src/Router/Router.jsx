import {
    createBrowserRouter
  } from "react-router-dom";
import App from "../App";
import Home from "../modules/Module1/Home";
import JobSearch from "../modules/Module2/JobSearch";
import PostJob from "../modules/Module2/PostJob";
import JobDetails from "../modules/Module2/JobDetails";
import ApplyJob from "../modules/Module2/ApplyJob";
import Module3Page from "../modules/Module3/Module3Page";
import Module4Page from "../modules/Module4/Module4Page";
import Module5Page from "../modules/Module5/Module5Page";
import Module6Page from "../modules/Module6/Module6Page";

// Modules Page Navigation (the path to the page)
// Please configure/reconfigure here
// And include the import
const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        // Module 1
        { path: "/", element: <Home/> },

        // Module 2
        { path: "/JobSearch", element: <JobSearch/> },
        { path: "/PostJob", element: <PostJob/> },
        { path: "/job/:id", element: <JobDetails/> },
        { path: "/ApplyJob", element: <ApplyJob/> },

        // Module 3
        { path: "/Module3Page", element: <Module3Page/> },

        // Module 4
        { path: "/Module4Page", element: <Module4Page/> },

        // Module 5
        { path: "/Module5Page", element: <Module5Page/> },

        // Module 6
        { path: "/Module6Page", element: <Module6Page/> }
      ]
    },
  ]);

export default router;