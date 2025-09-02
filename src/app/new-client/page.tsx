"use client";

import DefaultHeader from '@/components/header/DefaultHeader';
import ButtonTailwind from '@/components/ButtonTailwind';
import FormInput from '@/components/FormInput';
import * as Api from '@/api/ApiGet';


export default function NewClient() {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitting form...");
        const formData = new FormData(event.currentTarget);
        const newClient: Api.NewCliente = {
            cnpj: formData.get("cnpj") as string,
            nome: formData.get("name") as string,
            email: formData.get("email") as string,
        };
        console.log("New Client Data:", newClient);
        await Api.apiPost("/cliente/create", newClient);
        alert(`Client created successfully! ${JSON.stringify(newClient)}`);
    };

    return (
        <>
            <DefaultHeader/>
            <main className="mx-auto max-w-5xl p-8">
                <h1 className="text-3xl font-semibold mb-4">New Client</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <FormInput label="CNPJ" id="cnpj" type="number" required />

                    <FormInput label="Nome" id="name" type="text" required />

                    <FormInput label="Email" id="email" type="email" required />

                    <div>
                        <ButtonTailwind
                            type="submit"
                            className="flex w-full justify-center rounded-md
                            bg-indigo-700 px-3 py-1.5 text-sm font-semibold leading-6
                            text-white shadow-sm"
                        >
                            Create Product
                        </ButtonTailwind>
                    </div>
                </form>
            </main>
        </>
    );
}