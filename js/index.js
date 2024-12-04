// Función para obtener productos desde el servidor
async function obtenerProductos() {
  try {
    const response = await fetch('http://localhost:3000/productos');
    if (!response.ok) {
      throw new Error(`Error al cargar los productos: ${response.statusText}`);
    }
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
    return [];
  }
}

// Exportar la función
export { obtenerProductos };
