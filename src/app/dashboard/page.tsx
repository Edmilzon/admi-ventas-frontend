import SearchBar from "./componentes/navBar";
import Tarjeta from "./componentes/tarjetas";

export default function Dashboard() {
  return (
    <div className=" md:hidden w-full min-h-screen bg-white px-4 py-6 flex flex-col items-center gap-4">
      <SearchBar name={"Buscar Mermelada"} />
      <Tarjeta
        nombre={"MERMELADA DE FRUTILLA"}
        descripcion={"Preparado con los mejores ingredientes"}
        imagen={""}
        precio={99.99}
      />
      <Tarjeta
        nombre={"MERMELADA DE NARANJA"}
        descripcion={"Deliciosa y natural"}
        imagen={""}
        precio={99.99}
      />
      <Tarjeta
        nombre={"MERMELADA DE MORA"}
        descripcion={"Hecha en casa"}
        imagen={""}
        precio={99.99}
      />
    </div>
  );
}
