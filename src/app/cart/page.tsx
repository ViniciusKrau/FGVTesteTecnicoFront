import ButtonTailwind from "@/components/ButtonTailwind";
import DefaultHeader from "@/components/header/DefaultHeader"



export default function Cart() {

    return (
        <>
            <DefaultHeader/>
            <main className="flex-grow flex p-8 mx-24">
                <div className="w-2/3 pr-4 border-r-6 border-gray-300">
                    <h1 className="text-3xl font-semibold mb-4">Cart</h1>
                    <div className="text-lg">Your cart is empty.</div>
                </div>
                <div className="w-1/3 pl-4">
                    <ButtonTailwind>Teste</ButtonTailwind>
                </div>
            </main>
        </>
    );
}