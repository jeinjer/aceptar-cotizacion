import React from 'react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  emailContent: string;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, emailContent }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Email enviado al transportista</h2>
        <div dangerouslySetInnerHTML={{ __html: emailContent }} />
        <button onClick={onClose}>Cerrar</button>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: #CAF0F8;
          padding: 20px;
          border-radius: 5px;
          max-width: 500px;
          width: 100%;
          text-align: center;
        }
        button {
          margin-top: 20px;
          padding: 10px 20px;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default EmailModal;
