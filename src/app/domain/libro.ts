import Categoria from "./categoria";
export default interface Libro{
    id?: string;
    nombre: string;
    precio: string;
    autor: string;
    imagen: string;
    disponible: boolean;
    categoria: Categoria;
}