// music-library/src/SongList.jsx
import React, { useState } from 'react';

export default function SongList({ songs, onDelete, isAdmin }) {
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [groupBy, setGroupBy] = useState('none');

  // Apply filter
  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(filterText.toLowerCase()) ||
    song.artist.toLowerCase().includes(filterText.toLowerCase()) ||
    song.album.toLowerCase().includes(filterText.toLowerCase())
  );

  // Apply sort
  const sorted = [...filtered].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  // Apply grouping
  let display;
  if (groupBy === 'album') {
    // Group by album using reduce:contentReference[oaicite:11]{index=11}
    const groups = sorted.reduce((acc, song) => {
      (acc[song.album] = acc[song.album] || []).push(song);
      return acc;
    }, {});
    display = Object.entries(groups).map(([album, songs]) => (
      <div key={album}>
        <h4>Album: {album}</h4>
        <ul>
          {songs.map(song => (
            <li key={song.id}>
              {song.title} by {song.artist}
              {isAdmin && (
                <button onClick={() => onDelete(song.id)} style={{ marginLeft: '1rem' }}>
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    ));
  } else if (groupBy === 'artist') {
    // Group by artist
    const groups = sorted.reduce((acc, song) => {
      (acc[song.artist] = acc[song.artist] || []).push(song);
      return acc;
    }, {});
    display = Object.entries(groups).map(([artist, songs]) => (
      <div key={artist}>
        <h4>Artist: {artist}</h4>
        <ul>
          {songs.map(song => (
            <li key={song.id}>
              {song.title} (Album: {song.album})
              {isAdmin && (
                <button onClick={() => onDelete(song.id)} style={{ marginLeft: '1rem' }}>
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    ));
  } else {
    // No grouping: simple list
    display = (
      <ul>
        {sorted.map(song => (
          <li key={song.id}>
            {song.title} – {song.artist} ({song.album})
            {isAdmin && (
              <button onClick={() => onDelete(song.id)} style={{ marginLeft: '1rem' }}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>Songs</h3>
      <div>
        <label>
          Filter: <input value={filterText} onChange={e => setFilterText(e.target.value)} placeholder="Search..." />
        </label>
        {' '}
        <label>
          Sort by: 
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
          </select>
        </label>
        {' '}
        <label>
          Group by: 
          <select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
            <option value="none">None</option>
            <option value="album">Album</option>
            <option value="artist">Artist</option>
          </select>
        </label>
      </div>
      {display}
    </div>
  );
}
