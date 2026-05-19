import NavBar from "../../../../components/NavBar";
import ProductCatalog from "../../../../components/ProductCatalog";
import AquisicaoComunicado from "../../../../components/AquisicaoComunicado";

export default function Loja() {
    return (
        <div>
            <NavBar/>
            <AquisicaoComunicado />
            <ProductCatalog />
        </div>
    )
}