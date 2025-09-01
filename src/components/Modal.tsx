interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({children, onClose}: ModalProps) {
    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40" onClick={onClose}>
            <div className="bg-gray-900 rounded-lg p-5 shadow-lg" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}