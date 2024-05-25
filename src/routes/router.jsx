import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login";
import DefaultLayouts from "../components/layouts/DefaultLayouts";
import Register from "../auth/Register";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Profile from "../auth/Profile";
import GuestLayout from "../components/layouts/GuestLayout";
import ForgotPassword from "../auth/ForgotPassword";
import ChatList from "../components/chatlist";
import MainContent from "../auth/views/main/MainContent";
import DefaultHomePageLayout from "../auth/views/ui/DefaultHomePageLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <HelmetProvider>
                <Helmet>
                    <title>Homepage</title>
                </Helmet>
                <DefaultLayouts />
            </HelmetProvider>
        ),
        children: [
            {
                path: '/dashboard',
                element: (
                    <>
                        <Helmet>
                            <title>Homepage</title>
                        </Helmet>
                        <DefaultHomePageLayout />
                    </>
                ),
            },
            {
                path: '/profile',
                element: (
                    <>
                        <Helmet>
                            <title>Profile</title>
                        </Helmet>
                        <Profile />
                    </>
                ),
            },
            {
                path: '/chat',
                element: (
                    <>
                        <Helmet>
                            <title>Chat - Messenger</title>
                        </Helmet>
                        <ChatList />
                    </>
                ),
            },
        ],
    },
    {
        path: '/',
        element: (
            <HelmetProvider>
                <Helmet>
                    <title>Home</title>
                </Helmet>
                <GuestLayout />
            </HelmetProvider>
        ),
        children: [
            {
                path: '/login',
                element: <>
                            <Helmet>
                            <title>Login</title>
                        </Helmet>
                        <Login />,
                        </>,
            },
            {
                path: '/register',
                element: (
                    <>
                        <Helmet>
                            <title>Register</title>
                        </Helmet>
                        <Register />
                    </>
                ),
            },
            {
                path: '/forgot',
                element: (
                    <>
                        <Helmet>
                            <title>Forgot Password</title>
                        </Helmet>
                        <ForgotPassword />
                    </>
                ),
            },
        ],
    },
]);


export default router;