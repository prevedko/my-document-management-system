// src/App.js
import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import Login from './Login';
import Register from './Register';
import Documents from './Documents';
import AdminPanel from './AdminPanel';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User signed out successfully!');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <button onClick={handleLogout}>Logout</button>
          <Documents />
          {user.email === 'admin@example.com' && <AdminPanel />}
        </div>
      ) : (
        <div>
          <Login />
          <Register />
        </div>
      )}
    </div>
  );
}

export default App;
