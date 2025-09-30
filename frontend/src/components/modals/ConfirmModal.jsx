import { useState, useEffect } from "react";
import CancelButton from "../buttons/CancelButton";
import ConfirmButton from "../buttons/ConfirmButton";

function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-4 rounded-md transition-all duration-300 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-md text-gray-600">{message}</p>
        <div className="mt-8 mb-2 grid grid-cols-2 gap-8">
          <CancelButton onClick={onClose} />
          <ConfirmButton onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
}
export default ConfirmModal;