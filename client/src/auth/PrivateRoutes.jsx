import { Navigate, Outlet } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useUser } from './UserContext'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { useVerifyUser } from '../hooks/useHooks'


const PrivateRoutes = () => {
    const [cookies] = useCookies(['x-auth-token']);
    const { user, updateUser } = useUser();
    const navigate = useNavigate();
    const { fetchUser, loading, error } = useVerifyUser();

    useEffect(() => {
        if (!user) {
            if (cookies["x-auth-token"]) {
                fetchUser().then((user) => {
                    if (user) {
                        updateUser(user);
                    }
                });
            }
            else {
                return navigate("/login");
            }
        }
    }, [user, cookies, fetchUser, updateUser, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Outlet />
    );

    // return (
    //     user ? <Outlet /> : <Navigate to='/login' />
    // )
}

export default PrivateRoutes