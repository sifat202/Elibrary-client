import { createBrowserRouter } from "react-router";
import Homelayout from "../Homelayout/Homelayout";
import Home from "../Pages/Home";
import AddBook from "../Pages/AddBooks";
import Books from "../Pages/Books/Books";
import ManageBooks from "../Pages/Manage/ManageBooks";
import placeRequests from "../Pages/RequestBook/placeRequests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout />, // <-- Add the angle brackets here!
    children:[
        {
            path:"/home",
            element:<Home></Home>
        },
        {
            path:"/addBooks",
            element:<AddBook></AddBook>
        },
        {
            path:"books",
            element:<Books></Books>
        },
        {
            path:"manageBooks",
            element:<ManageBooks></ManageBooks>
        },
        {
            path:"request/:id"
            ,
            Component:placeRequests
        }
    ]
  }
]);