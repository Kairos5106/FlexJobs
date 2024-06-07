import {createBrowserRouter, Routes, Route} from "react-router-dom";

// Importing essential components
import App from "../App";

// Imports for Module 1
import Home from "../modules/Module1/Home";
import Signup from "../modules/Module1/Signup";
import Login from "../modules/Module1/Login";

// Imports for Module 2
import JobSearch from "../modules/Module2/JobSearch";

// Imports for Module 3
import Inbox from "../modules/Module3/Inbox";
import Feedback from "../modules/Module3/Feedback";

// Imports for Module 4
import Module4Page from "../modules/Module4/Module4Page";

// Imports for Module 5
import Module5Page from "../modules/Module5/Portfolio";
import CareerAssessInterest from "../modules/Module5/CareerAssessInterest";
import Results from "../modules/Module5/Result"; 
import JobApplied from "../modules/Module5/JobApplied";

// Imports for Module 6
import Module6Page from "../modules/Module6/Module6Page";

// Modules Page Navigation (the path to the page)
// Please configure/reconfigure here and include the import
const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        // Routes for Module 1
        { path: "/", element: <Home/> },
        { path: "/Login", element: <Login/> },
        { path: "/Signup", element: <Signup/> },

        // Routes for Module 2
        { path: "/JobSearch", element: <JobSearch/> },
        { path: "/Inbox", element: <Inbox/> },
        { path: "/Feedback", element: <Feedback/> },
        { path: "/Module4Page", element: <Module4Page/> },

        // Routes for Module 5
        { path: "/Module5Page", element: <Module5Page/> },
        {path: "/CareerAssessInterest",element:< CareerAssessInterest/>},
      { path: "/results", element: <Results /> },
      {path:"/JobApplied",element:<JobApplied/>},

        // Routes for Module 6
        { path: "/Module6Page", element: <Module6Page/> }
      ]
    },
  ]);

export default router;