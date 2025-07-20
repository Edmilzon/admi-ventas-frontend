"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { VentaReporte } from './types';

interface PDFGeneratorProps {
  data: VentaReporte[];
  tipo: string;
}

export function generateReportPDF(data: VentaReporte[], tipo: string) {
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(20);
  doc.text("Reporte de Ventas", 14, 20);
  
  // Información del reporte
  doc.setFontSize(12);
  doc.text(`Tipo: ${tipo}`, 14, 30);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 37);
  doc.text(`Total de registros: ${data.length}`, 14, 44);
  
  // Estadísticas
  const stats = {
    vendido: data.filter(v => v.estado === 'vendido').length,
    cancelado: data.filter(v => v.estado === 'cancelado').length,
    pendiente: data.filter(v => v.estado === 'pendiente').length,
    totalVentas: data.reduce((sum, v) => sum + parseFloat(v.total), 0)
  };
  
  doc.text("Estadísticas:", 14, 55);
  doc.setFontSize(10);
  doc.text(`Vendidos: ${stats.vendido}`, 20, 62);
  doc.text(`Cancelados: ${stats.cancelado}`, 20, 69);
  doc.text(`Pendientes: ${stats.pendiente}`, 20, 76);
  doc.text(`Total ventas: S/ ${stats.totalVentas.toFixed(2)}`, 20, 83);
  
  // Tabla de datos
  autoTable(doc, {
    startY: 95,
    head: [["ID", "Cliente", "Fecha", "Total", "Estado"]],
    body: data.map((v) => [
      v.id,
      v.usuario?.nombre || "-",
      new Date(v.fecha).toLocaleDateString(),
      `S/ ${v.total}`,
      v.estado
    ]),
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [245, 158, 66],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });
  
  // Gráfico de distribución por estado (como tabla)
  const pieData = [
    ['Estado', 'Cantidad', 'Porcentaje'],
    ['Vendido', stats.vendido, `${((stats.vendido / data.length) * 100).toFixed(1)}%`],
    ['Cancelado', stats.cancelado, `${((stats.cancelado / data.length) * 100).toFixed(1)}%`],
    ['Pendiente', stats.pendiente, `${((stats.pendiente / data.length) * 100).toFixed(1)}%`],
  ];
  
  autoTable(doc, {
    startY: 160,
    head: [["Distribución por Estado"]],
    body: pieData.slice(1),
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [96, 165, 250],
      textColor: 255,
      fontStyle: 'bold',
    },
  });
  
  doc.save(`reporte-${tipo}-${new Date().toISOString().split('T')[0]}.pdf`);
}

export default function PDFGenerator({ data, tipo }: PDFGeneratorProps) {
  return (
    <button
      onClick={() => generateReportPDF(data, tipo)}
      className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 transition"
    >
      Descargar PDF con Gráficos
    </button>
  );
} 