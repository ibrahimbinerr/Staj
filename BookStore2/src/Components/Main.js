import React, { useState } from "react";
import Card from "./Card";
import axios from "axios";
import AddBookForm from "./AddBookForm";

const Main = () => {
    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const searchBook = (evt) => {
        if (evt.key === "Enter") {
            axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU' + '&maxResults=40')
                .then(res => setData(res.data.items))
                .catch(err => console.log(err));
        }
    };

    const handleAddBook = (book) => {
        setData([...bookData, {
            volumeInfo: {
                title: book.title,
                authors: [book.author],
                imageLinks: { smallThumbnail: book.image },
                publisher: "Unknown",
                publishedDate: "Unknown",
                description: "No description available"
            },
            saleInfo: {
                listPrice: { amount: book.price }
            }
        }]);
        setShowForm(false);
    };

    return (
        <>
            <div className="header">
                <div className="row1">
                </div>
                <div className="row2">
                    <h2>Kitap Ara</h2>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Kitap adını giriniz."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={searchBook}
                        />
                        <button><i className="fas fa-search"></i></button>
                    </div>
                    <button className="add-book-button" onClick={() => setShowForm(!showForm)}>
                        {showForm ? "İptal et" : "Yeni Kitap Ekle"}
                    </button>
                </div>
            </div>

            {}
            {showForm && (
                <div className="form-container-wrapper">
                    <AddBookForm onAddBook={handleAddBook} onClose={() => setShowForm(false)} />
                </div>
            )}

            <div className="container">
                <Card book={bookData} />
            </div>
        </>
    );
};

export default Main;
