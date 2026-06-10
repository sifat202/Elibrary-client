import React, { useEffect, useState } from 'react';
import api from '../../Api/api'; // Adjust path if needed based on your file structure
import BookCards from './BookCards';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/books')
            .then((res) => {
                setBooks(res.data);
            })
            .catch((err) => {
                console.error("Error fetching books:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-[#006A4E] bg-[#006A4E]/10 px-3 py-1 rounded-full">
                    Explore Gallery
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 mt-3 tracking-tight">
                    The <span className="text-[#006A4E]">E-Library</span> Bookshelf
                </h1>
                <p className="mt-3 text-base text-gray-500 max-w-xl mx-auto">
                    Browse a curated collective collection of community-contributed books, guides, and educational tutorials.
                </p>
                <div className="w-24 h-1 bg-[#006A4E] mx-auto mt-6 rounded-full"></div>
            </div>

            {/* Main Content Grid Area */}
            <div className="max-w-7xl mx-auto">
                {loading ? (
                    /* Updated Skeleton Grid to show 2 columns on extra small/mobile screens */
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="flex flex-col gap-3 w-full">
                                <div className="skeleton h-44 sm:h-72 w-full rounded-2xl"></div>
                                <div className="skeleton h-4 w-20 sm:w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>
                        ))}
                    </div>
                ) : books.length === 0 ? (
                    /* Beautiful Empty State if Database holds 0 books */
                    <div className="text-center card bg-base-100 border border-base-300 max-w-md mx-auto p-8 rounded-2xl shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 stroke-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 className="mt-4 text-lg font-bold text-gray-800">No books found</h3>
                        <p className="text-gray-500 text-sm mt-1">Be the very first community member to publish a book to this shelf!</p>
                    </div>
                ) : (
                    /* Updated Content Grid: changed 'grid-cols-1' to 'grid-cols-2' and adapted responsive gap rules */
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                        {books.map((item) => (
                            <BookCards key={item._id} book={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Books;