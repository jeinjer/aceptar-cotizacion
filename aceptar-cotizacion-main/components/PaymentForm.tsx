import React from "react";

interface PaymentFormProps {
  formData: {
    numero: string;
    pin: string;
    nombreCompleto: string;
    tipoDocumento: string;
    numeroDocumento: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ formData, handleChange }) => {
  return (
    <div className="mt-6 p-4 bg-[#CAF0F8] rounded-lg">
      <h3 className="text-lg font-bold">Datos de la Tarjeta</h3>

      <label className="block mt-2">
        Número de Tarjeta:
        <input
          type="text"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        />
      </label>

      <label className="block mt-2">
        PIN:
        <input
          type="password"
          name="pin"
          value={formData.pin}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        />
      </label>

      <label className="block mt-2">
        Nombre Completo:
        <input
          type="text"
          name="nombreCompleto"
          value={formData.nombreCompleto}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        />
      </label>

      <label className="block mt-2">
        Tipo de Documento:
        <select
          name="tipoDocumento"
          value={formData.tipoDocumento}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        >
          <option value="DNI">DNI</option>
          <option value="Pasaporte">Pasaporte</option>
          <option value="Otro">Otro</option>
        </select>
      </label>

      <label className="block mt-2">
        Número de Documento:
        <input
          type="text"
          name="numeroDocumento"
          value={formData.numeroDocumento}
          onChange={handleChange}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        />
      </label>
    </div>
  );
};

export default PaymentForm;
