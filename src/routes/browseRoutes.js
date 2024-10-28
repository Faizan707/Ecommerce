import { createBrowserRouter } from "react-router-dom"
import { PAGES } from "./routes.js"
import Home from "../pages/Home.jsx"
import SignUp from "../pages/SignUp.jsx"
import Login from "../pages/Login.jsx"
import AdminLogin from "../pages/AdminLogin.jsx"
import AdminDashboard from "../pages/AdminDashboard.jsx"
import ProductsByCategories from "../pages/ProductsByCategories.jsx"
 export const router = createBrowserRouter([
    
    {
    path:PAGES.Home,
    element:<Home/>
    },
    {
        path:PAGES.Register,
        element:<SignUp/>
    },
    {
        path:PAGES.Login,
        element:<Login/>
    },
    {
        path:PAGES.AdminLogin,
        element:<AdminLogin/>
    },
    {
        path:PAGES.AdminDashboard,
        element:<AdminDashboard/>
    },
    {
        path:PAGES.ProductsByCategories,
        element:<ProductsByCategories/>
    }


])