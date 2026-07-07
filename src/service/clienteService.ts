import { Cliente } from '../models/cliente';
import { PersistenciaService } from '../service/persistenciaService';

const ARCHIVO = 'clientes.json';

export class ClienteService {
    private static validar(cliente: Cliente): void {
        if (!cliente.id || !cliente.nombreCompleto || !cliente.correo) {
            throw new Error('ID, Nombre Completo y Correo son obligatorios.');
        }
    }

    static async agregarCliente(nuevoCliente: Cliente): Promise<void> {
        try {
            this.validar(nuevoCliente);
            
            const clientes = await PersistenciaService.leerDesdeArchivo<Cliente>(ARCHIVO);
            
            if (clientes.some(c => c.id === nuevoCliente.id)) {
                throw new Error(`El cliente con ID ${nuevoCliente.id} ya existe.`);
            }

            clientes.push(nuevoCliente);
            await PersistenciaService.guardarEnArchivo(ARCHIVO, clientes);
            console.log(`Cliente "${nuevoCliente.nombreCompleto}" guardado con éxito.`);
        } catch (error: any) {
            console.error(`Error al agregar cliente: ${error.message}`);
        }
    }

    static async obtenerClientes(): Promise<Cliente[]> {
        return await PersistenciaService.leerDesdeArchivo<Cliente>(ARCHIVO);
    }
}