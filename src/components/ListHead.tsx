import React from 'react';

export type ListHeadColumn =
    | string
    | {
            key?: string;
            label: React.ReactNode;
            className?: string;
            title?: string;
        };

export interface ListHeadProps {
    columns: ListHeadColumn[];
    rowClassName?: string;
    headerCellClassName?: string;
}

/**
 * Usage:
 * <table>
 *   <ListHead columns={['ID','Title','Description','Date','Status']} />
 *   <ListItem items={items} onSelect={...} />
 * </table>
 */
const ListHead: React.FC<ListHeadProps> = ({
    columns,
    rowClassName = 'bg-black-100',
    headerCellClassName = 'border border-gray-300 p-2 text-left font-semibold',
}) => {
    return (
        <thead>
            <tr className={rowClassName}>
                {columns.map((col, idx) => {
                    if (typeof col === 'string') {
                        return (
                            <th key={col || idx} className={headerCellClassName}>
                                {col}
                            </th>
                        );
                    }
                    const { key, label, className, title } = col;
                    return (
                        <th
                            key={key || String(idx)}
                            className={`${headerCellClassName} ${className || ''}`.trim()}
                            title={title}
                        >
                            {label}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};

export default ListHead;