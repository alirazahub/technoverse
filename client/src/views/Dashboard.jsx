import React from 'react'
import { useUser } from '../auth/UserContext'

function Dashboard() {
    const { user } = useUser()

    return (
        <>
            <div>Welcome {user?.email} to your Dashboard</div>
        </>
    )
}

export default Dashboard