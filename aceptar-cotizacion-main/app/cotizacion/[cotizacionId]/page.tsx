import getCotizacionById from "@/actions/getCotizacionById";
import DetalleCotizacion from "./DetalleCotizacion";

interface IParams {
    cotizacionId?: string;
}

const Cotizacion = async ({ params }: { params: IParams }) => {
    const { cotizacionId } = params;

    if (!cotizacionId) {
        return (
            <div>
                No se encontró la cotizacion con ese ID.
            </div>
        );
    }

    try {
        const cotizacion = await getCotizacionById(params);

        if (!cotizacion) {
            return(
            <div>
                No se encontró la cotizacion con ese ID.
            </div>
            );
        }

        return (
            <div className="p-8">
                <DetalleCotizacion cotizacion={cotizacion}/>
            </div>
        );
    } catch (error) {
        return <div>Error</div>
    }
}

export default Cotizacion;