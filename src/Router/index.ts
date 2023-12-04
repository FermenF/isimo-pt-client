import { createBrowserRouter } from "react-router-dom";
import App from "@components/layouts/App";
import Home from "@pages/Home/Home";
import Login from "@pages/Auth/Login";
import Register from "@pages/Auth/Register";

export const routes = createBrowserRouter([
    {
        path: '',
        Component: App,
        children: [
            {
                index: true,
                Component: Home
            }
        ]    
    },
    {
        path: 'login',
        Component: Login,
    },
    {
        path: 'register',
        Component: Register,
    }
]);