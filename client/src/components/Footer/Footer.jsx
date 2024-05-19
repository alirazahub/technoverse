import { Link } from 'react-router-dom'
import React from 'react'

function Footer() {
    return (
        <footer className='bg-white py-5'>
            <div className=" mx-[30px] text-[14px] text-center flex justify-center sm:justify-between">
                <div className='hidden sm:block'>&copy; 2024 <Link target='_blank' href="https://www.github.com/abdulhadihub">PUCON.</Link>  All rights reserved.</div>
                <div>Designed and developed by <Link target='_blank' href="https://www.github.com/alirazahub">TechTitans</Link></div>
            </div>
        </footer>
    )
}

export default Footer