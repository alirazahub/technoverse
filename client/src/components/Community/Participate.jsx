import React from 'react'
import ParticipateCard from './ParticipateCard'
import { events } from './data'

function Participate() {
    return (
        <div>
            <h1>Participate</h1>
            {
                events.map((event) => {
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