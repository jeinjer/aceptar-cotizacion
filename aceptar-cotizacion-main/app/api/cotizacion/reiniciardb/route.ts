import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cotizaciones } from '../../../../cotizaciones';
import { tarjetas } from '../../../../tarjetas';

const prisma = new PrismaClient();

export async function POST() {
  try {
    console.log("Reiniciando base de datos...");

    await prisma.cotizacion.deleteMany();
    await prisma.tarjeta.deleteMany();

    for (const cotizacion of cotizaciones) {
      await prisma.cotizacion.create({
        data: {
          estado: cotizacion.estado,
          fechaRetiro: cotizacion.fechaRetiro,
          fechaEntrega: cotizacion.fechaEntrega,
          importe: cotizacion.importe,
          formasPago: cotizacion.formasPago,
          formaPagoSeleccionada: cotizacion.formaPagoSeleccionada,
          nroPago: cotizacion.nroPago,
          nombreTransportista: cotizacion.nombreTransportista,
          calificacionTransportista: cotizacion.calificacionTransportista,
          emailTransportista: cotizacion.emailTransportista
        }
      });
    }
    
    for (const tarjeta of tarjetas) {
      await prisma.tarjeta.create({
        data: {
          numero: tarjeta.numero,
          pin: tarjeta.pin,
          nombreCompleto: tarjeta.nombreCompleto,
          tipoDocumento: tarjeta.tipoDocumento,
          numeroDocumento: tarjeta.numeroDocumento,
          tipoTarjeta: tarjeta.tipoTarjeta,
          saldoDisponible: tarjeta.saldoDisponible,
        }
      });
    }

    console.log("Datos insertados correctamente.");
    return NextResponse.json({ message: 'Base de datos reiniciada correctamente.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al reiniciar la base de datos.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
