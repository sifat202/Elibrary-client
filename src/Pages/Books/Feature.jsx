import React, { useEffect, useState } from 'react';
import api from '../../Api/api';
import BookCards from './BookCards';
import FreeCards from './FreeCards';

const FeaturedMarquee = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Array of target IDs to filter by
    const targetIds = [
        "6a29ab31db6182e7249889c5",
        "6a29ab0bdb6182e7249889c4",
        "6a29aadadb6182e7249889c3",
        "6a29aab4db6182e7249889c2",
        "6a29aa93db6182e7249889c1",
        "6a29aa71db6182e7249889c0"
    ];

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

    // Filter the books array to include only the ones that match our target IDs
    const featuredBooks = books.filter(book => targetIds.includes(book._id));

    if (loading) {
        return <div>Loading featured books...</div>;
    }

    return (
        <div>
            {/* <h3>Featured Books Count: {featuredBooks.length}</h3> */}
            <div className="grid grid-cols-6 gap-3
            ">
                
                {featuredBooks.map((book)=>
            <FreeCards key={book._id} book={book}></FreeCards>)}
            </div>
            
        </div>
    );
};

export default FeaturedMarquee;