import DefaultHeader from '@/components/header/DefaultHeader';
import ButtonTailwind from '@/components/ButtonTailwind';
import FormInput from '@/components/FormInput';


export default function NewClient() {

    return (
        <>
            <DefaultHeader/>
            <main className="mx-auto max-w-5xl p-8">
                <h1 className="text-3xl font-semibold mb-4">New Client</h1>
                <form className="space-y-6">
                    <FormInput label="CNPJ" id="cnpj" type="number" required />

                    <FormInput label="Nome" id="name" type="text" required={true} />

                    <FormInput label="Email" id="email" type="email" required={true} />

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