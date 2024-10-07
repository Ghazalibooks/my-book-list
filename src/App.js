import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'; // useNavigate in einer Komponente mit Router-Kontext verwenden
import Signup from './Signup';
import Login from './Login';
import BookList from './BookList';
import Profile from './Profile';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();  // Dies wird jetzt sicher innerhalb des Router-Kontexts verwendet

  useEffect(() => {
    // Überwache den Anmeldestatus
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/login'); // Nach Abmeldung zum Login weiterleiten
  };

  return (
    <div>
      <nav>
        <Link to="/login">Anmelden</Link> | <Link to="/signup">Registrieren</Link>
        {user && (
          <div style={{ float: 'right' }}>
            <span>{user.displayName}</span>
            {user.photoURL && <img src={user.photoURL} alt="Profilbild" width="30" style={{ borderRadius: '50%', marginLeft: '10px' }} />}
            <Link to="/profile" style={{ marginLeft: '10px' }}>Profil bearbeiten</Link>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Abmelden</button>
          </div>
        )}
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<BookList />} />
      </Routes>
    </div>
  );
}

export default App;
