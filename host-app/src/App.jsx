import React, { useState, lazy, Suspense, useEffect } from 'react';

const MusicLibrary = lazy(() => import('music_library/MusicLibrary'));

const App = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('role');
    if (stored) setRole(stored);
  }, []);

  const handleLogin = (type) => {
    localStorage.setItem('role', type);
    setRole(type);
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    setRole(null);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎶 Microfrontend Music App</h1>
      {!role ? (
        <>
          <button onClick={() => handleLogin('admin')}>Login as Admin</button>
          <button onClick={() => handleLogin('user')} style={{ marginLeft: '3rem' }}>
            Login as User
          </button>
        </>
      ) : (
        <>
          <p>Logged in as <strong>{role}</strong></p>
          <button onClick={handleLogout}>Logout</button>
          <Suspense fallback={<p>Loading...</p>}>
            <MusicLibrary role={role} />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default App;
