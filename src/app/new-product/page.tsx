"use client";

import DefaultHeader from '@/components/header/DefaultHeader';
import ButtonTailwind from '@/components/ButtonTailwind';
import FormInput from '@/components/FormInput';
import { apiPost } from '@/api/Api';
import { NewProduct } from '@/api/ApiInterface';
import { useState } from 'react';

export default function NewProductPage() {

    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newProduct: NewProduct = {
            nome: formData.get("name") as string,
            preco: parseFloat(formData.get("price") as string),
            estoque: parseInt(formData.get("stock") as string, 10),
        };
        console.log(newProduct);
        await apiPost("/Produto/create", newProduct);
        setMessage("Product created successfully!");
        setMessageType("success");
    };

    return (
        <>
            <DefaultHeader/>
            <main className="mx-auto max-w-5xl p-8">
                <h1 className="text-3xl font-semibold mb-4">Novo Produto</h1>
                <form className="space-y-6"
                    onSubmit={handleSubmit}
                    onChange={() => { setMessage(null); setMessageType(null); }}
                >
                    <FormInput label="Name" id="name" type="text" required />

                    <FormInput label="Preço" id="price" type="number" step="0.01" min="0" max={99999999.99} required />

                    <FormInput label="Estoque" id="stock" type="number" required />

                    {message && (
                        <div className={`m-4 px-4 text-white ${messageType === "success" ? "bg-green-500" : "bg-red-500"} rounded`}>
                            {message}
                        </div>
                    )}

                    <div>
                        <ButtonTailwind
                            type="submit"
                            className="flex w-full justify-center rounded-md
                            bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6
                            text-white shadow-sm"
                        >
                            Criar Produto
                        </ButtonTailwind>
                    </div>
                </form>
            </main>
        </>
    );
}