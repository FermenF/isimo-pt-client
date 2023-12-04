import { createBrowserRouter } from "react-router-dom";
import App from "@components/layouts/App";
import Home from "@pages/Home/Home";
import Login from "@pages/Auth/Login";
import Register from "@pages/Auth/Register";
import Users from "@pages/User/Users";
import UserShow from "@pages/User/UserShow";

export const routes = createBrowserRouter([
    {
        path: '',
        Component: App,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'users',
                Component: Users,
            },
            {
                path: 'users/:id',
                Component: UserShow,
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
    },
]);