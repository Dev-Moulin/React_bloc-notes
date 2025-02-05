import { useEffect, useState } from "react"; // Importation des hooks
import MarkdownInput from "./components/MarkdownInput"; // Composant de saisie
import NoteDisplay from "./components/NoteDisplay"; // Composant d'affichage

// Clé pour stocker les notes dans localStorage
const STORAGE_KEY = "blocNotes";

const App = () => {
  // État global stockant toutes les notes
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [{ id: 1, title: "Nouvelle note", content: "" }];
  });

  // État pour suivre la note sélectionnée
  const [currentNoteId, setCurrentNoteId] = useState(notes.length > 0 ? notes[0].id : null);

  // Mise à jour automatique du localStorage à chaque changement des notes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  // Récupérer la note active ou un objet vide par défaut
  const currentNote = notes.find(note => note.id === currentNoteId) || { id: null, title: "Nouvelle note", content: "" };

  // Mettre à jour le contenu d'une note
  const updateNote = (newContent) => {
    setNotes(notes.map(note =>
      note.id === currentNoteId ? { ...note, content: newContent } : note
    ));
  };

  // Met à jour le titre d'une note
  const updatedNotesTitle = (newTitle) => {
    setNotes(notes.map(note => 
      note.id === currentNoteId ? { ...note, title: newTitle } : note
    ));
  };

  // Ajouter une nouvelle note
  const addNote = () => {
    const newNote = { id: Date.now(), title: "Nouvelle note", content: "" };
    setNotes([...notes, newNote]);
    setCurrentNoteId(newNote.id);
  };

  // Supprimer une note
  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);

    // Si la note supprimée est active, sélectionner une autre
    if (id === currentNoteId) {
      setCurrentNoteId(updatedNotes.length > 0 ? updatedNotes[0].id : null);
    }

    // Si toutes les notes sont supprimées, en ajouter une nouvelle
    if (updatedNotes.length === 0) {
      addNote();
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <button onClick={addNote}>➕ Nouvelle note</button>
        <ul>
          {notes.map(note => (
            <li
              key={note.id}
              className={note.id === currentNoteId ? "active" : ""}
              onClick={() => setCurrentNoteId(note.id)}
            >
              <input
                type="text"
                value={note.title}
                onChange={(e) => updatedNotesTitle(e.target.value)}
                className="note-title-input"
              />
              
              <button className="delete-btn" onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Zone principale d'édition */}
      <div className="editor">
        <MarkdownInput onTextChange={updateNote} defaultValue={currentNote.content} />
        <NoteDisplay markdown={currentNote.content} />
      </div>
    </div>
  );
};

export default App;



function Counter() {
  const [count, setCount] = useState(0);

  return (
      <div>
        <button onClick={() => setCount (count - 1)}> - </button>
        <span>{count}</span>
        <button onClick={() => setCount (count + 1)}> + </button>
      </div>
  );
};