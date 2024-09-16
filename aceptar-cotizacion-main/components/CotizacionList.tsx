'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ICotizacionListProps {
    cotizaciones: Cotizacion[]
}

type Cotizacion = {
    id: string;
    estado: string;
    importe: number;
    fechaRetiro: string;
    fechaEntrega: string;
    formasPago: string[];
    formaPagoSeleccionada: string | null;
    nroPago: string | null;
    nombreTransportista: string;
    calificacionTransportista: string;
    emailTransportista: string; 
}
  

const CotizacionList: React.FC<ICotizacionListProps> = ({ cotizaciones }) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false); 

    const handleReiniciarBD = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/cotizacion/reiniciardb', {
                method: 'POST',
            });
    
            if (!response.ok) {
                throw new Error('Error al reiniciar la base de datos');
            }
    
            const data = await response.json();
            toast.success(data.message || 'Base de datos reiniciada correctamente.');
        } catch (error) {
            toast.error("Error al reiniciar la base de datos");
        } finally {
            setIsLoading(false)
            router.refresh();
        }
    };

    const rows = cotizaciones.map(cot => ({
        ...cot,
        nombreTransportista: cot.nombreTransportista,
        importe: '$' + cot.importe
    }));

    const columns: GridColDef[] = [
        { field: 'nombreTransportista', headerName: 'Transportista', width: 150, align: 'center', headerAlign: 'center' },
        { field: 'importe', headerName: 'Importe', width: 100, align: 'center', headerAlign: 'center' },
        { field: 'fechaRetiro', headerName: 'Fecha de Retiro', width: 120, align: 'center', headerAlign: 'center' },
        { field: 'fechaEntrega', headerName: 'Fecha de Entrega', width: 130, align: 'center', headerAlign: 'center' },
        { field: 'estado', headerName: 'Estado', width: 120, align: 'center', headerAlign: 'center' },
        { field: 'acciones', headerName: ' ', width: 180, align: 'center', headerAlign: 'center', renderCell: (params) => (
                <div className="flex justify-center items-center w-full">
                    <button 
                    className="
                    text-center 
                    bg-[#0077B6] 
                    hover:bg-[#00B4D8]
                    text-white
                    font-bold py-1 px-2 rounded
                    w-[60px]
                    h-[40px]" 
                    onClick={() => {
                        router.push(`cotizacion/${params.row.id}`)
                        router.refresh();
                    }}>
                        VER
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="max-w-[770px] m-auto text-xl relative bg-[#caf0f8] font-serif">
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 15, 20, 30, 50, 100]}
                    disableRowSelectionOnClick
                    sx={{ fontFamily: 'serif' }}
                />
            </div>

            <div className="fixed bottom-4 right-4 flex space-x-4">
                <button 
                    onClick={handleReiniciarBD} 
                    className=" 
                    bg-[#03045E]
                    text-white
                    font-bold 
                    py-2 px-4 
                    rounded-full 
                    shadow-lg 
                    transition 
                    ease-in-out 
                    duration-150" 
                    disabled={isLoading}
                >
                    {isLoading ? 'Reiniciando...' : 'Reiniciar BD'}
                </button>
                
                <div className="relative group"> 
                    <button 
                        className=" 
                        bg-[#03045E]
                        text-white
                        font-bold 
                        py-2 px-3
                        rounded-full 
                        shadow-lg 
                        transition 
                        ease-in-out 
                        duration-150"
                    >
                        ?
                    </button> 

                    <span className=" 
                        absolute bottom-12 right-0 
                        w-[240px] 
                        bg-gray-700 
                        text-white 
                        text-center 
                        text-xs 
                        py-2 px-3 
                        rounded 
                        opacity-0 
                        group-hover:opacity-100 
                        transition 
                        ease-in-out 
                        duration-150 
                        z-10"
                    >
                        Este botón no forma parte de la US, es simplemente una forma de poder reiniciar la BD y probar de vuelta con otros casos
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CotizacionList;
