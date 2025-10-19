/**
 * Este archivo simula la carga de datos iniciales desde un servidor.
 * Utiliza un arreglo local como una base de datos simulada (db.json).
 * Se encarga de cargar estos datos en la aplicación cuando el usuario la visita por primera vez.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Simulación de una base de datos con datos de ejemplo.
    // Estos datos solo se cargarán la primera vez que el usuario abra la aplicación,
    // para no sobreescribir sus propios registros.
    const datosSimulados = [
        { id: Date.now() + 1, tipo: 'ingreso', descripcion: 'Salario Quincenal', monto: '750.00' },
        { id: Date.now() + 2, tipo: 'ingreso', descripcion: 'Venta de artículo online', monto: '125.50' },
        { id: Date.now() + 3, tipo: 'egreso', descripcion: 'Pago de alquiler', monto: '400.00' },
        { id: Date.now() + 4, tipo: 'egreso', descripcion: 'Supermercado', monto: '150.75' },
        { id: Date.now() + 5, tipo: 'egreso', descripcion: 'Factura de Internet', monto: '45.00' }
    ];

    /**
     * Función que simula una petición AJAX para cargar los datos iniciales.
     * - Verifica si ya existen datos en localStorage.
     * - Si NO existen, carga los datos simulados.
     * - Si YA existen, los carga desde localStorage para mantener la persistencia de datos del usuario.
     */
    function cargarDatosIniciales() {
        // Simulamos un retraso de red de 500ms para emular una petición real.
        setTimeout(() => {
            // Obtenemos las transacciones existentes desde localStorage (función de storage.js)
            const transaccionesExistentes = obtenerTransacciones();

            // Verificamos si no hay transacciones guardadas.
            if (transaccionesExistentes.length === 0) {
                console.log('No hay datos locales. Cargando datos simulados...');
                // Si está vacío, usamos los datos simulados.
                // NOTA: Esto asume que 'transacciones' (de validaciones.js) es una variable global.
                transacciones = [...datosSimulados]; 
                
                // Guardamos los datos simulados en localStorage para futuras visitas.
                guardarTransacciones(transacciones); 
            } else {
                console.log('Datos locales encontrados. Cargando desde localStorage...');
                // Si ya hay datos, los cargamos en la variable principal de la aplicación.
                transacciones = [...transaccionesExistentes];
            }

            // 3. Una vez cargados los datos, actualizamos toda la interfaz de usuario.
            actualizarResumen(); // Función de validaciones.js que actualiza el resumen y la tabla principal.
            mostrarTransaccionesGuardadas(); // Función de storage.js que actualiza la tabla de resumen inferior.

        }, 500);
    }

    // Ejecutamos la función para cargar los datos cuando el DOM esté completamente listo.
    cargarDatosIniciales();
});