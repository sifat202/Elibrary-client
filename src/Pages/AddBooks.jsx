import React, { useState } from 'react';
import { useAuth } from '../Authpovider/CustomHook'; // Adjust this path to match your file layout
import api from '../Api/api'; // Adjust this path to your centralized Axios file

const AddBook = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleAddBook = (e) => {
        e.preventDefault();
        setLoading(true);
        
        const form = e.target;
        const title = form.title.value;
        const imgUrl = form.imgUrl.value;
        const email = user?.email;

        // If a malicious user tries to bypass the UI disabled button state
        if (!email) {
            alert("You must be signed in to post a book.");
            setLoading(false);
            return;
        }

        const bookData = { title, imgUrl, email };

        // Make the short, clean Axios call straight to the endpoint
        api.post('/books', bookData)
            .then((res) => {
                // MongoDB response structure returns an insertedId upon success
                if (res.data.insertedId) {
                    alert('✨ Book published successfully to Elibrary!');
                    form.reset();
                }
            })
            .catch((error) => {
                console.error('Error posting book:', error);
                alert(error.response?.data?.message || 'Something went wrong while publishing.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-base-200 flex items-center justify-center px-4 py-8">
            {/* Main responsive wrapper card */}
            <div className="card bg-base-100 w-full max-w-lg shadow-xl border border-base-300 overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                
                {/* Visual Header Banner */}
                <div className="bg-[#006A4E] p-6 text-center text-white relative">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide">Publish a Book</h2>
                    <p className="text-xs md:text-sm text-emerald-100 mt-1">Share a resource with the Elibrary community</p>
                </div>

                <form onSubmit={handleAddBook} className="card-body gap-4 p-6 md:p-8">
                    
                    {/* Book Title Input Field */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-gray-700">Book Title</span>
                        </label>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="e.g., The Midnight Library" 
                            className="input input-bordered w-full focus:outline-[#006A4E] transition-all" 
                            required 
                        />
                    </div>

                    {/* Image Cover URL Input Field */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-gray-700">Cover Image URL</span>
                        </label>
                        <input 
                            type="url" 
                            name="imgUrl" 
                            placeholder="https://example.com/cover.jpg" 
                            className="input input-bordered w-full focus:outline-[#006A4E] transition-all" 
                            required 
                        />
                    </div>

                    {/* Authenticated Author Identity Read-Only Field */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-gray-700">Publisher Identity</span>
                        </label>
                        <div className="relative flex items-center">
                            <input 
                                type="email" 
                                value={user?.email || "Login required"} 
                                disabled 
                                className="input input-bordered w-full bg-base-200 text-gray-500 font-semibold cursor-not-allowed pl-10" 
                            />
                            {/* Decorative mail icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                            </svg>
                        </div>
                    </div>

                    {/* Safe Conditional Submit Button State */}
                    <div className="form-control mt-4">
                        {user ? (
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="btn bg-[#006A4E] hover:bg-[#00533d] text-white border-none w-full shadow-md rounded-lg text-base font-bold transition-all normal-case"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-md"></span>
                                ) : (
                                    'Add Book to Shelf'
                                )}
                            </button>
                        ) : (
                            <div className="alert alert-error shadow-sm rounded-lg py-3 text-sm flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-semibold text-white">Action locked. Please login via Navbar to continue.</span>
                            </div>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddBook;