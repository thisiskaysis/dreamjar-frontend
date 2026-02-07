import { motion, AnimatePresence } from "framer-motion";
import "./Modal.css" 

function CampaignModal({ isOpen, onClose, children }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                className="modal-overlay"
                intial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                >

                    {/* Background Blur Layer */}
                    <div className="modal-backdrop" onClick={onClose} />

                    {/* Modal Content */}
                    <motion.div
                    className="modal-content"
                    initial={{ scale: 0.8, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 40 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default CampaignModal;