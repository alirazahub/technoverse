import React from 'react'
import { Link } from 'react-router-dom'

function ParticipateCard({ event }) {
    const daysLeft = Math.floor((new Date(event?.eventDate) - new Date()) / (1000 * 60 * 60 * 24))
    return (
        <Link to={`/community/${event._id}`}>
            <div className='flex m-3 p-3 bg-red-100 rounded-lg hover:shadow-md transition-all'>
                <div className='w-1/3'>
                    <img src={"/poster1.jpeg"} alt="event poster" className='object-cover' />
                </div>
                <div className='mx-3 w-full flex flex-col justify-around gap-2'>
                    <h2 className='font-bold capitalize text-xl'>{event?.eventName}</h2>
                    <p>{event?.eventDescription}</p>
                    <div>
                        {event?.eventTags.map((tag, index) => {
                            return (
                                <span key={index} className='bg-blue-200 px-2 py-1 rounded-lg m-1 capitalize'>{tag}</span>
                            )
                        }
                        )}
                    </div>
                </div>
                <div>
                    <div>
                        <p>{daysLeft} days left</p>
                    </div>
                    <div>
                        <p>{event?.participants.length} Volunteers</p>
                    </div>
                    <div>
                        <p>Helping {event?.helping.join(', ')}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ParticipateCard