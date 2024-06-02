import {
    createBrowserRouter
  } from "react-router-dom";
import App from "../App";
import Home from "../modules/Module1/Home";
import JobSearch from "../modules/Module2/JobSearch";
import Module3Page from "../modules/Module3/Module3Page";
import Payments from "../modules/Module4/Payments";
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
        { path: "/", element: <Home/> },
        { path: "/JobSearch", element: <JobSearch/> },
        { path: "/Module3Page", element: <Module3Page/> },
        { path: "/Payments", element: <Payments/> },
        { path: "/Module5Page", element: <Module5Page/> },
        { path: "/Module6Page", element: <Module6Page/> }
      ]
    },
  ]);

export default router;