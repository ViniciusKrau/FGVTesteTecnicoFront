import React from "react";
import { currencyFormat } from "@/lib/currencyFormat";
import { Pedido } from "@/api/ApiInterface";

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

    const handleCNPJMask = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    };

    return (
        <tbody>
            {items.map((item) => (
                <tr
                    key={item.codPedido}
                    onClick={() => onSelect(item)}
                    className={rowClassName}
                >
                    {columns.map((key) => (
                        <td key={String(key)} className={`${cellClassName} ${key === "valorTotal" ? "text-center" : ""}`}>
                            {key === "dataPedido"
                                ? new Date(item[key]).toLocaleString("pt-BR", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                  })
                                : key === "valorTotal" && !isNaN(Number(item[key]))
                                ? currencyFormat(+item[key])
                                : key === "cnpj"
                                ? handleCNPJMask(item[key])
                                : item[key]}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default ListItem;
