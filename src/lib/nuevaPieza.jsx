import ModeloPieza from './modeloPieza'

export default function nuevaPieza(modelos) {
    const numero = Math.floor(Math.random() * modelos.length)

    if (!modelos[numero]) {
        console.error(`Modelo no encontrado para el índice: ${numero}`)
        return null
    }
    const miPieza = new ModeloPieza(numero, modelos[numero].nombre, 0, modelos)
    return miPieza
}