import React from "react";
import BookLine from "../../molecules/BookLine/BookLine";
import useTodosLivros from "./useTodosLivros";

export default function TodosLivros() {
    const { livros, errors, loading } = useTodosLivros();
    return (
        <BookLine
            title="Nossos Livros"
            subtitle="Toda nossa coleção registrada"
            books={livros}
        />
    );
}
