import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

import {
  addTask,
  deleteTaskById,
  updateTaskById,
  listenTasks
} from "./services/tasksService";

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState("");

  // 🔹 Escuchar tareas en tiempo real desde Firestore
  useEffect(() => {
    const unsubscribe = listenTasks((tasks) => {
      setTareas(tasks);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Agregar tarea
  const agregarTarea = async () => {
    if (!input.trim()) return;

    await addTask(input.trim());
    setInput("");
  };

  // 🔹 Cambiar completado
  const toggleCompleted = (id) => {
    const tarea = tareas.find((t) => t.id === id);
    updateTaskById(id, { completed: !tarea.completed });
  };

  // 🔹 Eliminar tarea
  const eliminarTarea = (id) => {
    deleteTaskById(id);
  };

  // 🔹 Iniciar edición
  const iniciarEdicion = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, editing: true } : t
      )
    );
  };

  // 🔹 Guardar edición
  const guardarEdicion = (id, nuevoTexto) => {
    updateTaskById(id, { text: nuevoTexto });
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, editing: false } : t
      )
    );
  };

  // 🔹 Cancelar edición
  const cancelarEdicion = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, editing: false } : t
      )
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-2 rounded shadow">
      <h1 className="text-3xl font-bold mb-5 text-center">
        LISTA DE TAREAS
      </h1>

      <div className="flex gap-3 mb-5">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Añadir Tarea"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={agregarTarea}
        >
          Añadir Tarea
        </button>
      </div>

      <div className="space-y-2">
        {tareas.map((tarea) => (
          <TodoItem
            key={tarea.id}
            tarea={tarea}
            toggleCompleted={toggleCompleted}
            eliminarTarea={eliminarTarea}
            iniciarEdicion={iniciarEdicion}
            guardarEdicion={guardarEdicion}
            cancelarEdicion={cancelarEdicion}
          />
        ))}
      </div>
    </div>
  );
}
