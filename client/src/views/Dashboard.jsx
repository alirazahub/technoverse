import React from 'react'
import { useUser } from '../auth/UserContext'
import AirQuality from '../components/AirQuality';
import Weather from '../components/Weather';
import ClimateData from '../components/ClimateData';

function Dashboard() {
    const { user } = useUser()
    

    return (
        <>
            <div>Welcome {user?.email} to your Dashboard</div>
            <Weather />
            <AirQuality />
        </>
    )
}

export default Dashboard