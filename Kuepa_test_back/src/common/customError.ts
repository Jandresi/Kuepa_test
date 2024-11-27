export class CustomError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message); // Llama al constructor de la clase base
        this.status = status; // Asigna el código de estado HTTP
        this.name = this.constructor.name; // Asigna el nombre de la clase de error
    }
}
