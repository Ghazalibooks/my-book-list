import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase'; // Firestore und auth importieren
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

function BookList() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('reading');

  // Funktion zum Hinzufügen eines Buches
  const addBook = async () => {
    const book = { title, author, status };
    setBooks([...books, book]);
    setTitle('');
    setAuthor('');

    try {
      const userBooksRef = collection(db, "books"); // Sammlung für Bücher erstellen
      await addDoc(userBooksRef, { 
        ...book,
        userId: auth.currentUser.uid  // Bücher für den aktuellen Nutzer speichern
      });
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Buches: ", error);
    }
  };

  // Funktion zum Laden von Büchern
  const loadBooks = async () => {
    try {
      const userBooksRef = collection(db, "books");
      const q = query(userBooksRef, where("userId", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      const loadedBooks = querySnapshot.docs.map(doc => doc.data());
      setBooks(loadedBooks);
    } catch (error) {
      console.error("Fehler beim Laden der Bücher: ", error);
    }
  };

  // Bücher nach dem Login laden
  useEffect(() => {
    if (auth.currentUser) {
      loadBooks();
    }
  }, []); // Leere Abhängigkeit, da wir keine `user`-Variable haben

  return (
    <div className="App">
      <h1>My Book List</h1>

      <div className="add-book">
        <input 
          type="text" 
          placeholder="Book Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Author" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="reading">Currently Reading</option>
          <option value="read">Read</option>
        </select>
        <button onClick={addBook}>Add Book</button>
      </div>

      <h2>Currently Reading</h2>
      <ul>
        {books.filter(book => book.status === 'reading').map((book, index) => (
          <li key={index}>{book.title} by {book.author}</li>
        ))}
      </ul>

      <h2>Read</h2>
      <ul>
        {books.filter(book => book.status === 'read').map((book, index) => (
          <li key={index}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
