// Función para obtener productos desde el servidor
async function obtenerProductos() {
  try {
    const response = await fetch('https://68823c6a66a7eb81224defdc.mockapi.io/productos', {
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Error al cargar los productos: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
    return [];
  }
}

// Función para crear un nuevo producto en el servidor
async function crearProducto(nombre, precio, imagen) {
  try {
    // Obtener todos los productos existentes
    const productos = await obtenerProductos();

    // Encontrar el ID más alto
    const maxid = productos.reduce((max, producto) => Math.max(max, Number(producto.id)), 0);

    // Crear el nuevo producto con ID correlativo
    const nuevoProducto = {
      id: maxid + 1,
      nombre,
      precio,
      imagen,
    };

    // Enviar el nuevo producto al servidor
    const response = await fetch("https://68823c6a66a7eb81224defdc.mockapi.io/productos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(nuevoProducto),
    });

    if (!response.ok) {
      throw new Error("Error al crear el producto");
    }

    return await response.json();
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
    return null;
  }
}

//Funcion para eliminar un producto
async function eliminarProducto(id) {
  try {
    const response = await fetch(`https://68823c6a66a7eb81224defdc.mockapi.io/productos${id}`, {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar el producto: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
    return null;
  }
}

// Exportar funciones
export const index = {
  obtenerProductos,
  crearProducto,
  eliminarProducto
};
