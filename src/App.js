import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import BookList from './BookList';
import Profile from './Profile';
import { auth, db } from './firebase'; // Stellt sicher, dass 'db' hier importiert wird
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore"; // Import für die Datenbank-Abfrage

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Überwacht den Anmeldestatus des Benutzers
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // 2. Testet die Verbindung zur Firestore-Datenbank beim Start der App
    const testDbConnection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        console.log("🎉 Datenbank-Verbindung erfolgreich!");
        if (querySnapshot.empty) {
            console.log("📚 Die 'books' Sammlung ist noch leer.");
        } else {
            console.log(`📚 ${querySnapshot.docs.length} Dokumente in 'books' gefunden.`);
        }
      } catch (error) {
        console.error("🔥 Fehler bei der Datenbank-Verbindung:", error);
      }
    };
    
    testDbConnection(); // Ruft die Test-Funktion auf

    // Aufräumfunktion, die beim Verlassen der Komponente ausgeführt wird
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/login');
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
