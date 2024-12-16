import { index } from './index.js';

// Mostrar productos en el DOM
export function mostrarProductos(productos) {
  const card = document.querySelector("[data-lista]");
  if (!card) {
    console.error('El contenedor con data-lista no existe en el DOM');
    return;
  }

  card.innerHTML = ''; // Limpiar contenedor antes de renderizar

  productos.forEach(producto => agregarProductoAlDOM(producto)); // Renderizar cada producto
}

// Función para agregar un producto individual al DOM
export function agregarProductoAlDOM(producto) {
  const card = document.querySelector("[data-lista]");
  if (!card) {
    console.error('El contenedor con data-lista no existe en el DOM');
    return;
  }

  const divProducto = document.createElement('div');
  divProducto.classList.add('productos');

  divProducto.innerHTML = `
    <img class="productos-img" src="${producto.imagen}" alt="Producto: ${producto.nombre}">
    <h3 class="productos-titulo">${producto.nombre}</h3>
    <div class="productos-valor">
      <p class="productos-precio">Precio: $${producto.precio}</p>
      <button class="productos-btn eliminar-btn" data-id="${producto.id}">
        <img src="../assets/iconos/trash_bin_icon.png" alt="Eliminar">
      </button>
    </div>
  `;

  // Agregar evento para eliminar producto
  const botonEliminar = divProducto.querySelector(".eliminar-btn");
  botonEliminar.addEventListener('click', () => eliminarProductoDelDOM(producto.id, divProducto));

  card.appendChild(divProducto);
}

// Función para eliminar un producto del DOM y del servidor
async function eliminarProductoDelDOM(id, divProducto) {
  if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
    try {
      // Asegúrate de pasar el ID como cadena
      const resultado = await index.eliminarProducto(String(id)); 
      if (resultado) {
        divProducto.remove(); // Remover el producto del DOM
        alert("Producto eliminado exitosamente.");
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert("No se pudo eliminar el producto. Intenta de nuevo.");
    }
  }
}


// Listar productos desde el servidor al cargar la página
async function listarProductos() {
  try {
    const productos = await index.obtenerProductos();
    if (Array.isArray(productos) && productos.length > 0) {
      mostrarProductos(productos);
    } else {
      console.warn('No hay productos para mostrar.');
    }
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  listarProductos();
});
