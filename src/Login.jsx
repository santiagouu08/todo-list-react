import { useState } from "react";
import { auth, db } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Login({ setUser }) {
  const [isRegister, setIsRegister] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔐 LOGIN
  const login = async () => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      setUser(res.user);
    } catch (err) {
      alert(err.message);
    }
  };

  // 🆕 REGISTER
  const register = async () => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = res.user;

      // 🔥 GUARDAR EN FIRESTORE
      await setDoc(doc(db, "users", user.uid), {
        nombre: form.nombre,
        apellido: form.apellido,
        username: form.username,
        email: form.email,
        uid: user.uid,
        createdAt: new Date(),
      });

      setUser(user);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80">

        <h2 className="text-xl font-bold mb-4 text-center">
          {isRegister ? "Registro" : "Login"}
        </h2>

        {isRegister && (
          <>
            <input name="nombre" placeholder="Nombre" onChange={handleChange} className="input" />
            <input name="apellido" placeholder="Apellido" onChange={handleChange} className="input" />
            <input name="username" placeholder="Username" onChange={handleChange} className="input" />
          </>
        )}

        <input name="email" placeholder="Correo" onChange={handleChange} className="input" />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} className="input" />

        <button
          onClick={isRegister ? register : login}
          className="w-full bg-purple-500 text-white p-2 rounded mt-3"
        >
          {isRegister ? "Registrarse" : "Iniciar sesión"}
        </button>

        <p
          onClick={() => setIsRegister(!isRegister)}
          className="text-sm text-center mt-3 cursor-pointer"
        >
          {isRegister
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </p>
      </div>
    </div>
  );
}

export default Login;