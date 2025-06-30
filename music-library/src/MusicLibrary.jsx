import React, { useEffect, useState } from 'react';
import AddSongForm from './AddSongForm';
import './MusicLibrary.css';

const MusicLibrary = ({ role }) => {
  const [songs, setSongs] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [grouped, setGrouped] = useState(false);

  // Load songs from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('songs') || '[]');
    setSongs(saved);
  }, []);

  // Save to localStorage whenever songs update
  useEffect(() => {
    localStorage.setItem('songs', JSON.stringify(songs));
  }, [songs]);

  const addSong = (song) => {
    if (role !== 'admin') return;
    setSongs((prev) => [...prev, song]);
  };

  const deleteSong = (index) => {
    if (role !== 'admin') return;
    const updated = [...songs];
    updated.splice(index, 1);
    setSongs(updated);
  };

  // Filter and sort logic
  const filteredSongs = songs
    .filter(
      (s) =>
        s.title.toLowerCase().includes(filter.toLowerCase()) ||
        s.artist.toLowerCase().includes(filter.toLowerCase()) ||
        s.album.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      return a[sortKey].localeCompare(b[sortKey]);
    });

  const groupedSongs = grouped
    ? filteredSongs.reduce((acc, song) => {
        acc[song.artist] = acc[song.artist] || [];
        acc[song.artist].push(song);
        return acc;
      }, {})
    : null;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>🎵 Music Library ({role})</h2>

      {/* Only admin sees Add Song form */}
      {role === 'admin' && <AddSongForm addSong={addSong} />}

      {/* Filter/Sort/Group UI visible to all roles */}
      <div style={{ marginBottom: '1rem', border: '2px dashed red', padding: '0.5rem' }}>
        <p >🔍 FILTER BLOCK</p>
        <input
          type="text"
          placeholder="Filter by title, artist, album"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
          style={{ marginLeft: '0.5rem' }}
        >
          <option value="">-- Sort By --</option>
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
        <label style={{ marginLeft: '1rem' }}>
          <input
            type="checkbox"
            checked={grouped}
            onChange={(e) => setGrouped(e.target.checked)}
          />
          Group by Artist
        </label>
      </div>

      {/* Songs Listing */}
      {grouped ? (
        Object.entries(groupedSongs).map(([artist, songs]) => (
          <div key={artist}>
            <h4>{artist}</h4>
            <ul>
              {songs.map((song, i) => (
                <li key={i}>
                  <strong>{song.title}</strong> ({song.album})
                  {role === 'admin' && (
                    <button onClick={() => deleteSong(i)} style={{ marginLeft: '1rem' }}>
                      ❌ Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul>
          {filteredSongs.length === 0 ? (
            <p>No songs available.</p>
          ) : (
            filteredSongs.map((song, i) => (
              <li key={i}>
                <strong>{song.title}</strong> - {song.artist} ({song.album})
                {role === 'admin' && (
                  <button onClick={() => deleteSong(i)} style={{ marginLeft: '1rem' }}>
                    ❌ Delete
                  </button>
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default MusicLibrary;

