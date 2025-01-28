export default function colorPieza(numero) {
    switch (numero) {
        case 0:
            return "bg-white" 
        case 1:
            return "bg-black" 
        case 2:
            return "bg-primary" 
        case 3:
            return "bg-warning" 
        case 4:
            return "bg-danger" 
        case 5:
            return "bg-success" 
        case 6:
            return "bg-info" 
        case 7:
            return "bg-secondary" 
        case 8:
            return "bg-dark" 
        default:
            return "bg-black" 
    }
}