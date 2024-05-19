import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';


const MainContent = ({ children }) => {
    return <main className="bg-slate-100">
        <div className="h-[50px]">
            <Navbar />
        </div>
            {children}
        <Footer />
    </main>;
};

export default MainContent;
