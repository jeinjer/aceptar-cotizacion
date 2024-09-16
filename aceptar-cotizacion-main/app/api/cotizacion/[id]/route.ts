import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const { nroPago, formaPagoSeleccionada } = await req.json();
    
    try {
        const cotizacion = await prisma.cotizacion.update({
            where: {
                id: params.id,
            },
            data: {
                estado: "Confirmada",
                nroPago: nroPago,
                formaPagoSeleccionada: formaPagoSeleccionada,
            },
        });

        return NextResponse.json(cotizacion, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error actualizando la cotización" }, { status: 500 });
    }
}
