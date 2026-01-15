import React from 'react';

const BookImage = ({ banner, bookName }) => (
  <div className='aspect-square'>
    <img
      className='w-full h-full object-contain rounded'
      src={banner}
      alt={`${bookName} cover`}
      loading="lazy"
    />
  </div>
);

export default React.memo(BookImage);