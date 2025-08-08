// src/App.jsx

import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // La función del componente
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // La llamada a useEffect con la función a ejecutar
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cursos/");
        setItems(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []); // El array de dependencias. ¡Este es el punto clave!

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error al cargar los datos: {error.message}</div>;

  return (
    <div className="App">
      <h1>Lista de cursos</h1>
      
        {items.map((item) => (
          <div key={item.id}>
            <h2 >{item.nombre}</h2>
            <p>{item.descripcion}</p>
            <small>Autor: {item.creador}</small>
            <p>{item.duracion} minutos</p>
          </div>
        ))}
      
    </div>
  );
}

export default App;
