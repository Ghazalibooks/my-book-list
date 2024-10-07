import React, { useState } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('reading');

  const addBook = () => {
    setBooks([...books, { title, author, status }]);
    setTitle('');
    setAuthor('');
  };

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

export default App;
