import React, { useEffect, useState } from 'react';
import api from '../../Api/api';
import { useAuth } from '../../Authpovider/CustomHook';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth();

    // Hardcoded placeholder email for now. 
    // Replace this with your context user email (e.g., user?.email) when integrating Auth/Firebase.
    const loggedInUserEmail = user.email; 
    console.log(user)

    useEffect(() => {
        if (!loggedInUserEmail) return;

        // Fetch books matching the email via query parameters
        api.get(`/my-books?email=${loggedInUserEmail}`)
            .then(res => {
                setBooks(res.data);
                console.log(res.data)
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching your books:", err);
                setLoading(false);
            });
    }, [loggedInUserEmail]);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            {/* Upper Center Title with Dynamic Count */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0 }}>Your Books ({books.length})</h1>
                <p style={{ color: '#666' }}>Managing library uploads for: {loggedInUserEmail}</p>
            </div>

            {/* Books Display Layout */}
            {loading ? (
                <p style={{ textAlign: 'center' }}>Loading your collection...</p>
            ) : books.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#999' }}>You haven't added any books yet.</p>
            ) : (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                    gap: '20px', 
                    maxWidth: '1000px', 
                    margin: '0 auto' 
                }}>
                    {books.map((book) => (
                        <div key={book._id} style={{ 
                            border: '1px solid #ddd', 
                            borderRadius: '8px', 
                            padding: '15px', 
                            textAlign: 'center',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}>
                            <img 
                                src={book.imgUrl} 
                                alt={book.title} 
                                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '4px' }} 
                            />
                            <h3 style={{ margin: '10px 0 5px 0', fontSize: '1.1rem' }}>{book.title}</h3>
                            <span style={{ 
                                display: 'inline-block',
                                padding: '3px 8px', 
                                backgroundColor: book.status === 'available' ? '#e6f4ea' : '#fce8e6',
                                color: book.status === 'available' ? '#137333' : '#c5221f',
                                borderRadius: '4px',
                                fontSize: '0.85rem'
                            }}>
                                {book.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageBooks;