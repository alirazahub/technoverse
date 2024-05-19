import React, { useState, useEffect } from 'react'
import ParticipateCard from './ParticipateCard'
import { events } from './data'
import { IoSearch } from 'react-icons/io5'
import { useFetch } from '../../hooks/useHooks'
import server from '../../utils/server'


function Participate() {
    const [query, setQuery] = useState('')
    // const { data: events, loading, error } = useFetch(`${server}/api/user/get-all-events`)
    const [events, setEvents] = useState([])
    const [filteredEvents, setfilteredEvents] = useState([])


    const getAllEvents = async () => {
        try {
            const response = await fetch(`${server}/api/user/get-all-events`)
            const data = await response.json()
            console.log(data?.events)
            return data?.events
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllEvents().then((data) => {
            setEvents(data)
            setfilteredEvents(data)
        })
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        const filteredEvents = events.filter((event) => {
            return event.title.toLowerCase().includes(query.toLowerCase())
        })
        setfilteredEvents(filteredEvents)
        console.log(filteredEvents)
    }

    // if (loading) {
    //     return <p>Loading...</p>
    // }

    // if (error) {
    //     return <p>{error}</p>
    // }

    return (
        <div>
            <h1 className=' m-5 text-2xl font-bold'>Participate</h1>
            <div>
                <form onSubmit={handleSearch}>
                    <label className='mx-3 bg-gray-100 flex items-center py-2 px-5 rounded-full outline'>
                        <IoSearch className='text-gray-600 text-2xl' />
                        <input onChange={(e) => setQuery(e.target.value)} placeholder='Search' className='px-2 text-[14px] bg-gray-100 outline-none border-none w-full' type="text" />
                    </label>
                </form>
            </div>
            {events &&
                filteredEvents?.map((event) => {
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