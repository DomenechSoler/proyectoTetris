const pintarPieza = (panel, pieza) => {
    const { matriz, fila, columna } = pieza;
    const nuevoPanel = panel.map(row => row.slice()); // Crear una copia del panel

    matriz.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell !== 0) {
                nuevoPanel[fila + i][columna + j] = cell;
            }
        });
    });

    return nuevoPanel;
};

export default pintarPieza;