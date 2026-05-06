import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState("");

const agregarTarea = async () => {
  if (input.trim() === "") return;

  try {
    const nuevaTarea = {
      texto: input,
      completada: false,
      fecha: new Date(),
    };

    // 🔥 GUARDAR EN FIREBASE
    await addDoc(collection(db, "tareas"), nuevaTarea);

    // (opcional) actualizar UI local
    setTareas([nuevaTarea, ...tareas]);

    setInput("");
  } catch (error) {
    console.error("Error guardando tarea:", error);
  }
};

  const toggleTarea = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">

      <div className="w-full max-w-md backdrop-blur-xl bg-white/80 rounded-2xl shadow-2xl p-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center mb-6">
          ✨ Mis Tareas
        </h1>

        {/* INPUT */}
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            placeholder="Escribe una tarea..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && agregarTarea()}
            className="flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <button
            onClick={agregarTarea}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 rounded-xl transition active:scale-95"
          >
            +
          </button>
        </div>

        {/* LISTA */}
        <div className="space-y-3">
          <AnimatePresence>
            {tareas.map((tarea) => (
              <motion.div
                key={tarea.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between bg-white rounded-xl shadow-md px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={tarea.completada}
                    onChange={() => toggleTarea(tarea.id)}
                    className="w-5 h-5 accent-purple-500 cursor-pointer"
                  />

                  <span
                    className={`transition ${
                      tarea.completada
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {tarea.texto}
                  </span>
                </div>

                <button
                  onClick={() => eliminarTarea(tarea.id)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* EMPTY STATE */}
        {tareas.length === 0 && (
          <p className="text-center text-gray-400 mt-4">
            No hay tareas aún 👀
          </p>
        )}
      </div>
    </div>
  );
}

export default App;