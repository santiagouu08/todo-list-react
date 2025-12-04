import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect("TU_MONGO_URI_AQUI")
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.log(err));

// Modelo Tarea
const TareaSchema = new mongoose.Schema({
  text: String,
  completed: Boolean
});

const Tarea = mongoose.model("Tarea", TareaSchema);

// Obtener tareas
app.get("/tareas", async (req, res) => {
  const tareas = await Tarea.find();
  res.json(tareas);
});

// Crear tarea
app.post("/tareas", async (req, res) => {
  const nuevaTarea = new Tarea(req.body);
  await nuevaTarea.save();
  res.json(nuevaTarea);
});

// Actualizar tarea
app.put("/tareas/:id", async (req, res) => {
  const tareaActualizada = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tareaActualizada);
});

// Eliminar tarea
app.delete("/tareas/:id", async (req, res) => {
  await Tarea.findByIdAndDelete(req.params.id);
  res.json({ message: "Tarea eliminada" });
});

app.listen(4000, () => console.log("Servidor en http://localhost:4000"));
