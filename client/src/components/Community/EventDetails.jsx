import React from 'react'
import { events } from './data'
import { notification } from 'antd'

function EventDetails({ eventId }) {
    const event = events[eventId - 1]

    const handleVolunteer = () => {
        notification.success({
            message: 'Volunteered successfully',
            description: `You have volunteered for the event ${event.title}`,
            placement: 'bottomRight'
        })
    }

    return (
        <div>
            <div className='relative'>
                <img className='blur object-cover' src={event?.poster} alt="event poster" />
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <h1 className='text-4xl font-bold'>{event?.title}</h1>
                    <p>{event?.description}</p>
                    <div>
                        {event?.tags.map((tag, index) => {
                            return (
                                <span key={index} className='bg-blue-200 px-2 py-1 rounded-lg m-1 capitalize'>{tag}</span>
                            )
                        }
                        )}
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            <p className='font-semibold'>Initiative ends</p>
                            <p>{event?.daysLeft} days left</p>
                        </div>
                        <div>
                            <p className='font-semibold'>Participants</p>
                            <p>{event?.participants}</p>
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
                    {
                        event?.content.map((item, index) => {
                            return (
                                <div key={index} className='m-3 p-3 bg-red-200'>
                                    <h2 className='font-bold'>{item?.title}</h2>
                                    <p>{item?.content}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div onClick={handleVolunteer} className='absolute top-0 right-5 bg-orange-400 px-3 py-2 rounded-lg text-white font-bold hover:bg-orange-600 cursor-pointer transition-all '>
                    Volunteer
                </div>
            </div>
        </div>
    )
}

export default EventDetails