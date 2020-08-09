import React from "react";

const BOOK_SIZE_RATIO = 23 / 16; // Heght by width

export default function BookItem({ book }) {
    return (
        <a
            href=".."
            className="relative group shadow-xl block mr-4 flex-shrink-0"
        >
            <div className="absolute  inset-0 bg-black opacity-75 hidden group-hover:flex flex-col justify-end text-white px-4 py-4 cursor-pointer">
                <div>
                    <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                    <p className="leading-normal">
                        De <span className="italic">{book.autor.nome}</span>{" "}
                    </p>
                </div>
            </div>
            <img className="w-56" src={book.cover} alt="#" />
        </a>
    );
}
