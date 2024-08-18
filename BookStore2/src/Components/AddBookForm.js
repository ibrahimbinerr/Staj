import React, { useState } from 'react';

const AddBookForm = ({ onAddBook, onClose }) => {
    const [newBook, setNewBook] = useState({ title: "", author: "", image: "", price: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleSubmit = () => {
        onAddBook(newBook);
        setNewBook({ title: "", author: "", image: "", price: "" });
    };

    return (
        <div className="form-container">
            <h3>Yeni Kitap Ekle</h3>
            <input
                type="text"
                name="title"
                placeholder="Başlık"
                value={newBook.title}
                onChange={handleChange}
            />
            <input
                type="text"
                name="author"
                placeholder="Yazar"
                value={newBook.author}
                onChange={handleChange}
            />
            <input
                type="text"
                name="image"
                placeholder="Resim URL"
                value={newBook.image}
                onChange={handleChange}
            />
            <input
                type="text"
                name="price"
                placeholder="Fiyat"
                value={newBook.price}
                onChange={handleChange}
            />
            <button onClick={handleSubmit}>Kitap Ekle</button>
            <button onClick={onClose}>İptal et</button>
        </div>
    );
};

export default AddBookForm;
