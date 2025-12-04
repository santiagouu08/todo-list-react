import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

import { db } from "../firebase";

const tasksRef = collection(db, "tasks");

// Crear tarea
export const addTask = (text) => {
  return addDoc(tasksRef, {
    text,
    completed: false,
    createdAt: serverTimestamp(),
  });
};

// Eliminar tarea
export const deleteTaskById = (id) => {
  return deleteDoc(doc(db, "tasks", id));
};

// Actualizar tarea
export const updateTaskById = (id, fields) => {
  return updateDoc(doc(db, "tasks", id), fields);
};

// Escuchar cambios en tiempo real
export const listenTasks = (callback) => {
  const q = query(tasksRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(tasks);
  });
};
