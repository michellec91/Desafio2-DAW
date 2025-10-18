document.addEventListener('DOMContentLoaded', () => {

    //Titulo y resumen
    const titulo = document.querySelector('h1');
    const cantidadTotal = document.getElementById('saldo-total');
    const ingresoTotal = document.getElementById('total-ingresos');
    const egresoTotal = document.getElementById('total-egresos');
    const porcentajeDeEgreso = document.getElementById('porcentaje-egresos');

    //Transacciones
    const form = document.getElementById('form-transaccion');
    const formTipo = document.getElementById('tipo');
    const formDesc = document.getElementById('descripcion');
    const formCant = document.getElementById('monto');

    //tabla de ingresos y egresos
    const tabla = document.getElementById('cuerpo-tabla');
    const botonIngreos = document.getElementById('btn-ingresos');
    const botonEgresos = document.getElementById('btn-egresos');

    var mensaje = document.querySelector('.message-alert-container');
    if(!mensaje) {
        mensaje = document.createElement('div');
        mensaje.className = 'message-alert-container container mt-3'; 
        form.parentNode.insertBefore(mensaje, form.nextSibling);
    }

    var transacciones = []; 
    var datoAingresar = 'ingreso';

//Cambio de fecha en el titulo

    function cambioFechaTitulo() {
    const fechaActual = new Date();
    const formato = { day: 'numeric', year: 'numeric', month:'long'};
    const formatoCompleto = fechaActual.toLocaleDateString('es-ES', formato);
    titulo.textContent = `Presupuesto de ${formatoCompleto.charAt(0).toLocaleUpperCase() + formatoCompleto.slice(1)}`;
    }

    function mensajeAmostrar(msg, type) {
        mensaje.innerHTML = 
        `<div class = "alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show" role="alert">
                ${msg}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
    }

    function actualizarResumen() {
        const ingreso = transacciones.filter(t => t.tipo === 'ingreso').map(t => parseFloat(t.monto));
        const egresos = transacciones.filter(t => t.tipo === 'egreso').map(t => parseFloat(t.monto));
        const totalDeIngresos = ingreso.reduce((acc, curr) => acc + curr, 0);
        const totalDeEngresos = egresos.reduce((acc, curr) => acc + curr, 0);
        const SaldoTotal = totalDeIngresos - totalDeEngresos;

        const decimalSaldoTotal = SaldoTotal.toFixed(2);

        cantidadTotal.textContent = `${SaldoTotal >= 0 ? '+' : ''}${decimalSaldoTotal}`;
        cantidadTotal.classList.toggle('text-success', SaldoTotal >= 0 );
        cantidadTotal.classList.toggle('text-danger', SaldoTotal <0);

        ingresoTotal.textContent = `+ ${totalDeIngresos.toFixed(2)}`;
        egresoTotal.textContent = `- ${totalDeEngresos.toFixed(2)}`;

        let porcentajeFinal = 0; 
        if(totalDeIngresos > 0) {
            porcentajeFinal = (totalDeEngresos / totalDeIngresos) * 100;
        }
        porcentajeDeEgreso.textContent = `${porcentajeFinal.toFixed(0)}%`;
        actualizarTabla(totalDeIngresos);
    }

    function actualizarTabla(totalDeIngresos) {
        tabla.innerHTML = '';
        const transaccionesFiltradas = transacciones.filter(t => t.tipo === datoAingresar);

        transaccionesFiltradas.forEach(transaction => {
            const cantidad = parseFloat(transaction.monto);
            const esUnGasto = transaction.tipo === 'egreso';

            const nuevaFila = document.createElement('tr');
            
            const descripcionCelda = document.createElement('td');
            descripcionCelda.textContent = transaction.descripcion;
            nuevaFila.appendChild(descripcionCelda);

            const cantidadCelda = document.createElement('td');
            cantidadCelda.textContent = `${esUnGasto  ? '-' : '+'} ${cantidad.toFixed(2)}`;
            cantidadCelda.className = esUnGasto  ? 'text-danger fw-bold' : 'text-success fw-bold';
            nuevaFila.appendChild(cantidadCelda); 

            const celdaPorcentaje = document.createElement('td');

            if(esUnGasto) {
                var porcentajeActual = 0; 
                if(totalDeIngresos > 0) {
                    porcentajeActual = (cantidad / totalDeIngresos) * 100;
                } 
                        celdaPorcentaje.innerHTML = `<span class="badge text-bg-secondary">${porcentajeActual.toFixed(0)}%</span>`;
            } else {
                celdaPorcentaje.textContent = '';
            }
            nuevaFila.appendChild(celdaPorcentaje);

            tabla.appendChild(nuevaFila);
        })

    
    }

    function manejarPestana(tab) {
        datoAingresar = tab;
        
        [botonIngreos, botonEgresos].forEach(btn => {
            btn.classList.remove('active', 'btn-dark');
            btn.classList.add('btn-light');
        });

        const activeBtn = tab === 'ingreso' ? botonIngreos : botonEgresos;
        activeBtn.classList.add('active', 'btn-dark');
        activeBtn.classList.remove('btn-light');

        actualizarResumen(); 
    }

    botonIngreos.addEventListener('click', () => manejarPestana('ingreso'));
    botonEgresos.addEventListener('click', () => manejarPestana('egreso'));

    form.addEventListener('submit', (a) => {
            a.preventDefault();

            const tipof = formTipo.value;
            const descripcion = formDesc.value.trim();
            const cantidadf = parseFloat(formCant.value); 

            if(descripcion === '' || descripcion.length < 2) {
                mensajeAmostrar('La descripcion es obligatoria y debe contener mas detalles');
                return;
            } 

            if(isNaN(cantidadf) || cantidadf <= 0) {
                mensajeAmostrar('El monto debe ser un numero positivo');
                return;
            }

            const nuevaTransaccion = {
                id: Date.now(),
                tipo: tipof,
                descripcion: descripcion,
                monto: cantidadf.toFixed(2), 
            };

            transacciones.push(nuevaTransaccion);

            formDesc.value = '';
            formCant.value = '';
            formTipo.value = 'ingreso';

            actualizarResumen();
            mensajeAmostrar('Transaccion agregada');
        });

    cambioFechaTitulo();
    manejarPestana(datoAingresar);

});




