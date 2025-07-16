import SearchBar from "./componentes/navBar";
import Tarjeta from "./componentes/tarjetas";

export default function Dashboard(){
    return(
        <div>
            <SearchBar name={"Buscar Mermelada"}></SearchBar>
            <Tarjeta nombre={"MERMELADA DE FRUTILLA"} descripcion={"Preparado con los mejores ingredientes"} imagen={""} precio={99.99}></Tarjeta>
        </div>
    );
}