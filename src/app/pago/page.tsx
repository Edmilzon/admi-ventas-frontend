import TarjetaPago from "./componentes/tarjetaPago";

export default function Pagar(){
    return(
        <div>
            <h1>TOTAL</h1>
            <span></span>
            <TarjetaPago nombre={"Frutilla"} imagen={""} precio={99.99}></TarjetaPago>
        </div>
    );
}