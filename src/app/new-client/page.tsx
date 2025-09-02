"use client";

import DefaultHeader from '@/components/header/DefaultHeader';
import ButtonTailwind from '@/components/ButtonTailwind';
import FormInput from '@/components/FormInput';
import { NewCliente } from '@/api/ApiInterface';
import { apiPost } from '@/api/Api';
import { useState } from 'react';


export default function NewClient() {

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const newClient: NewCliente = {
                cnpj: formData.get("cnpj") as string,
                nome: formData.get("name") as string,
                email: formData.get("email") as string,
            };
            await apiPost("/cliente/create", newClient);
            setMessage("Client created successfully!");
            setMessageType("success");
        } catch (error) {
            setMessage("Failed to create client.");
            setMessageType("error");
        }
    };

    return (
        <>
            <DefaultHeader/>
            <main className="mx-auto max-w-5xl p-8">
                <h1 className="text-3xl font-semibold mb-4">Novo Cliente</h1>
                <form className="space-y-6"
                    onSubmit={handleSubmit}
                    onChange={() => { setMessage(null); setMessageType(null); }}
                >
                    <FormInput label="CNPJ" id="cnpj" type="number" required/>

                    <FormInput label="Nome" id="name" type="text" required />

                    <FormInput label="Email" id="email" type="email" required />

                    <div>
                        <ButtonTailwind
                            type="submit"
                            className="flex w-full justify-center rounded-md
                            bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6
                            text-white shadow-sm"
                        >
                            Criar Cliente
                        </ButtonTailwind>
                    </div>
                </form>
            </main>
        </>
    );
}