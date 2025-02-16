const pintarPieza = (panel, pieza) => {
    const { matriz, fila, columna } = pieza; 
    const nuevoPanel = panel.map(row => row.slice()); // Crear una copia del panel

    matriz.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell !== 0) { // Si la celda no está vacía, asigna el valor de la celda a la posición correspondiente en el nuevo panel
                nuevoPanel[fila + i][columna + j] = cell;
            }
        });
    });

    return nuevoPanel; // Devuelve el nuevo panel con la pieza pintada
};

export default pintarPieza; // Exporta la función pintarPieza como el valor por defecto del módulo