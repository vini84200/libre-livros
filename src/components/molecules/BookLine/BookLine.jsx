import React, { useRef } from "react";

import BookItem from "../../atoms/BookItem/BookItem";
import useOverflow from "../../../hooks/useOverflow";

export default function BookLine({ books, title, subtitle }) {
    const wrapperRef = useRef(null);
    const { isXScrollBegin, isXScrollEnd } = useOverflow(wrapperRef);
    return (
        <>
            <div className="container mx-auto my-6 lg:px-16 px-4">
                <ul className="flex items-center leading-normal text-gray-500 font-alt">
                    <li className="text-gray-800 font-bold pr-2">{title}</li>
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
            <div className=" relative">
                <div
                    ref={wrapperRef}
                    className="flex flex-row items-stretch justify-start mb-10 px-4 no-scrollbar overflow-x-scroll relative"
                >
                    {books.map((book) => (
                        <BookItem key={book.id} book={book} />
                    ))}
                </div>
                {!isXScrollEnd && (
                    <button
                        type="button"
                        className="absolute z-10 p-2 rounded-full block right-0 inset-y-0 mr-1 "
                        onClick={() => {
                            if (
                                wrapperRef.current.clientWidth / 2 +
                                    wrapperRef.current.scrollLeft >=
                                wrapperRef.current.scrollWidth
                            ) {
                                wrapperRef.current.scrollLeft =
                                    wrapperRef.current.scrollWidth;
                            } else {
                                wrapperRef.current.scrollLeft =
                                    wrapperRef.current.clientWidth / 2 +
                                    wrapperRef.current.scrollLeft;
                            }
                        }}
                    >
                        <svg
                            className="fill-current text-black w-10 h-10 p-2 rounded-full hover:border hover:text-green-100 hover:bg-gray-700 border-green-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                        >
                            <title>arrow-right</title>
                            <path d="M16.172 9l-6.071-6.071 1.414-1.414L20 10l-.707.707-7.778 7.778-1.414-1.414L16.172 11H0V9z" />
                        </svg>
                    </button>
                )}
                {!isXScrollBegin && (
                    <button
                        type="button"
                        className="absolute z-10 p-2 rounded-full block left-0 inset-y-0 mr-1"
                        onClick={() => {
                            if (
                                -(wrapperRef.current.clientWidth / 2) +
                                    wrapperRef.current.scrollLeft <=
                                0
                            ) {
                                wrapperRef.current.scrollLeft = 0;
                            } else {
                                wrapperRef.current.scrollLeft =
                                    -(wrapperRef.current.clientWidth / 2) +
                                    wrapperRef.current.scrollLeft;
                            }
                        }}
                    >
                        <svg
                            className="fill-current text-black w-10 h-10 p-2 rounded-full hover:border hover:text-green-100 hover:bg-gray-700 border-green-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                        >
                            <title>arrow-left</title>
                            <path d="M 3.828 9 l 6.071 -6.071 l -1.414 -1.414 L 0 10 l 0.707 0.707 l 7.778 7.778 l 1.414 -1.414 L 3.828 11 H 20 V 9 z" />
                        </svg>
                    </button>
                )}
            </div>
        </>
    );
}
