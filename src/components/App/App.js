import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import React, { Component } from 'react';
import LibraryService from "../../repository/libraryRepository";
import Books from "../Books/BookList/books"
import Header from "../Header/Header"
import BookAdd from "../Books/BookAdd/bookAdd"
import Authors from "../Authors/Authors"
import Categories from "../Categories/categories"
import Countries from "../Countries/countries"
import BookEdit from "../Books/BookEdit/bookEdit";
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            countries: [],
            authors: [],
            categories: ["NOVEL",
                "THRILER",
                "HISTORY",
                "FANTASY",
                "BIOGRAPHY",
                "CLASSICS",
                "DRAMA"],
            selectedBook: {}
        }
    }

    render() {
    return(
        <Router>
            <Header/>
            <main>
                <div className={"container"}>

                    <Route path={"/authors"} exact render={() => <Authors authors={this.state.authors}/>}/>
                    <Route path={"/countries"} exact render={() => <Countries countries={this.state.countries}/>}/>
                    <Route path={"/categories"} exact render={() => <Categories categories={this.state.categories}/>}/>
                    <Route path={"/books/edit/:id"} exact render={() => <BookEdit categories={this.state.categories} authors={this.state.authors} onEditBook={this.editBook} book={this.state.selectedBook}/>}/>
                    <Route path={"/books/add"} exact render={() => <BookAdd authors={this.state.authors} categories={this.state.categories} onAddBook={this.addBook}/>}/>
                    <Route path={"/books"} exact render={() => <Books books={this.state.books} onDelete={this.deleteBook} onEdit={this.getBook}  onRent={this.rentBook} />}/>
                    <Redirect to={"/books"} />
                </div>
            </main>
        </Router>
    );
    }
    loadBooks = () => {
        LibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    };

    addBook = (name, category, author, availableCopies) => {
        LibraryService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    };

    deleteBook = (id) => {
        LibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    };

    rentBook = (id) => {
        LibraryService.rentBook(id)
            .then(() => {
                this.loadBooks();
            });
    };

    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    };

    loadCountries = () => {
        LibraryService.fetchCountries()
            .then((data) => {
                this.setState({
                    countries: data.data
                })
            });
    };

    getBook = (id) => {
        LibraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            });
    };
    editBook = (id, name, category, author, availableCopies) => {
        LibraryService.editBook(id,name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    };



    componentDidMount() {
        this.loadBooks();
        this.loadAuthors();
        this.loadCountries();
    }
}

export default App;
