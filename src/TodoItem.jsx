import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function TodoItem({
  tarea,
  toggleCompleted,
  eliminarTarea,
  iniciarEdicion,
  guardarEdicion,
  cancelarEdicion
}) {
  const [nuevoTexto, setNuevoTexto] = useState(tarea.text);

  // Al cambiar la tarea (por cancelar edición o actualizarse), resetea el input
  useEffect(() => {
    setNuevoTexto(tarea.text);
  }, [tarea.text]);

  const manejarGuardar = () => {
    if (nuevoTexto.trim()) {
      guardarEdicion(tarea.id, nuevoTexto.trim()); // ← CORREGIDO
    }
  };

  const manejarKeyDown = (e) => {
    if (e.key === "Enter") manejarGuardar();
    if (e.key === "Escape") cancelarEdicion(tarea.id); // ← CORREGIDO
  };

  return (
    <div className="flex items-center gap-3 justify-between border-b border-gray-300 p-3 shadow-sm rounded">
      {tarea.editing ? (
        <>
          <input
            type="text"
            className="flex-1 p-1 border rounded"
            value={nuevoTexto}
            onChange={(e) => setNuevoTexto(e.target.value)}
            onKeyDown={manejarKeyDown}
            autoFocus
          />

          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={manejarGuardar}
            >
              Guardar
            </button>

            <button
              className="bg-gray-400 text-white px-3 py-1 rounded"
              onClick={() => cancelarEdicion(tarea.id)} // ← CORREGIDO
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          <span
            className={`${
              tarea.completed
                ? "line-through text-gray-400"
                : "text-gray-700"
            } flex-1 cursor-pointer`}
            onClick={() => toggleCompleted(tarea.id)} // ← CORREGIDO
          >
            {tarea.text}
          </span>

          <input
            className="w-4 h-4"
            type="checkbox"
            checked={tarea.completed}
            onChange={() => toggleCompleted(tarea.id)} // ← CORREGIDO
          />

          <button
            className="mr-2 text-yellow-600 font-semibold"
            onClick={() => iniciarEdicion(tarea.id)} // ← CORREGIDO
          >
            Editar
          </button>

          <button>
            <TrashIcon
              className="w-5 h-5 text-red-500"
              onClick={() => eliminarTarea(tarea.id)} // ← CORREGIDO
            />
          </button>
        </>
      )}
    </div>
  );
}
