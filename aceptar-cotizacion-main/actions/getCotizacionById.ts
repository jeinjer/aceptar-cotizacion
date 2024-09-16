import prisma from "@/libs/prismadb";

interface IParams {
    cotizacionId?: string;
}

export default async function getCotizacionById(params: IParams) {
    
    try {
        const { cotizacionId } = params;

        const cotizacion = await prisma.cotizacion.findUnique({where: {id: cotizacionId}});

            if (!cotizacion) {
                return null;
            }

            return cotizacion;
            
        } catch (error: any) {
            throw new Error(error)
    }
}