
import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold">{book.name}</h2>
      <p className="text-sm text-gray-500">Ortalama Puan: {book.score || "Henüz puan yok"}</p>
      <Link to={`/books/${book.id}`} className="text-blue-500 underline">
        Detayları Gör
      </Link>
    </div>
  );
};

export default BookCard;
