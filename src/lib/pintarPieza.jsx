import Pieza from "../componentes/pieza"

// Función para pintar una pieza en el panel
export default function pintarPieza(panel, pieza) {
    // Verifica si la pieza o su matriz no están definidas
    if (!pieza || !pieza.matriz) {
        console.error("Pieza o matriz no definida")
        return panel // Retorna el panel sin cambios
    }

    // Extrae la matriz, fila y columna de la pieza
    const { matriz, fila, columna } = pieza

    // Crea una copia del panel para no modificar el original
    const nuevoPanel = panel.map(row => row.slice())

    // Recorre cada celda de la matriz de la pieza
    matriz.forEach((row, i) => {
        row.forEach((cell, j) => {
            // Si la celda no está vacía (es diferente de 0)
            if (cell !== 0) {
                // Pinta la celda en la posición correspondiente del nuevo panel
                nuevoPanel[fila + i][columna + j] = cell
            }
        })
    })

    // Retorna el nuevo panel con la pieza pintada
    return nuevoPanel
}