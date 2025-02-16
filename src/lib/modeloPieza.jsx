class ModeloPieza {
    constructor(numero, nombre, angulo, modelos) {
        this.numero = numero
        this.nombre = nombre
        this.angulo = angulo
        this.fila = 0
        this.columna = 1
        this.matriz = modelos[numero].pieza[angulo]
    }
}

export default ModeloPieza