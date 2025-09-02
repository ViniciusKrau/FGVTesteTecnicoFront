import React from "react";
import {Pedido} from "@/api/ApiGet";

interface ListItemProps {
    items: Pedido[];
    onSelect: (item: Pedido) => void;
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
    rowClassName = "cursor-pointer hover:bg-gray-700",
    cellClassName = "border border-gray-300 p-2",
}) => {
    const columns: (keyof Pedido)[] = [
        "codPedido",
        "cnpj",
        "nome",
        "dataPedido",
        "valorTotal",
    ];
    return (
        <tbody>
            {items.map((item) => (
                <tr
                    key={item.codPedido}
                    onClick={() => onSelect(item)}
                    className={rowClassName}
                >
                    {columns.map((key) => (
                        <td key={String(key)} className={cellClassName}>
                            {key === "dataPedido"
                                ? new Date(item[key]).toLocaleString("pt-BR", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                  })
                                : item[key]}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default ListItem;
