import React from 'react'
import { Link } from 'react-router-dom'

function ParticipateCard({ event }) {
    return (
        <Link to={`/community/${event.id}`}>
            <div className='flex m-3 p-3 bg-red-100 rounded-lg hover:shadow-md transition-all'>
                <div className='w-1/3'>
                    <img src={event?.poster} alt="event poster" className='object-cover' />
                </div>
                <div className='mx-3 w-full flex flex-col justify-around gap-2'>
                    <h2 className='font-bold capitalize text-xl'>{event?.title}</h2>
                    <p>{event?.description}</p>
                    <div>
                        {event?.tags.map((tag, index) => {
                            return (
                                <span key={index} className='bg-blue-200 px-2 py-1 rounded-lg m-1 capitalize'>{tag}</span>
                            )
                        }
                        )}
                    </div>
                </div>
                <div>
                    <div>
                        <p>{event?.daysLeft} days left</p>
                    </div>
                    <div>
                        <p>{event?.participants} Volunteers</p>
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