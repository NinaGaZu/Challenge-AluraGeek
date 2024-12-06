import { index } from './index.js';  
import { mostrarProductos } from './mostrarCards.js'; // Asegúrate de la ruta correcta

const formulario = document.querySelector("[data-formulario]");

async function crearProducto(evento) {
  evento.preventDefault();

  const nombre = document.querySelector("[data-nombre]").value;
  const precio = document.querySelector("[data-precio]").value;
  const imagen = document.querySelector("[data-imagen]").value;

  try {
    // Crear el producto
    const nuevoProducto = await index.crearProducto(Date.now(), nombre, precio, imagen); // Usando Date.now() como ID único temporal

    if (nuevoProducto) {
      alert('Producto creado con éxito');
      // Añadir el nuevo producto a la lista en el DOM
      mostrarProductos([nuevoProducto]); 
       // Mostrar solo el nuevo producto
    }
  } catch (e) {
    alert(`Hubo un error: ${e}`);
  }
}

formulario.addEventListener("submit", crearProducto);
