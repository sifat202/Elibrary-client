import React from 'react';

const BookCards = ({ book }) => {
    // Destructuring properties safely from our single object prop layout
    const { title, imgUrl, email } = book;

    // Isolate username handles out of emails for cleaner badge labels
    const displayContributor = email ? email.split('@')[0] : 'Anonymous';

    return (
        <div className="group card bg-base-100 border border-base-300 shadow-sm rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            
            {/* Image Wrap Wrapper with Hover Zoom Effects */}
            <div className="relative aspect-[3/4] bg-base-300 overflow-hidden w-full">
                <img 
                    src={imgUrl} 
                    alt={`Cover illustration for ${title}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                />
                {/* Premium Subtle Gradient Mask Over Cover base */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Metadata Text Details Box Body */}
            <div className="card-body p-5 flex flex-col justify-between flex-grow bg-base-100">
                <div>
                    {/* Contributor Badge */}
                    <div className="flex items-center gap-1.5 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <p className="text-xs font-semibold text-gray-500 tracking-wide truncate">
                            Shared by: <span className="text-gray-700 font-bold">{displayContributor}</span>
                        </p>
                    </div>

                    {/* Book Dynamic Title */}
                    <h2 className="card-title text-base md:text-lg font-extrabold text-gray-800 tracking-tight leading-snug line-clamp-2 min-h-[3rem] group-hover:text-[#006A4E] transition-colors duration-200">
                        {title}
                    </h2>
                </div>

                {/* Interactive Action Footers inside Cards */}
                <div className="card-actions mt-4 pt-4 border-t border-base-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#006A4E] bg-[#006A4E]/5 px-2.5 py-1 rounded-md">
                        Digital Copy
                    </span>
                    <button className="btn btn-sm bg-[#006A4E] hover:bg-[#00533d] text-white border-none normal-case rounded-lg shadow-sm transition-colors duration-200">
                        View Details
                    </button>
                </div>
            </div>

        </div>
    );
};

export default BookCards;