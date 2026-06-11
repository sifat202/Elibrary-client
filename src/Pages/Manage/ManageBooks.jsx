import React, { useEffect, useState } from 'react';
import api from '../../Api/api';
import { useAuth } from '../../Authpovider/CustomHook';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaUser, FaBook, FaInfoCircle } from 'react-icons/fa';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const loggedInUserEmail = user?.email;

    const fetchMyBooks = () => {
        if (!loggedInUserEmail) return;
        setLoading(true);
        api.get(`/my-books?email=${loggedInUserEmail}`)
            .then(res => {
                setBooks(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching your books:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchMyBooks();
    }, [loggedInUserEmail]);

    const handleDeleteBook = (id, currentStatus) => {
        if (currentStatus === 'unavailable') {
            Swal.fire({
                title: 'Action Blocked',
                text: 'This book is currently out on loan and cannot be removed until it is returned.',
                icon: 'warning',
                confirmButtonColor: '#00533d'
            });
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "This removal is permanent and will drop the book listing from the library.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#3b82f6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/books/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your book listing was successfully dropped.',
                                icon: 'success',
                                confirmButtonColor: '#00533d'
                            });
                            setBooks(prev => prev.filter(book => book._id !== id));
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire({
                            title: 'Error!',
                            text: err.response?.data?.message || 'Failed to remove listing.',
                            icon: 'error'
                        });
                    });
            }
        });
    };

    return (
        <div style={{ padding: '60px 20px', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            
            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 style={{ margin: '0 0 12px 0', color: '#0f172a', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.025em' }}>
                    Your Shared Books
                    <span style={{ marginLeft: '12px', fontSize: '1.5rem', fontWeight: '600', color: '#00533d', backgroundColor: '#e6f4ea', padding: '4px 14px', borderRadius: '9999px', verticalAlign: 'middle' }}>
                        {books.length}
                    </span>
                </h1>
                <p style={{ color: '#64748b', margin: 0, fontSize: '1rem', fontWeight: '400' }}>
                    Managing active library uploads for: <span style={{ color: '#0f172a', fontWeight: '600' }}>{loggedInUserEmail}</span>
                </p>
            </div>

            {/* Display State Conditions */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                    <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: '#00533d', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <p style={{ color: '#64748b', marginTop: '16px', fontSize: '1.1rem', fontWeight: '500' }}>Loading your book collection...</p>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            ) : books.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 20px', background: '#ffffff', borderRadius: '24px', maxWidth: '500px', margin: '0 auto', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)', border: '1px solid #e2e8f0' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 24px auto', justifyContent: 'center' }}>
                        <FaBook style={{ fontSize: '2.2rem', color: '#94a3b8' }} />
                    </div>
                    <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '1.25rem', fontWeight: '700' }}>No books listed yet</h3>
                    <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>When you share books with the community, they will appear right here for your oversight.</p>
                </div>
            ) : (
                /* Grid Container */
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                    gap: '30px', 
                    maxWidth: '1240px', 
                    margin: '0 auto' 
                }}>
                    {books.map((book) => (
                        <div key={book._id} style={{ 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '24px', 
                            padding: '24px', 
                            backgroundColor: '#ffffff',
                            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.02), 0 8px 10px -6px rgba(15, 23, 42, 0.02)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        className="book-card"
                        >
                            {/* Card Body Components wrapper */}
                            <div>
                                {/* Image Box wrapper */}
                                <div style={{ width: '100%', height: '320px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#f8fafc', marginBottom: '20px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img 
                                        src={book.imgUrl} 
                                        alt={book.title} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                </div>
                                
                                {/* Status Flag & Header Info */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '8px' }}>
                                    <span style={{ 
                                        padding: '6px 14px', 
                                        backgroundColor: book.status === 'available' ? '#e2f7ed' : '#fee2e2',
                                        color: book.status === 'available' ? '#15803d' : '#b91c1c',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}>
                                        <span style={{ width: '6px', height: '6px', backgroundColor: book.status === 'available' ? '#16a34a' : '#dc2626', borderRadius: '50%' }}></span>
                                        {book.status}
                                    </span>
                                </div>

                                <h3 style={{ margin: '0 0 14px 0', fontSize: '1.25rem', color: '#0f172a', fontWeight: '700', textTransform: 'capitalize', lineHeight: '1.4' }}>
                                    {book.title}
                                </h3>

                                {/* Dynamic Condition Container for Borrowers */}
                                {book.status === 'unavailable' && book.borrowerEmail ? (
                                    <div style={{ 
                                        marginTop: '16px', 
                                        padding: '14px', 
                                        backgroundColor: '#f8fafc', 
                                        border: '1px solid #e2e8f0', 
                                        borderRadius: '14px',
                                        fontSize: '0.85rem'
                                    }}>
                                        <div style={{ color: '#475569', fontWeight: '600', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <FaUser style={{ fontSize: '0.8rem', color: '#64748b' }} /> Active Borrower:
                                        </div>
                                        <div style={{ color: '#0f172a', wordBreak: 'break-all', fontWeight: '500', fontFamily: 'monospace', backgroundColor: '#ffffff', padding: '6px 10px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                                            {book.borrowerEmail}
                                        </div>
                                        {book.borrowerName && (
                                            <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '6px', paddingLeft: '4px' }}>
                                                Name: <span style={{ fontWeight: '500', color: '#334155' }}>{book.borrowerName}</span>
                                            </div>
                                        )}
                                    </div>
                                ) : book.status === 'unavailable' ? (
                                    <div style={{ marginTop: '16px', color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '12px' }}>
                                        <FaInfoCircle /> Awaiting loan system callback pipeline...
                                    </div>
                                ) : null}
                            </div>

                            {/* Actions Grouping pinned cleanly underneath */}
                            <div style={{ marginTop: '24px' }}>
                                <button 
                                    onClick={() => handleDeleteBook(book._id, book.status)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 0',
                                        backgroundColor: book.status === 'unavailable' ? '#f1f5f9' : '#fef2f2',
                                        color: book.status === 'unavailable' ? '#94a3b8' : '#ef4444',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: book.status === 'unavailable' ? 'not-allowed' : 'pointer',
                                        fontWeight: '600',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        if(book.status !== 'unavailable') {
                                            e.currentTarget.style.backgroundColor = '#dc2626';
                                            e.currentTarget.style.color = '#ffffff';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if(book.status !== 'unavailable') {
                                            e.currentTarget.style.backgroundColor = '#fef2f2';
                                            e.currentTarget.style.color = '#ef4444';
                                        }
                                    }}
                                >
                                    <FaTrashAlt style={{ fontSize: '0.85rem' }} /> Delete Listing
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageBooks;