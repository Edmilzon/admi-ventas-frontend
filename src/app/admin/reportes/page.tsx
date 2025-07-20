"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { VentaReporte } from './types';
import PDFGenerator from './PDFGenerator';

const API_BASE = "https://admi-ventas-backend.onrender.com/ventas";

const REPORTES = [
  { key: "todos", label: "Todos los pedidos", endpoint: API_BASE },
  { key: "por-dia", label: "Por día", endpoint: `${API_BASE}/por-dia` },
  { key: "por-semana", label: "Por semana", endpoint: `${API_BASE}/por-semana` },
  { key: "por-producto", label: "Por producto", endpoint: `${API_BASE}/por-producto` },
  { key: "por-semanas-del-mes", label: "Por semanas del mes", endpoint: `${API_BASE}/por-semanas-del-mes` },
  { key: "por-rango-fechas", label: "Por rango de fechas", endpoint: `${API_BASE}/por-rango-fechas` },
  { key: "por-estado", label: "Por estado", endpoint: `${API_BASE}/por-estado` },
];

const ReportCharts = dynamic(() => import("./ReportCharts"), { ssr: false });

type ParamFiltro = Record<string, string | number | undefined>;

export default function AdminReportesPage() {
  const [tipo, setTipo] = useState("todos");
  const [param, setParam] = useState<ParamFiltro>({});
  const [data, setData] = useState<VentaReporte[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setParam({ ...param, [e.target.name]: e.target.value });
  };

  const fetchReporte = async () => {
    setLoading(true);
    setError("");
    let url = "";
    switch (tipo) {
      case "todos":
        url = API_BASE;
        break;
      case "por-dia":
        url = `${API_BASE}/por-dia?fecha=${param.fecha || ""}`;
        break;
      case "por-semana":
        url = `${API_BASE}/por-semana?fecha=${param.fecha || ""}`;
        break;
      case "por-producto":
        url = `${API_BASE}/por-producto?productoId=${param.productoId || ""}`;
        break;
      case "por-semanas-del-mes":
        url = `${API_BASE}/por-semanas-del-mes?mes=${param.mes || ""}&anio=${param.anio || ""}`;
        break;
      case "por-rango-fechas":
        url = `${API_BASE}/por-rango-fechas?fechaInicio=${param.fechaInicio || ""}&fechaFin=${param.fechaFin || ""}`;
        break;
      case "por-estado":
        url = `${API_BASE}/por-estado?estado=${param.estado || ""}`;
        break;
      default:
        url = API_BASE;
    }
    try {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    } catch {
      setError("No se pudo obtener el reporte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-amber-700">Reportes de Ventas</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="font-semibold">Tipo de reporte</label>
            <select
              className="w-full border rounded px-3 py-2 mt-1"
              value={tipo}
              onChange={e => { setTipo(e.target.value); setParam({}); setData([]); }}
            >
              {REPORTES.map(r => (
                <option key={r.key} value={r.key}>{r.label}</option>
              ))}
            </select>
          </div>
          {/* Filtros dinámicos */}
          {tipo === "por-dia" && (
            <div>
              <label className="font-semibold">Fecha</label>
              <input type="date" name="fecha" className="border rounded px-3 py-2 mt-1" onChange={handleChange} />
            </div>
          )}
          {tipo === "por-semana" && (
            <div>
              <label className="font-semibold">Fecha (día de la semana)</label>
              <input type="date" name="fecha" className="border rounded px-3 py-2 mt-1" onChange={handleChange} />
            </div>
          )}
          {tipo === "por-producto" && (
            <div>
              <label className="font-semibold">ID Producto</label>
              <input type="number" name="productoId" className="border rounded px-3 py-2 mt-1" onChange={handleChange} />
            </div>
          )}
          {tipo === "por-semanas-del-mes" && (
            <>
              <div>
                <label className="font-semibold">Mes</label>
                <input type="number" name="mes" min="1" max="12" className="border rounded px-3 py-2 mt-1" onChange={handleChange} />
              </div>
              <div>
                <label className="font-semibold">Año</label>
                <input type="number" name="anio" min="2000" max="2100" className="border rounded px-3 py-2 mt-1" onChange={handleChange} />
              </div>
            </>
          )}
          {tipo === "por-rango-fechas" && (
            <>
              <div>
                <label className="font-semibold">Fecha inicio</label>
                <input type="date" name="fechaInicio" className="border rounded px-3 py-2 mt-1" onChange={handleChange} />
              </div>
              <div>
                <label className="font-semibold">Fecha fin</label>
                <input type="date" name="fechaFin" className="border rounded px-3 py-2 mt-1" onChange={handleChange} />
              </div>
            </>
          )}
          {tipo === "por-estado" && (
            <div>
              <label className="font-semibold">Estado</label>
              <select name="estado" className="border rounded px-3 py-2 mt-1" onChange={handleChange} value={param.estado || ""}>
                <option value="" disabled hidden>Selecciona un estado</option>
                <option value="pendiente">Pendiente</option>
                <option value="vendido">Vendido</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          )}
          <button
            className="bg-amber-700 text-white px-6 py-2 rounded font-bold hover:bg-amber-800 transition min-w-[120px]"
            onClick={fetchReporte}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Generar"}
          </button>
        </div>
      </div>
      {error && <div className="text-red-600 font-bold mb-4">{error}</div>}
      {data.length > 0 && (
        <>
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-amber-700">Resultados</h2>
              <PDFGenerator data={data} tipo={tipo} />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-amber-100">
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Cliente</th>
                    <th className="px-4 py-2 border">Fecha</th>
                    <th className="px-4 py-2 border">Total</th>
                    <th className="px-4 py-2 border">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((v: VentaReporte) => (
                    <tr key={v.id}>
                      <td className="px-4 py-2 border">{v.id}</td>
                      <td className="px-4 py-2 border">{v.usuario?.nombre || "-"}</td>
                      <td className="px-4 py-2 border">{new Date(v.fecha).toLocaleString()}</td>
                      <td className="px-4 py-2 border">S/ {v.total}</td>
                      <td className="px-4 py-2 border">{v.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.length === 0 && (
                <div className="text-center text-gray-500 font-semibold mt-6">Sin actividad en el rango de fechas seleccionado</div>
              )}
            </div>
          </div>
          <ReportCharts data={data} tipo={tipo} />
        </>
      )}
      {data.length === 0 && !loading && !error && (
        <div className="bg-white rounded-lg shadow p-6 mb-8 text-center text-gray-500 font-semibold">Sin actividad en el rango de fechas seleccionado</div>
      )}
    </div>
  );
} 