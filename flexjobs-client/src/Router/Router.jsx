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
import Module5Page from "../modules/Module5/Portfolio";
import Module6Page from "../modules/Module6/Module6Page";
import CareerAssessInterest from "../modules/Module5/CareerAssessInterest";
import Results from "../modules/Module5/Result"; 
import JobApplied from "../modules/Module5/JobApplied";

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
      { path: "/PostJob", element: <PostJob/> },
      { path: "/job/:id", element: <JobDetails/> },
      { path: "/ApplyJob", element: <ApplyJob/> },
      { path: "/Module3Page", element: <Module3Page/> },
      { path: "/Module4Page", element: <Module4Page/> },
      { path: "/Module5Page", element: <Module5Page/> },
      { path: "/Module6Page", element: <Module6Page/> },
      {path: "/CareerAssessInterest",element:< CareerAssessInterest/>},
      { path: "/results", element: <Results /> },
      {path:"/JobApplied",element:<JobApplied/>}


    ]
  },
]);

export default router;