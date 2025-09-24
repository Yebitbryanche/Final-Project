import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ModalProps) => {
  const [shake, setShake] = useState(false);

  const handleConfirm = () => {
    // Trigger shake animation
    setShake(true);
    setTimeout(() => setShake(false), 300);

    // Call actual confirm after shake animation
    setTimeout(() => {
      onConfirm();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            key="modal"
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
              <h2 className="text-xl font-bold mb-4">{title}</h2>
              <p className="mb-6 text-gray-600">{message}</p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                >
                  {cancelText}
                </button>

                <motion.button
                  onClick={handleConfirm}
                  animate={shake ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                  transition={{ duration: 0.3 }}
                  className="px-3 py-1 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
                >
                  {confirmText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
