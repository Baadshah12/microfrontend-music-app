import { importShared } from './__federation_fn_import-esthdjKb.js';
import { r as requireReact } from './index-DQGM2Mpm.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production_min;

function requireReactJsxRuntime_production_min () {
	if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
	hasRequiredReactJsxRuntime_production_min = 1;
var f=requireReact(),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
	function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
	return reactJsxRuntime_production_min;
}

var hasRequiredJsxRuntime;

function requireJsxRuntime () {
	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
	hasRequiredJsxRuntime = 1;
	{
	  jsxRuntime.exports = requireReactJsxRuntime_production_min();
	}
	return jsxRuntime.exports;
}

var jsxRuntimeExports = requireJsxRuntime();

const React$1 = await importShared('react');
const {useState: useState$1} = React$1;

const AddSongForm = ({ addSong }) => {
  const [title, setTitle] = useState$1("");
  const [artist, setArtist] = useState$1("");
  const [album, setAlbum] = useState$1("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addSong({ title, artist, album });
    setTitle("");
    setArtist("");
    setAlbum("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, style: { marginBottom: "1rem" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Title", required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: artist, onChange: (e) => setArtist(e.target.value), placeholder: "Artist", required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: album, onChange: (e) => setAlbum(e.target.value), placeholder: "Album", required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", children: "➕ Add" })
  ] });
};

const React = await importShared('react');
const {useEffect,useState} = React;
const MusicLibrary = ({ role }) => {
  const [songs, setSongs] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [grouped, setGrouped] = useState(false);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("songs") || "[]");
    setSongs(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
  }, [songs]);
  const addSong = (song) => {
    if (role !== "admin") return;
    setSongs((prev) => [...prev, song]);
  };
  const deleteSong = (index) => {
    if (role !== "admin") return;
    const updated = [...songs];
    updated.splice(index, 1);
    setSongs(updated);
  };
  const filteredSongs = songs.filter(
    (s) => s.title.toLowerCase().includes(filter.toLowerCase()) || s.artist.toLowerCase().includes(filter.toLowerCase()) || s.album.toLowerCase().includes(filter.toLowerCase())
  ).sort((a, b) => {
    if (!sortKey) return 0;
    return a[sortKey].localeCompare(b[sortKey]);
  });
  const groupedSongs = grouped ? filteredSongs.reduce((acc, song) => {
    acc[song.artist] = acc[song.artist] || [];
    acc[song.artist].push(song);
    return acc;
  }, {}) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "1rem" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
      "🎵 Music Library (",
      role,
      ")"
    ] }),
    role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(AddSongForm, { addSong }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "1rem", border: "2px dashed red", padding: "0.5rem" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "🔍 FILTER BLOCK" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Filter by title, artist, album",
          value: filter,
          onChange: (e) => setFilter(e.target.value)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          onChange: (e) => setSortKey(e.target.value),
          value: sortKey,
          style: { marginLeft: "0.5rem" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "-- Sort By --" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "title", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "artist", children: "Artist" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "album", children: "Album" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { marginLeft: "1rem" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: grouped,
            onChange: (e) => setGrouped(e.target.checked)
          }
        ),
        "Group by Artist"
      ] })
    ] }),
    grouped ? Object.entries(groupedSongs).map(([artist, songs2]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: artist }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: songs2.map((song, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: song.title }),
        " (",
        song.album,
        ")",
        role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteSong(i), style: { marginLeft: "1rem" }, children: "❌ Delete" })
      ] }, i)) })
    ] }, artist)) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: filteredSongs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No songs available." }) : filteredSongs.map((song, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: song.title }),
      " - ",
      song.artist,
      " (",
      song.album,
      ")",
      role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => deleteSong(i), style: { marginLeft: "1rem" }, children: "❌ Delete" })
    ] }, i)) })
  ] });
};

export { MusicLibrary as default, jsxRuntimeExports as j };
