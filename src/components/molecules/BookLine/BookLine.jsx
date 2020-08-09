import React from "react";
import BookItem from "../../atoms/BookItem/BookItem";

export default function BookLine({ books, title, subtitle }) {
    return (
        <>
            <div className="container mx-auto my-6 lg:px-16 px-4">
                <ul className="flex items-center leading-normal text-gray-500 font-alt">
                    <li className="text-gray-800 pr-2">{title}</li>
                    {subtitle && (
                        <>
                            <li className="pr-2">|</li>
                            <li className="pr-2">
                                <div className="text-gray-600">{subtitle}</div>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            <div className="flex flex-row items-stretch justify-start mb-10 px-4 overflow-hidden relative">
                {books.map((book) => (
                    <BookItem key={book.id} book={book} />
                ))}
            </div>
        </>
    );
}
