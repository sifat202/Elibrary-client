import React from 'react';
import { Outlet } from 'react-router'; 
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Homelayout = () => {
    return (
        /* Expanded to full screen height and width dynamically */
        <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto px-4 md:px-8">
            <Navbar />
            
            {/* The main content scales up to fill remaining space, pushing footer down */}
            <main className="flex-grow ">
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default Homelayout;