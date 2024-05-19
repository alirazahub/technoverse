import React from 'react'
import { events } from './data'
import { notification } from 'antd'
import { useCookies } from 'react-cookie'
import server from '../../utils/server'
import axios from 'axios'
import { useFetch } from '../../hooks/useHooks'

function EventDetails({ eventId }) {
    const [cookies] = useCookies(['x-auth-token'])
    const { data: event, loading, error } = useFetch(`${server}/api/user/get-event/${eventId}`)

    const daysLeft = Math.floor((new Date(event?.endDate) - new Date()) / (1000 * 60 * 60 * 24))

    const handleVolunteer = () => {
        axios.post(`${server}/api/user/join-event`, { eventId }, {
            headers: {
                'x-auth-token': cookies['x-auth-token']
            }
        })
            .then((response) => {
                const { data } = response
                if (data.success) {
                    notification.success({
                        message: 'Volunteered',
                        description: 'You have volunteered for this event'
                    })
                }
            })
            .catch((error) => {
                console.error(error)
                notification.error({
                    message: 'Failed to volunteer',
                    description: 'An error occurred while volunteering for this event'
                })
            })
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div>
            <div className='relative'>
                <img className='blur object-cover' src={"/poster1.jpeg"} alt="event poster" />
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <h1 className='text-4xl font-bold'>{event?.eventName}</h1>
                    <p>{event?.eventDescription}</p>
                    <div>
                        {event?.eventTags.map((tag, index) => {
                            return (
                                <span key={index} className='bg-blue-200 px-2 py-1 rounded-lg m-1 capitalize'>{tag}</span>
                            )
                        }
                        )}
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            <p className='font-semibold'>Initiative ends</p>
                            <p>{daysLeft} days left</p>
                        </div>
                        <div>
                            <p className='font-semibold'>Participants</p>
                            <p>{event?.participants.length} Volunteers</p>
                        </div>
                        <div>
                            <p className='font-semibold'>Helping</p>
                            <p>{event?.helping.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className=' relative m-3 p-3'>
                <h2 className='text-2xl font-bold ml-5'>Info</h2>
                <div>
                    {/* {
                        event?.content.map((item, index) => {
                            return (
                                <div key={index} className='m-3 p-3 bg-red-200'>
                                    <h2 className='font-bold'>{item?.title}</h2>
                                    <p>{item?.content}</p>
                                </div>
                            )
                        })
                    } */}
                    <div className='m-3 p-3 bg-red-200'>
                        <h2 className='font-bold'>Event Details</h2>
                        <p>{event?.eventDetails}</p>
                    </div>
                </div>
                <div onClick={handleVolunteer} className='absolute top-0 right-5 bg-orange-400 px-3 py-2 rounded-lg text-white font-bold hover:bg-orange-600 cursor-pointer transition-all '>
                    Volunteer
                </div>
            </div>
        </div>
    )
}

export default EventDetails