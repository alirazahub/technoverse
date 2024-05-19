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

export const useAddEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cookies] = useCookies(['x-auth-token']);

    const addEvent = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post(`${server}/api/user/add-event`, values, {
                headers: {
                    'x-auth-token': cookies['x-auth-token'],
                },
            });

            const { data } = response;

            if (data?.success) {
                setLoading(false);
                return data;
            }
        } catch (error) {
            setLoading(false);
            setError(error.message || 'An error occurred');
            console.error(error);
        }
    };

    return { addEvent, loading, error };
};

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                const { data } = response;
                console.log(data?.events)
                setData(data?.events);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error.message || 'An error occurred');
                console.error(error);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}
