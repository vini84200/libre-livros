import React, { useState, useEffect, useCallback } from "react";

function useWindowSize() {
    const isClient = typeof window === "object";

    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined,
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [getSize, isClient]); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
}

export default function useOverflow(ref) {
    const [isXOverflowing, setXOverflowing] = useState(false);
    const [isYOverflowing, setYOverflowing] = useState(false);

    const [isXScrollBegin, setXScrollBegin] = useState(true);
    const [isXScrollEnd, setXScrollEnd] = useState(false);

    const [isYScrollBegin, setYScrollBegin] = useState(true);
    const [isYScrollEnd, setYScrollEnd] = useState(false);

    const size = useWindowSize();
    const updateScroll = useCallback(() => {
        const XOverflowing = ref.current.scrollWidth > ref.current.clientWidth;
        if (XOverflowing !== isXOverflowing) {
            setXOverflowing(XOverflowing);
            console.log("X is", XOverflowing);
        }
        const YOverflowing =
            ref.current.scrollHeight > ref.current.clientHeight;
        if (YOverflowing !== isYOverflowing) {
            setYOverflowing(YOverflowing);
        }
        if (isXOverflowing) {
            const offsetRight =
                ref.current.scrollWidth - ref.current.clientWidth;
            if (ref.current.scrollLeft >= offsetRight) {
                setXScrollEnd(true);
            } else {
                setXScrollEnd(false);
            }

            if (ref.current.scrollLeft === 0) {
                setXScrollBegin(true);
            } else {
                setXScrollBegin(false);
            }
        } else {
            setXScrollEnd(true);
            setXScrollBegin(true);
        }

        if (isYOverflowing) {
            // Handle Y Overflow
            const offsetBottom =
                ref.current.scrollHeight - ref.current.clientHeight;
            if (ref.current.scrollTop >= offsetBottom) {
                setYScrollEnd(true);
            } else {
                setYScrollEnd(false);
            }

            if (ref.current.scrollTop === 0) {
                setYScrollBegin(true);
            } else {
                setYScrollBegin(false);
            }
        } else {
            setYScrollBegin(true);
            setYScrollEnd(true);
        }
    }, [ref, isXOverflowing, isYOverflowing]);

    useEffect(() => {
        let component;
        if (ref.current) {
            ref.current.addEventListener("scroll", updateScroll);
            ref.current.addEventListener("loadend", updateScroll);

            [].slice.call(ref.current.children).forEach((child) => {
                child.children[1].addEventListener("loadend", updateScroll);
            });

            updateScroll();
            component = ref.current;
        }

        return () => {
            if (!component) return;
            component.removeEventListener("scroll", updateScroll);
            component.removeEventListener("loadend", updateScroll);
        };
    }, [ref, size, updateScroll]);

    return {
        isXOverflowing,
        isYOverflowing,
        isXScrollBegin,
        isXScrollEnd,
        isYScrollBegin,
        isYScrollEnd,
    };
}
