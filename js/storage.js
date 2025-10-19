// === Obtener transacciones del localStorage === Integrante 4 - Lily

function obtenerTransacciones() {
  const datos = localStorage.getItem('transacciones');
  return datos ? JSON.parse(datos) : [];
}

// === Guardar transacciones en localStorage ===
function guardarTransacciones(transacciones) {
  localStorage.setItem('transacciones', JSON.stringify(transacciones));
}

// === Agregar una nueva transacción ===
function agregarTransaccion(tipo, descripcion, monto) {
  const transacciones = obtenerTransacciones();
  transacciones.push({ tipo, descripcion, monto });
  guardarTransacciones(transacciones);
  mostrarTransaccionesGuardadas();
}

// === Mostrar transacciones en la tabla ===
function mostrarTransaccionesGuardadas() {
  const tabla = document.getElementById('tabla-transacciones');
  const totalRegistros = document.getElementById('total-registros');
  const transacciones = obtenerTransacciones();

  tabla.innerHTML = '';

  transacciones.forEach((t, i) => {
    const fila = document.createElement('tr');
    const tipoCapitalizado = t.tipo.charAt(0).toUpperCase() + t.tipo.slice(1);
    fila.innerHTML = `
      <td>${i + 1}</td>
      <td>${tipoCapitalizado}</td>
      <td>${t.descripcion}</td>
      <td>${parseFloat(t.monto).toFixed(2)}</td>
    `;
    tabla.appendChild(fila);
  });

  totalRegistros.textContent = `Total de registros: ${transacciones.length}`;
}

// === Limpiar transacciones con modal ===
function limpiarTransacciones() {
  const modalHtml = `
    <div class="modal fade" id="confirmModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Limpiar registros</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            ¿Deseas eliminar todos los registros guardados?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" id="confirmDelete">Sí, eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  if (!document.getElementById('confirmModal')) {
    document.body.insertAdjacentHTML('beforeend', modalHtml);
  }

  const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
  modal.show();

  const confirmBtn = document.getElementById('confirmDelete');
  confirmBtn.onclick = () => {
    localStorage.removeItem('transacciones');
    mostrarTransaccionesGuardadas();
    modal.hide();
  };
}

// === Inicialización ===
document.addEventListener('DOMContentLoaded', () => {
  mostrarTransaccionesGuardadas();

  const form = document.getElementById('form-transaccion');

  const limpiarBtn = document.getElementById('btn-limpiar-registros');
  if (limpiarBtn) {
    limpiarBtn.addEventListener('click', limpiarTransacciones);
  }
});