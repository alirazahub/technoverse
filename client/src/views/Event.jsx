import React from 'react'
import { useParams } from 'react-router-dom'
import EventDetails from '../components/Community/EventDetails'

function Event() {
    const { eventId } = useParams()
    return (
        <div>
            <EventDetails eventId={eventId} />
        </div>
    )
}

export default Event