import { ProductoService } from './service/productoService';
import { ClienteService } from './service/clienteService';

async function ejecutarPruebas() {
    console.log('=== PRUEBAS DEL MÓDULO DE PERSISTENCIA ===\n');

    // --- PRUEBAS DE PRODUCTOS ---
    console.log('--- 1. Pruebas con Productos ---');
    // Guardar producto válido
    await ProductoService.agregarProducto({
        id: 'PROD-01',
        nombre: 'Cuaderno Universitario',
        precio: 15.50,
        existencias: 50
    });

    // Intentar guardar producto inválido (precio negativo)
    await ProductoService.agregarProducto({
        id: 'PROD-02',
        nombre: 'Lapicero Azul',
        precio: -1.00,
        existencias: 10
    });


    // --- PRUEBAS DE CLIENTES ---
    console.log('\n--- 2. Pruebas con Clientes ---');
    // Guardar cliente válido
    await ClienteService.agregarCliente({
        id: 'CLI-01',
        nombreCompleto: 'Miguel Santizo',
        correo: 'msantizo@kinal.edu.gt',
        telefono: '5555-1234'
    });


    // --- MOSTRAR DATOS FINALES ---
    console.log('\n--- 3. Datos Reconstruidos desde JSON ---');
    const todosLosProductos = await ProductoService.obtenerProductos();
    const todosLosClientes = await ClienteService.obtenerClientes();

    console.log('Productos en el archivo:', todosLosProductos);
    console.log('Clientes en el archivo:', todosLosClientes);
}

ejecutarPruebas();