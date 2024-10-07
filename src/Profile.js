import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { updateProfile } from 'firebase/auth';

function Profile() {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setName(currentUser.displayName || '');
      setProfilePic(currentUser.photoURL || '');
    }
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: profilePic,
      });
      alert('Profil erfolgreich aktualisiert!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Profil bearbeiten</h2>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Profilbild-URL" 
        value={profilePic} 
        onChange={(e) => setProfilePic(e.target.value)} 
      />
      <button onClick={handleUpdateProfile}>Profil aktualisieren</button>
    </div>
  );
}

export default Profile;
