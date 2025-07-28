import { TABS } from "./constants";
import { getPedidosByEstado } from "./utils";
import { Pedido } from "@/types/pedido";

interface TabsPedidosProps {
  pedidos: Pedido[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabsPedidos({ pedidos, activeTab, onTabChange }: TabsPedidosProps) {
  return (
    <div className="flex gap-1 md:gap-2 mb-4 md:mb-6 border-b border-gray-200 overflow-x-auto">
      {TABS.map((tab) => {
        const TabIcon = tab.icon;
        const pedidosEnTab = getPedidosByEstado(pedidos, tab.key);
        const isActive = activeTab === tab.key;
        
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-t-lg font-semibold transition-all text-sm md:text-base whitespace-nowrap ${
              isActive 
                ? `${tab.bgColor} ${tab.color} border-b-2 border-current` 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <TabIcon size={14} />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label}</span>
            <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-bold ${
              isActive ? 'bg-white' : 'bg-gray-200'
            }`}>
              {pedidosEnTab.length}
            </span>
          </button>
        );
      })}
    </div>
  );
} 