import React, { useState } from 'react';

const AddSongForm = ({ addSong }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addSong({ title, artist, album });
    setTitle('');
    setArtist('');
    setAlbum('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '3rem' ,marginLeft: '1rem'}}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" required />
      <input value={album} onChange={(e) => setAlbum(e.target.value)} placeholder="Album" required />
      <button  type="submit">➕ Add</button>
    </form>
  );
};

export default AddSongForm;
