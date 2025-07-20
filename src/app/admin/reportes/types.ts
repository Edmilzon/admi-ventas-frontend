export type VentaReporte = {
  id: number;
  usuario?: { nombre?: string };
  fecha: string;
  total: string;
  estado: string;
  detalles?: { producto?: { nombre?: string } }[];
}; 