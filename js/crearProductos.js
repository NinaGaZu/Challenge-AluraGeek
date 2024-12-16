import { index } from './index.js';  
import { agregarProductoAlDOM } from './mostrarCards.js';

const formulario = document.querySelector("[data-formulario]");
const botonLimpiar = document.querySelector(".limpiar");

async function crearProducto(evento) {
  evento.preventDefault(); // Evitar comportamiento por defecto del formulario

  const nombre = document.querySelector("[data-nombre]").value.trim();
  const precio = document.querySelector("[data-precio]").value.trim();
  const imagen = document.querySelector("[data-imagen]").value.trim();

  // Validación de campos
  if (!nombre || !precio || !imagen || isNaN(precio) || Number(precio) <= 0) {
    alert("Todos los campos son obligatorios y el precio debe ser un número mayor a 0.");
    return;
  }

  try {
    // Crear el producto en el servidor
    const productoCreado = await index.crearProducto(nombre, precio, imagen);

    if (productoCreado) {
      // Agregar el nuevo producto al DOM
      agregarProductoAlDOM(productoCreado);

      // Limpiar los campos del formulario
      formulario.reset();

      console.log("Producto enviado:", productoCreado);
      alert("Producto agregado exitosamente.");
    }
  } catch (error) {
    console.error("Hubo un problema al crear el producto:", error);
    alert("Error al crear el producto. Intenta de nuevo.");
  }
}

// Escuchar el evento 'submit' del formulario
formulario.addEventListener("submit", crearProducto);

// Escuchar el evento 'click' del botón limpiar
botonLimpiar.addEventListener("click", (evento) => {
  evento.preventDefault(); // Evitar el submit por defecto
  formulario.reset(); // Limpiar todos los campos del formulario
  console.log("Formulario limpiado");
});

