import axios from "axios";
import { Producto } from "../interface/productos";

const API_URL = "https://admi-ventas-backend.onrender.com/productos";

export const obtenerProductos = async (): Promise<Producto[]> => {
  const response = await axios.get<Producto[]>(API_URL);
  return response.data;
};
