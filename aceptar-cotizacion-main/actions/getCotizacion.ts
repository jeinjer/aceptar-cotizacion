import prisma from "@/libs/prismadb";

export default async function getCotizaciones() {
    try {
      const cotizaciones = await prisma.cotizacion.findMany();
      
      return cotizaciones;
  
    } catch (error) {
      console.error('Error al obtener las cotizaciones:', error);
      throw new Error('No se pudieron obtener las cotizaciones.');
    }
  }