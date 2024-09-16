import getCotizaciones from "@/actions/getCotizacion";
import CotizacionesList from "@/components/CotizacionList";

const Home = async () => {

  const cotizaciones = await getCotizaciones();

  if (!cotizaciones) {
    return <div>Error al cargar las cotizaciones</div>;
  }

  return (
    <div className="min-h-screen bg-[#0077B6] flex items-center justify-center">
      <CotizacionesList cotizaciones={cotizaciones}/>
    </div>
  );
}

export default Home;