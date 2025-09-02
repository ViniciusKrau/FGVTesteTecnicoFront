interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    className?: string;
}

export default function Modal({children, onClose, className}: ModalProps) {
    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40" onClick={onClose}>
            <div className={`bg-gray-900 rounded-lg p-5 shadow-lg ${className ?? ""}`} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}