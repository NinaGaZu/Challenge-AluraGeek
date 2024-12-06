// Función para obtener productos desde el servidor
async function obtenerProductos() {
  try {
    const response = await fetch('http://localhost:3000/productos', {
      method: 'GET',
      headers:{
        "Content-type":"application/json"
        }
    });
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

async function crearProducto(Id, nombre, precio,imagen) {
  try{
    const response = await fetch("http://localhost:3000/productos", {
      method: "POST",
      headers: {
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        id:Id,
        nombre:nombre,
        precio:precio,
        imagen:imagen
      }),
    });

    if(!response.ok){
      throw new Error("Error al crear el producto");
    }

    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
    return null; // Devolvemos null si hay un error
  }
}

// Exportar la función
export  const index = {
   obtenerProductos, crearProducto
  };
