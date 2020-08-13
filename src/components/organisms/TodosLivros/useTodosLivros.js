import { useState, useEffect } from "react";
import { fbApp } from "../../../utils/firebaseUtils";

export default function useTodosLivros() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        const unsubscribe = fbApp
            .firestore()
            .collection("livros")
            .onSnapshot(
                (snapshot) => {
                    const Livros = [];
                    snapshot.forEach((doc) => {
                        Livros.push({ ...doc.data(), id: doc.id });
                    });
                    setLoading(false);
                    setLivros(Livros);
                },
                (err) => {
                    setError(err);
                }
            );

        return () => unsubscribe();
    }, []);

    return {
        error,
        loading,
        livros,
    };
}
