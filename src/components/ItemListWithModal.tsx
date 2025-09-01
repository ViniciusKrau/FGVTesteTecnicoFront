// ...existing code...
import React, { useState } from 'react';
import ListHead from '@/components/ListHead';
import ListItem, { ListRecord } from '@/components/ListItem';

export type ItemListWithModalProps = {
    items: ListRecord[];
    columns?: (string | { key?: string; label: React.ReactNode })[];
};

export default function ItemListWithModal({ items, columns }: ItemListWithModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ListRecord | null>(null);

    const openModal = (item: ListRecord) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <>
            <table className="w-full border-collapse border border-gray-300">
                <ListHead columns={columns ?? ['ID', 'Title', 'Description', 'Date', 'Status']} />
                <ListItem items={items} onSelect={openModal} />
            </table>

            {isModalOpen && selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">{selectedItem.title}</h3>
                        <p><strong>ID:</strong> {selectedItem.id}</p>
                        <p><strong>Description:</strong> {selectedItem.description}</p>
                        <p><strong>Date:</strong> {selectedItem.date}</p>
                        <p><strong>Status:</strong> {selectedItem.status}</p>
                        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
                    </div>
                </div>
            )}
        </>
    );
}