import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { HiOutlineSearch, HiPlus, HiTrash, HiPencil, HiClock } from 'react-icons/hi';
import api from '../api';// Assuming you have an 'api.js' or import for API calls.

const NoteCard = ({ note, onDelete, onClick }) => {
  return (
    <Tilt options={{ max: 15, scale: 1.05, speed: 1000 }} className="note-card">
      <motion.div
        onClick={onClick}
        className="w-full h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-white font-bold text-[24px] gradient-text">{note.title}</h3>
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              className="p-2 text-secondary hover:text-red-500 transition-colors rounded-full hover:bg-red-500/10"
            >
              <HiTrash size={20} />
            </button>
          </div>
        </div>
        <p className="text-secondary text-[14px] line-clamp-3">{note.content}</p>
        <div className="flex items-center gap-2 mt-4 text-secondary text-sm">
        </div>
      </motion.div>
    </Tilt>
  );
};

const ReadMode = ({ note, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="modal-content max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold gradient-text">{note.title}</h1>
          <button
            onClick={onClose}
            className="p-2 text-secondary hover:text-white transition-colors rounded-full hover:bg-white/10"
          >
            <HiPencil size={20} />
          </button>
        </div>
        <div className="prose prose-invert max-w-none">
          {note.content.split('\n').map((paragraph, index) => (
            <p key={index} className="text-secondary text-lg leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl text-secondary hover:text-white transition-colors"
          >
            Close
          </button>
          
        </div>
      </motion.div>
    </motion.div>
  );
};

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    // Fetch notes when component is mounted
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes(); // Refresh the notes after deletion
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content: newNote.content, title: newNote.title, created_at: new Date().toISOString(),  })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes(); // Refresh the notes after creating a new note
        setIsCreating(false); // Close the modal after creation
        setNewNote({ title: "", content: "" }); // Reset new note state
      })
      .catch((err) => alert(err));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full min-h-screen mx-auto pt-[120px] px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="relative flex-1 max-w-xl">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={20} />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-box"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreating(true)}
            className="ml-4 add-button text-white"
          >
            <HiPlus size={24} />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => setSelectedNote(note)}
              onDelete={deleteNote}
            />
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedNote && (
            <ReadMode note={selectedNote} onClose={() => setSelectedNote(null)} />
          )}

          {isCreating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="modal-content"
              >
                <h2 className="text-3xl font-bold mb-6 gradient-text">Create New Note</h2>
                <input
                  type="text"
                  placeholder="Note title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full p-4 mb-4 search-box"
                />
                <textarea
                  placeholder="Note content"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  className="w-full h-64 p-4 search-box resize-none"
                />
                <div className="flex justify-end gap-4 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsCreating(false);
                      setNewNote({ title: "", content: "" });
                    }}
                    className="px-6 py-3 rounded-xl text-secondary hover:text-white transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={createNote}
                    className="px-6 py-3 rounded-xl glow-effect text-white font-medium"
                  >
                    Save Note
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
