import axios from '../custom-axios/axios';

const LibraryService = {

    fetchAuthors: () => {
        return axios.get("/authors");
    },
    fetchCountries: () => {
        return axios.get("/countries");
    },
    fetchBooks: () => {
        return axios.get("/books/all");
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    rentBook: (id) => {
        return axios.get(`/books/rent/${id}`);
    },
    addBook: (name, category, author, availableCopies) => {
        return axios.post("/books/add", {
            "name": name,
            "category": category,
            "author_id": author,
            "availableCopies": availableCopies
        });
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
    editBook: (id, name, category, author, availableCopies) => {
        return axios.put(`/books/edit/${id}`, {
            "name": name,
            "category": category,
            "author_id": author,
            "availableCopies": availableCopies
        });
    },
};


export default LibraryService;