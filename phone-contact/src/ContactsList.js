import React, { useState } from "react";

export default function ContactsList() {
    const [contacts, setContacts] = useState([
        { name: "İBRAHİM BİNER", phone: "1903", description: "Boy" },
        { name: "FERHAT UZUN", phone: "4747", description: "Father" },
    ]);
    const [newContact, setNewContact] = useState({ name: "", phone: "", description: "" });
    const [editingIndex, setEditingIndex] = useState(null); // Track which contact is being edited
    const [isPopupOpen, setIsPopupOpen] = useState(false); // Manage pop-up visibility
    const [searchTerm, setSearchTerm] = useState(""); // Track search input

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNewContact(prevContact => ({
            ...prevContact,
            [name]: value
        }));
    }

    function addOrEditContact() {
        if (!newContact.name || !newContact.phone) {
            alert("Lütfen adınızı ve telefon numaranızı giriniz.");
            return;
        }

        if (editingIndex !== null) {
            const updatedContacts = [...contacts];
            updatedContacts[editingIndex] = newContact;
            setContacts(updatedContacts);
            setEditingIndex(null);
        } else {
            setContacts(prevContacts => [...prevContacts, newContact]);
        }

        setNewContact({ name: "", phone: "", description: "" });
        setIsPopupOpen(false);
    }

    function deleteContact() {
        setContacts(contacts.filter((_, i) => i !== editingIndex));
        closePopup();
    }

    function editContact(index) {
        setNewContact(contacts[index]);
        setEditingIndex(index);
        setIsPopupOpen(true);
    }

    function openAddContactPopup() {
        setNewContact({ name: "", phone: "", description: "" });
        setEditingIndex(null);
        setIsPopupOpen(true);
    }

    function closePopup() {
        setIsPopupOpen(false);
    }

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    function handleCallClick(event) {
        event.stopPropagation();
        alert("Arama işlevi uygulanmadı.");
    }

    function handleSmsClick(event) {
        event.stopPropagation();
        alert("SMS işlevi uygulanmadı.");
    }

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="contact-list">
            <div className="header">
                <input
                    type="text"
                    placeholder="Numara Bul.."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="add-contact-button" onClick={openAddContactPopup}>+</button>
            </div>

            <ol>
                {filteredContacts.map((contact, index) =>
                    <li key={index}>
                        <div className="contact" onClick={() => editContact(index)}>
                            <div className="contact-info">
                                <p className="contact-name">{contact.name}</p>
                                <p className="contact-description">{contact.description}</p>
                            </div>
                            <div className="contact-actions">
                                <button className="call-button" onClick={handleCallClick}><i className='bx bxs-phone-call'></i></button>
                                <button className="sms-button" onClick={handleSmsClick}><i className='bx bxs-message-dots'></i></button>
                            </div>
                        </div>
                    </li>
                )}
            </ol>

            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h2>{editingIndex !== null ? "Numarayı Düzenle" : "Numara Ekle"}</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="İsim Giriniz."
                            value={newContact.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Telefon numarasını girin."
                            value={newContact.phone}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="İletişim açıklamasını girin..."
                            value={newContact.description}
                            onChange={handleInputChange}
                        />
                        <button onClick={addOrEditContact}>
                            {editingIndex !== null ? "Numarayı Kaydet" : "Numarayı Kaydet"}
                        </button>
                        {editingIndex !== null && (
                            <button onClick={deleteContact}>Numarayı Sil</button>
                        )}
                        <button onClick={closePopup}>Vazgeç</button>
                    </div>
                </div>
            )}
        </div>
    );
}
