import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';
import server from '../utils/server';

export const useVerifyUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cookies] = useCookies(['x-auth-token']);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${server}/api/user/verify`, {
                headers: {
                    'x-auth-token': cookies['x-auth-token'],
                },
            });

            const { data } = response;

            if (data?.success) {
                setLoading(false);
                return data.user;
            }
        } catch (error) {
            setLoading(false);
            setError(error.message || 'An error occurred');
            console.error(error);
        }
    };

    return { fetchUser, loading, error };
};
