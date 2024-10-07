import React, { useState } from 'react';
import { auth } from './firebase'; 
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Erfolgreich angemeldet!");
      navigate('/');  // Nach erfolgreichem Login zur Hauptseite weiterleiten
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Mit Google erfolgreich angemeldet!");
      navigate('/');  // Nach erfolgreichem Login mit Google zur Hauptseite weiterleiten
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Anmelden</h2>
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
      <button onClick={handleLogin}>Anmelden</button>
      <button onClick={handleGoogleLogin}>Mit Google anmelden</button>
    </div>
  );
}

export default Login;
