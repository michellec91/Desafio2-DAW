
document.addEventListener('DOMContentLoaded', () => {

    //Simulación de la base de datos.

    const datosSimulados = [
        { id: Date.now() + 1, tipo: 'ingreso', descripcion: 'Salario Quincenal', monto: '750.00' },
        { id: Date.now() + 2, tipo: 'ingreso', descripcion: 'Venta de artículo online', monto: '125.50' },
        { id: Date.now() + 3, tipo: 'egreso', descripcion: 'Pago de alquiler', monto: '400.00' },
        { id: Date.now() + 4, tipo: 'egreso', descripcion: 'Supermercado', monto: '150.75' },
        { id: Date.now() + 5, tipo: 'egreso', descripcion: 'Factura de Internet', monto: '45.00' }
    ];

    
    function cargarDatosIniciales() {
        // Simulación de un retraso de red de 500ms
        setTimeout(() => {
            // Obtenemos las transacciones existentes desde localStorage 
            const transaccionesExistentes = obtenerTransacciones();

            // Verificamos si no hay transacciones guardadas.
            if (transaccionesExistentes.length === 0) {
                console.log('No hay datos locales. Cargando datos simulados...');
                // Si está vacío, usamos los datos simulados.
                transacciones = [...datosSimulados]; 
                
                // Guardamos los datos simulados en localStorage para futuras visitas.
                guardarTransacciones(transacciones); 
            } else {
                console.log('Datos locales encontrados. Cargando desde localStorage...');
                // Si ya hay datos, los cargamos en la variable principal de la aplicación.
                transacciones = [...transaccionesExistentes];
            }

            //actualizamos toda la interfaz de usuario.
            actualizarResumen(); //actualizacion del resumen y la tabla principal.
            mostrarTransaccionesGuardadas(); //actualizacion de la tabla de resumen inferior.

        }, 500);
    }

    // Ejecutamos la función para cargar los datos cuando el DOM esté listo.
    cargarDatosIniciales();
});