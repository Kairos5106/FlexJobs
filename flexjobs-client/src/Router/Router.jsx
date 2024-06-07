import {createBrowserRouter, Routes, Route} from "react-router-dom";

// Importing essential components
import App from "../App";

// Imports for Module 1
import Home from "../modules/Module1/Home";
import Signup from "../modules/Module1/Signup";
import Login from "../modules/Module1/Login";

// Imports for Module 2
import JobSearch from "../modules/Module2/JobSearch";
import PostJob from "../modules/Module2/PostJob";
import JobDetails from "../modules/Module2/JobDetails";
import ApplyJob from "../modules/Module2/ApplyJob";

// Imports for Module 3
import Inbox from "../modules/Module3/Inbox";
import Feedback from "../modules/Module3/Feedback";

// Imports for Module 4
import Payments from "../modules/Module4/Payments";

// Imports for Module 5
import Portfolio from "../modules/Module5/Portfolio";
import CareerAssessInterest from "../modules/Module5/CareerAssessInterest";
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
        { path: "/PostJob", element: <PostJob/> },
        { path: "/job/:id", element: <JobDetails/> },
        { path: "/ApplyJob", element: <ApplyJob/> },

// Routes for Module 3
        { path: "/Inbox", element: <Inbox/> },
        { path: "/Feedback", element: <Feedback/> },

        // Routes for Module 4
        { path: "/Payments", element: <Payments/> },

        // Routes for Module 5
        { path: "/Portfolio", element: <Portfolio/> },
        { path: "/CareerAssessInterest", element: <CareerAssessInterest/> },
        { path: "/JobApplied", element: <JobApplied/> },

        // Routes for Module 6
        { path: "/Module6Page", element: <Module6Page/> }
      ]
    },
  ]);

export default router;