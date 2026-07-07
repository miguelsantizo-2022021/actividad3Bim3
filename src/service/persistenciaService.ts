import fs from 'node:fs/promises';
import path from 'node:path';

// Ruta absoluta hacia tu carpeta 'src/data'
const CARPETA_DATOS = path.join(__dirname, '..', 'data');

export class PersistenciaService {
    
    // Guardar datos en el archivo JSON (Escritura asíncrona)
    static async guardarEnArchivo<T>(nombreArchivo: string, datos: T[]): Promise<boolean> {
        try {
            // Si la carpeta 'data' no existe, la crea automáticamente
            await fs.mkdir(CARPETA_DATOS, { recursive: true });
            
            const rutaArchivo = path.join(CARPETA_DATOS, nombreArchivo);
            const textoJSON = JSON.stringify(datos, null, 2); // JSON formateado bonito
            
            await fs.writeFile(rutaArchivo, textoJSON, 'utf-8');
            return true;
        } catch (error: any) {
            console.error(`Error al escribir en ${nombreArchivo}:`, error.message);
            return false;
        }
    }

    // Leer datos del archivo JSON (Lectura y Reconstrucción)
    static async leerDesdeArchivo<T>(nombreArchivo: string): Promise<T[]> {
        const rutaArchivo = path.join(CARPETA_DATOS, nombreArchivo);
        try {
            const contenido = await fs.readFile(rutaArchivo, 'utf-8');
            
            // Validar por si el archivo está completamente vacío
            if (!contenido.trim()) return [];
            
            return JSON.parse(contenido) as T[];
        } catch (error: any) {
            // Si el archivo no existe (error ENOENT), devolvemos un arreglo vacío
            if (error.code === 'ENOENT') {
                console.warn(`El archivo ${nombreArchivo} no existe aún. Se creará al guardar.`);
                return [];
            }
            console.error(`Error crítico al leer ${nombreArchivo}:`, error.message);
            return [];
        }
    }
}