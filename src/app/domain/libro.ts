import Categoria from "./categoria";

export default interface Libro{
    codigo?: number;
    nombre: string;
    precio: number;
    autor: string;
    imagen: string;
    disponible: boolean;
    categoriaNombre: string;
}