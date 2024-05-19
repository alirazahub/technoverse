import React from 'react'

function ParticipateCard({ event }) {
    return (
        <div>
            <img src={event.poster} alt="event poster" />
        </div>
    )
}

export default ParticipateCard