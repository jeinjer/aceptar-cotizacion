'use client';

import React, { useState } from "react";
import PaymentForm from "@/components/PaymentForm";
import { toast } from "react-hot-toast";
import { tarjetasMock } from "@/app/mocks";
import { useRouter } from "next/navigation";
import EmailModal from '@/components/Email';

interface DetalleCotizacionProps {
    cotizacion: Cotizacion;
}

type Cotizacion = {
  id: string;
  estado: string;
  importe: number;
  fechaRetiro: string;
  fechaEntrega: string;
  formasPago: string[];
  nroPago: string | null;
  formaPagoSeleccionada: string | null;
  nombreTransportista: string;
  calificacionTransportista: string;
  emailTransportista: string; 
}

const DetalleCotizacion: React.FC<DetalleCotizacionProps> = ({ cotizacion }) => {
  const tarjetasValidas = tarjetasMock;
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [estadoCotizacion, setEstadoCotizacion] = useState(cotizacion.estado);
  const [formData, setFormData] = useState({
    numero: "",
    pin: "",
    nombreCompleto: "",
    tipoDocumento: "DNI",
    numeroDocumento: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [emailContent, setEmailContent] = useState<string>(''); // Define el estado

  const router = useRouter();

  const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPayment(event.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validarTarjeta = () => {
    const tarjetaValida = tarjetasValidas.find((tarjeta) => {
      return (
        tarjeta.numero === formData.numero &&
        tarjeta.pin === formData.pin &&
        tarjeta.nombreCompleto === formData.nombreCompleto &&
        tarjeta.tipoDocumento === formData.tipoDocumento &&
        tarjeta.numeroDocumento === formData.numeroDocumento
      );
    });
    return tarjetaValida;
  };

  const delayAction = (action: () => void, delay: number = 1500) => {
    setTimeout(action, delay);
  };

  const handleAcceptQuote = () => {
    if (!selectedPayment) {
      delayAction(() => toast.error("Por favor, elige una forma de pago.", { position: "bottom-left" }));
      return;
    }

    if (selectedPayment !== "Tarjeta") {
      delayAction(confirmarCotizacion);
      return;
    }

    const tarjetaValida = validarTarjeta();

    if (!tarjetaValida) {
      delayAction(() => toast.error("Los datos de la tarjeta son incorrectos.", {
        position: "bottom-left",
        style: {
          textAlign: 'center',
        },
      }));
      return;
    }

    if (tarjetaValida.saldoDisponible < cotizacion.importe) {
      delayAction(() => toast.error("Saldo insuficiente en la tarjeta.", {
        position: "bottom-left",
        style: {
          textAlign: 'center',
        },
      }));
      return;
    }

    delayAction(() => confirmarCotizacion());
  };

  const confirmarCotizacion = async () => {
    try {
      const nroPago = Math.floor(Math.random() * 1000000).toString();
  
      const response = await fetch(`/api/cotizacion/${cotizacion.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nroPago,
          formaPagoSeleccionada: selectedPayment,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error al confirmar la cotización.");
      }
  
      // Actualiza el estado con los valores de nroPago y formaPagoSeleccionada
      setEstadoCotizacion("Confirmada");
  
      // Llama a enviarEmailTransportista con los valores actuales
      enviarNotificacionTransportista();
      enviarEmailTransportista(nroPago, selectedPayment);
  
      router.refresh();
    } catch (error) {
      toast.error("Ocurrió un error al confirmar la cotización.", {
        position: "bottom-left",
        style: {
          textAlign: 'center',
        },
      });
      console.error(error);
    }
  };
  
  const enviarNotificacionTransportista = () => {
    toast.success("SMS enviado al transportista.", {
      duration: 3000,
      position: "bottom-left",
      style: {
        textAlign: 'center',
      },
    });
  };
  
  const enviarEmailTransportista = (nroPago: string, formaPagoSeleccionada: string | null) => {
    const emailContent = `
      <html>
        <body>
          <p><strong>Asunto:</strong> Cotización para ${cotizacion.nombreTransportista}</p>
          <p><strong>De:</strong> grupo7@isw.com</p>
          <p><strong>Para:</strong> ${cotizacion.emailTransportista}</p>
          <p><strong>Mensaje:</strong></p>
          <p>¡Hola! ¡Buenos días!</p>
          <p>Les tenemos buenas noticias, un cliente ha aceptado la cotización con los siguientes datos:</p>
          <ul>
            <li><strong>Fecha de Retiro:</strong> ${cotizacion.fechaRetiro}</li>
            <li><strong>Fecha de Entrega:</strong> ${cotizacion.fechaEntrega}</li>
            <li><strong>Importe del Viaje:</strong> $${cotizacion.importe}</li>
            <li><strong>Forma de Pago:</strong> ${formaPagoSeleccionada}</li>
            <li><strong>Nº de Pago:</strong> ${nroPago}</li>
          </ul>
          <p>El cliente espera con ansias el pedido. ¡Gracias por seguir confiando en nosotros!</p>
        </body>
      </html>
    `;
  
    toast.success(
      <div>
        Email enviado al transportista.
        <br />
        <span
          onClick={() => {
            setEmailContent(emailContent); // Actualiza el contenido del email
            setModalOpen(true); // Abre el modal
          }}
          style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Ver email
        </span>
      </div>,
      {
        duration: 6000,
        position: 'bottom-left',
        style: {
          textAlign: 'center',
        },
      }
    );
  };
  

  const volver = () => {
    router.refresh();
    router.push('/');
  };

  return (
    <div className="p-6 bg-[#00B4D8] shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Detalles de la Cotización</h2>
      <>
        <h2 className="text-xl font-bold">Transportista: {cotizacion.nombreTransportista}</h2>
        <p><strong>Calificación: </strong>{cotizacion.calificacionTransportista} ⭐</p>
        <p><strong>Fecha de Retiro: </strong>{cotizacion.fechaRetiro}</p>
        <p><strong>Fecha de Entrega: </strong>{cotizacion.fechaEntrega}</p>
        <p><strong>Importe del Viaje: </strong>${cotizacion.importe}</p>

        {estadoCotizacion === "Pendiente" && (
          <>
            <label className="block mt-4">
              <strong>Forma de Pago:</strong>
              <select
                value={selectedPayment || ""}
                onChange={handlePaymentChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Seleccione una opción</option>
                {cotizacion.formasPago.map((forma, index) => (
                  <option key={index} value={forma}>
                    {forma}
                  </option>
                ))}
              </select>
            </label>

            {selectedPayment === "Tarjeta" && (
              <PaymentForm formData={formData} handleChange={handleInputChange} />
            )}

            <button
              className="bg-[#03045E] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleAcceptQuote}
            >
              Aceptar Cotización
            </button>
          </>
        )}

        {estadoCotizacion === "Confirmada" && (
          <>
            <p><strong>Forma de Pago: </strong>{cotizacion.formaPagoSeleccionada}</p>
            <p><strong>Nº de Pago: </strong>{cotizacion.nroPago}</p>
          </>
        )}

        {estadoCotizacion === "Cancelada" && (
          <>
            <p><strong>Formas de Pago: </strong>{cotizacion.formasPago.join(", ")}</p>
            <p className="text-red-500 font-bold">La cotización ha sido cancelada.</p>
          </>
        )}

        <button
          className="bg-[#0077b6] hover:bg-blue-700 text-white font-bold py-2 ml-2 px-4 rounded mt-4"
          onClick={volver}
        >
          Volver
        </button>
      </>
      {isModalOpen && (
        <EmailModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          emailContent={emailContent}
        />
      )}
    </div>
  );
};

export default DetalleCotizacion;
