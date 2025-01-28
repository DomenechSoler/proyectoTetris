class ModeloPieza {
    constructor(numero, nombre, angulo, modelos) {
        this.numero = numero
        this.nombre = nombre
        this.angulo = angulo
        this.fila = 0
        this.columna = 1
        this.matriz = modelos[numero].pieza[angulo]
    }

    girar() {
        this.angulo = this.angulo + 1
        if (this.angulo == 4) this.angulo = 0
        this.matriz = modelos.piezas[this.numero].matriz[this.angulo]
    }
}

export default ModeloPieza