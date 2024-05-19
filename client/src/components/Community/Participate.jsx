import React, { useState } from 'react'
import ParticipateCard from './ParticipateCard'
import { events } from './data'
import { IoSearch } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'


function Participate() {
    const [query, setQuery] = useState('')
    const navigation = useNavigate()
    const [filteredEvents, setfilteredEvents] = useState(events)

    const handleSearch = (e) => {
        e.preventDefault()
        const filteredEvents = events.filter((event) => {
            return event.title.toLowerCase().includes(query.toLowerCase())
        })
        setfilteredEvents(filteredEvents)
        console.log(filteredEvents)
    }



    return (
        <div>
            <h1 className=' m-5 text-2xl font-bold'>Participate</h1>
            <div>
                <form onSubmit={handleSearch}>
                    <label className='mx-3 bg-gray-100 flex items-center py-2 px-5 rounded-full outline'>
                        <IoSearch className='text-gray-600 text-2xl' />
                        <input onChange={(e) => setQuery(e.target.value)} placeholder='Search' className='px-2 text-[14px] bg-gray-100 outline-none border-none' type="text" />
                    </label>
                </form>
            </div>
            {
                filteredEvents.map((event) => {
                    return (
                        <div key={event.id}>
                            <ParticipateCard event={event} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Participate