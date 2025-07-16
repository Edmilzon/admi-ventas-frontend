import axios from 'axios';

const API_URL = 'https://admi-ventas-backend.onrender.com/usuarios';

export interface RegistroUsuarioPayload {
  correo: string;
  nombre: string;
  contrasena: string;
  direccion: string;
  telf: string;
}

export interface LoginUsuarioPayload {
  correo: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
}

export const registrarUsuario = async (datos: RegistroUsuarioPayload) => {
  const response = await axios.post(`${API_URL}/registro`, datos);
  return response.data;
};

export const loginUsuario = async (datos: LoginUsuarioPayload): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/login`, datos);
  return response.data;
}; 