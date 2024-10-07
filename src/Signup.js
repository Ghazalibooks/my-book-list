import React, { useState } from 'react';
import { auth } from './firebase'; 
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Konto erfolgreich erstellt!");
      navigate('/');  // Nach erfolgreicher Registrierung zur Hauptseite weiterleiten
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Mit Google registriert: ${user.displayName}`);
      navigate('/');  // Nach erfolgreicher Registrierung mit Google zur Hauptseite weiterleiten
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Registrieren</h2>
      <input 
        type="email" 
        placeholder="E-Mail" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Passwort" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleSignup}>Registrieren</button>

      <h3>Oder registriere dich mit Google:</h3>
      <button onClick={handleGoogleSignup}>Mit Google registrieren</button>
    </div>
  );
}

export default Signup;
