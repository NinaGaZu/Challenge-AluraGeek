import { obtenerProductos } from './index.js';

// Mostrar productos en el DOM
function mostrarProductos(productos) {
  const card = document.querySelector("[data-lista]");
  if (!card) {
    console.error('El contenedor con data-lista no existe en el DOM');
    return;
  }

  card.innerHTML = ''; // Limpiar contenedor

  productos.forEach(producto => {
    const divProducto = document.createElement('div');
    divProducto.classList.add('productos');

    divProducto.innerHTML = `
      <img class="productos-img" src="${producto.imagen}" alt="Producto: ${producto.nombre}">
      <h3 class="productos-titulo">${producto.nombre}</h3>
      <div class="productos-valor">
        <p class="productos-precio">Precio: $${producto.precio}</p>
        <button class="productos-btn" data-id="${producto.Id}">Eliminar</button>
      </div>
    `;

    card.appendChild(divProducto);
  });
}

// Listar productos desde el servidor
async function listarProductos() {
  try {
    console.log('Cargando productos...');
    const productos = await obtenerProductos(); // Datos obtenidos correctamente
    console.log('Productos:', productos);

    if (Array.isArray(productos) && productos.length > 0) {
      mostrarProductos(productos); // Pasar los datos al DOM
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



