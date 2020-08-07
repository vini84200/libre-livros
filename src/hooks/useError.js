import { useState } from "react";

export default function useError() {
    const [error, setError] = useState({});

    const throwError = (err) => {
        setError(err);
        console.error(error);
    };

    return [error, throwError];
}
