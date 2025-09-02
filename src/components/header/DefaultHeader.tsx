import React from 'react';
import Header, { HeaderButtonItem } from './Header';

export const defaultHeaderButtons: HeaderButtonItem[] = [
    { label: 'Home', to: '/' },
    { label: 'Cadastrar Produto', to: '/new-product' },
    { label: 'Cadastrar Cliente', to: '/new-client' },
];

export type DefaultHeaderProps = {
    className?: string;
    children?: React.ReactNode;
    buttons?: HeaderButtonItem[] | null;
    extraButtons?: HeaderButtonItem[];
};
export default function DefaultHeader({
    className,
    children,
    buttons = defaultHeaderButtons,
    extraButtons
}: DefaultHeaderProps) {
    const finalButtons = [
        ...(buttons ?? []),
        ...(extraButtons ?? [])
    ];

    return (
        <Header
            className={className}
            buttons={finalButtons}
        >
            {children}
        </Header>
    );
}