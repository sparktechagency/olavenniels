import React, { useEffect, useState } from "react";
import BookCard from "../../components/books/BookCard";

function Ebook() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/dummy.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  const handleView = (item) => {
    console.log(item);
  };
  const handleEdit = (item) => {
    console.log(item);
  };
  const handleDelete = (item) => {
    console.log(item);
  };
  return (
    <div>
      <h2 className="titleStyle">Audio Book</h2>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((item, i) => (
          <BookCard
            key={i}
            item={item}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Ebook;
