import React, { useEffect } from 'react'
import Login from '../components/Forms/Login'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../auth/UserContext'
import { useCookies } from 'react-cookie'
import { useVerifyUser } from '../hooks/useHooks'


function Page() {
    const navigate = useNavigate()
    const { user } = useUser()
    const { fetchUser, loading, error } = useVerifyUser();
    const [cookies] = useCookies(['x-auth-token']);
    const { updateUser } = useUser();


    useEffect(() => {
        if (!user) {
            if (cookies["x-auth-token"]) {
                fetchUser().then((user) => {
                    if (user) {
                        updateUser(user);
                        navigate("/dashboard");
                    }
                });
            }
        }
    }, [user, cookies, fetchUser, updateUser, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <div className='bg-slate-100 '>
                <div className='grid grid-cols-2 sm:py-11 py-2'>
                    <div className='col-span-2 lg:col-span-1'>
                        <div className='flex  justify-center items-center my-5'>
                            <img src='/welcome.svg' className='w-[250px] h-[250px] lg:w-[450px] lg:h-[450px]' />
                        </div>
                    </div>
                    <div className='col-span-2 lg:col-span-1'>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='text-center text-3xl '>Welcome to <br /> community</h1>
                            <div className=' bg-white px-10 py-5 rounded-lg shadow-md my-5'>
                                <Login />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page