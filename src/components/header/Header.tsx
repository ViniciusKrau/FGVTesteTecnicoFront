import React from 'react';

export type HeaderButtonItem = {
    label: string;
    to: string;
};

export type HeaderProps = {
    className?: string;
    buttons?: HeaderButtonItem[];
    children?: React.ReactNode;
};

export default function Header({ className, buttons = [], children }: HeaderProps) {
    // Calculate padding based on button count (e.g., reduce padding as buttons increase)
    const buttonPadding = Math.max(10, 50 / buttons.length); // Minimum 10px, scales down

    return (
        <header className={`header ${className || ''}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , padding: '16px 0'}}>
            {buttons.map((button, index) => (
                <a key={index} href={button.to} className="header-button" style={{ padding: `0 ${buttonPadding}px` }}>
                    {button.label}
                </a>
            ))}
            {children}
        </header>
    );
}