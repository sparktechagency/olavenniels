import React from 'react';
import { FaHeadphonesAlt } from 'react-icons/fa';

function BookInfoModal({ item }) {
  return (
    <div className="relative rounded-xl overflow-hidden w-full mx-auto">
      <div className="relative w-full h-64">
        <img
          src={item?.banner}
          alt="banner"
          className="w-full h-full object-cover blur-sm"
        />

        {/* Book Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-24">
          <img
            src={item?.banner}
            alt="book"
            className="w-48 h-56 object-cover rounded-md shadow-md"
          />
        </div>
      </div>

      {/* Book Details */}
      <div className="bg-white px-4 pt-20 pb-6 text-center">
        <h2 className="text-xl font-semibold">{item?.bookName}</h2>
        <p className="text-sm text-gray-500">{item?.author}</p>

        {/* Category + Audio Icon */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <span className="bg-gray-100 px-4 py-1 rounded-full text-sm font-medium">
            {item?.category}
          </span>
          {item?.audio && (
            <FaHeadphonesAlt className="text-gray-600 text-lg" />
          )}
        </div>

        {/* Synopsis */}
        <div className="text-left mt-6">
          <h3 className="text-md font-semibold mb-1">Synopsis</h3>
          <p className="text-gray-700 text-sm">
            {item?.Synopsis}{' '}
            <span className="text-orange-600 font-semibold cursor-pointer">
              Read More..
            </span>
          </p>
        </div>

        {/* Total Pages */}
        {item?.totalPages && <p className="text-sm text-start text-gray-500 mt-4">Total Page : {item?.totalPages}</p>}

        {/* Optional Audio Controls */}
        {item?.audio && (
          <div className="mt-4">
            <audio controls className="w-full">
              <source src={item?.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookInfoModal;
