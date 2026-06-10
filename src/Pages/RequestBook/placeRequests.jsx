import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import api from '../../Api/api';
import { useAuth } from '../../Authpovider/CustomHook';

const PlaceRequests = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [requesting, setRequesting] = useState(false);

    // Rental duration states
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(5);

    useEffect(() => {
        api.get(`/books/${id}`)
            .then((res) => setBook(res.data))
            .catch((err) => console.error("Error fetching single book:", err))
            .finally(() => setLoading(false));
    }, [id]);

    const handleRequestBook = async () => {
        if (!user?.email) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        const d = parseInt(days) || 0;
        const h = parseInt(hours) || 0;
        const m = parseInt(minutes) || 0;

        const totalMinutes = (d * 24 * 60) + (h * 60) + m;

        if (totalMinutes < 1) {
            alert("Please input a valid time length (Minimum requirement is 1 Minute).");
            return;
        }

        // if (book.email === user.email) {
        //     alert("You cannot borrow your own book.");
        //     return;
        // }

        const requestData = {
            bookId: book._id,
            bookTitle: book.title,
            lenderEmail: book.email,
            borrowerEmail: user.email,
            durationDays: d,
            durationHours: h,
            durationMinutes: m
        };

        setRequesting(true);

        try {
            const response = await api.post('/borrows', requestData);
            
            if (response.data.insertedId) {
                alert(
                    `Success! Requested "${book.title}" for ${d}d ${h}h ${m}m.\n\n` +
                    `You will receive an email confirmation shortly.\n` +
                    `The book will be automatically returned after the time period ends.`
                );

                setBook(prev => ({
                    ...prev,
                    status: "unavailable"
                }));

                // Optional: Navigate to my books page after 2 seconds
                setTimeout(() => {
                    navigate('/books');
                }, 2000);
            }
        } catch (err) {
            console.error("Error borrowing book:", err);
            alert(
                err.response?.data?.message ||
                "Failed to process request. Please try again."
            );
        } finally {
            setRequesting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-emerald-600">
                    Loading book details...
                </span>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="text-center py-20 text-red-500 font-semibold text-xl">
                Book not found!
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto my-12 px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 p-6 md:p-10">

                {/* Left Side */}
                <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4">
                    <img
                        src={book.imgUrl}
                        alt={book.title}
                        className="w-full max-h-[500px] object-contain rounded-lg shadow-md transition-transform hover:scale-105 duration-300"
                    />
                </div>

                {/* Right Side */}
                <div className="flex flex-col justify-between space-y-6">

                    <div>
                        <span
                            className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full mb-3 ${
                                book.status === 'available'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-red-100 text-red-800'
                            }`}
                        >
                            {book.status}
                        </span>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 capitalize tracking-tight mb-2">
                            {book.title}
                        </h1>

                        <p className="text-sm text-gray-500 mb-6">
                            Shared by:
                            <span className="text-emerald-600 font-medium ml-1">
                                {book.email}
                            </span>
                        </p>

                        <hr className="border-gray-200 my-4" />

                        <div className="space-y-4">

                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                                    Book ID
                                </h3>
                                <p className="text-gray-700 font-mono text-sm bg-gray-50 p-2 rounded mt-1">
                                    {book._id}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                                    About this book
                                </h3>
                                <p className="text-gray-600 leading-relaxed mt-1">
                                    This classic masterpiece, titled{" "}
                                    <span className="italic">
                                        "{book.title}"
                                    </span>{" "}
                                    is currently listed as {book.status} for requests.
                                </p>
                            </div>

                            {user?.email && (
                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        Borrowing as:
                                        <span className="font-semibold ml-1">
                                            {user.email}
                                        </span>
                                    </p>
                                </div>
                            )}

                            {book.status === 'available' && (
                                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl mt-4">

                                    <label className="block text-sm font-bold text-emerald-900 mb-3">
                                        Set your Custom Rental Duration:
                                    </label>

                                    <div className="grid grid-cols-3 gap-3">

                                        <div>
                                            <span className="block text-xs font-semibold text-gray-500 mb-1">
                                                Days
                                            </span>
                                            <input
                                                type="number"
                                                min="0"
                                                value={days}
                                                onChange={(e) =>
                                                    setDays(
                                                        Math.max(
                                                            0,
                                                            parseInt(e.target.value) || 0
                                                        )
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>

                                        <div>
                                            <span className="block text-xs font-semibold text-gray-500 mb-1">
                                                Hours
                                            </span>
                                            <input
                                                type="number"
                                                min="0"
                                                max="23"
                                                value={hours}
                                                onChange={(e) =>
                                                    setHours(
                                                        Math.max(
                                                            0,
                                                            parseInt(e.target.value) || 0
                                                        )
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>

                                        <div>
                                            <span className="block text-xs font-semibold text-gray-500 mb-1">
                                                Minutes
                                            </span>
                                            <input
                                                type="number"
                                                min="0"
                                                max="59"
                                                value={minutes}
                                                onChange={(e) =>
                                                    setMinutes(
                                                        Math.max(
                                                            0,
                                                            parseInt(e.target.value) || 0
                                                        )
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                            />
                                        </div>

                                    </div>

                                    <p className="text-xs text-gray-500">
    After {days}d {hours}h {minutes}m, the book will be automatically returned
</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={handleRequestBook}
                            disabled={book.status !== 'available' || requesting}
                            className={`w-full py-4 text-center text-white font-semibold rounded-xl tracking-wide shadow-md transition-all duration-200 transform active:scale-[0.98] ${
                                book.status === 'available' && !requesting
                                    ? 'bg-[#00533d] hover:bg-[#003d2c] hover:shadow-lg'
                                    : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {requesting 
                                ? 'Processing...' 
                                : book.status === 'available'
                                    ? `Lend in One-Click (${days}d ${hours}h ${minutes}m)`
                                    : 'Currently Borrowed'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PlaceRequests;