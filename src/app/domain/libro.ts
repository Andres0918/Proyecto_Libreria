import Categoria from "./categoria";
export default interface Libro{
    codigo?: number;
    nombre: string;
    precio: string;
    autor: string;
    imagen: string;
    disponible: boolean;
    categoria: Categoria;
}