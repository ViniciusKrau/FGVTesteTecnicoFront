import React from 'react';

export interface ListRecord {
    codPedido: number | string;
    cnpj: string;
    nome: string;
    date: string;
    valor: number | string;
}

interface ListItemProps {
    items: ListRecord[];
    onSelect: (item: ListRecord) => void;
    rowClassName?: string;
    cellClassName?: string;
}

/**
 * Usage:
 * <ListItem items={placeholderItems} onSelect={openModal} />
 * Replace the original <tbody>...</tbody> with the component above.
 */
const ListItem: React.FC<ListItemProps> = ({
    items,
    onSelect,
    rowClassName = 'cursor-pointer hover:bg-gray-700',
    cellClassName = 'border border-gray-300 p-2',
}) => {

    const columns: (keyof ListRecord)[] = ['codPedido', 'cnpj', 'nome', 'date', 'valor'];
    return (
        <tbody>
            {items.map(item => (
                <tr
                    key={item.codPedido}
                    onClick={() => onSelect(item)}
                    className={rowClassName}
                >
                    {columns.map(key => (
                        <td key={String(key)} className={cellClassName}>
                            {item[key]}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default ListItem;