"use client";
import ButtonTailwind from "@/components/ButtonTailwind";
import DefaultHeader from "@/components/header/DefaultHeader";
import ListHead from "@/components/ListHead";
import ListItem from "@/components/ListItem";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { apiFetch, Pedido, Cliente } from "@/api/ApiGet";
import Cookies from "js-cookie";
import { currencyFormat } from "@/lib/currencyFormat";

export default function Home() {
    const router = useRouter();

    const [cnpjInput, setCnpjInput] = useState("");
    const [isNewPedidoModalOpen, setIsNewPedidoModalOpen] = useState(false);
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Pedido>();
    const [items, setItems] = useState<Pedido[]>([]);
    const [cnpj, setCnpj] = useState<string | null>(null);
    const [consultaError, setConsultaError] = useState<string | null>(null);

    useEffect(() => {
        apiFetch<Pedido[]>("/Pedido/all")
            .then((data) => {
                setItems(data);
                console.log("Fetched items: ", data);
            })
            .catch((err) => console.error("API error:", err));
    }, []);

    useEffect(() => {
        if (isNewPedidoModalOpen && (cnpjInput === "" || cnpjInput === null)) {
            const cookie = Cookies.get("cliente");
            if (cookie) {
                setCnpjInput(JSON.parse(cookie).cnpj);
            }
        }
    }, [isNewPedidoModalOpen]);

    const handleSearchButton = () => {
        apiFetch<Cliente>(`/Cliente/cnpj/${cnpjInput}`)
            .then((data) => {
                if (data.cnpj === "") {
                    alert(
                        "Cliente não encontrado, por favor cadastre o cliente"
                    );
                    return;
                }
                setConsultaError(null);
                alert("Cliente encontrado, você pode prosseguir com o pedido");
                setCnpj(data.cnpj);
                Cookies.set("cliente", JSON.stringify(data));
            })
            .catch((err) => {
                if (err.message.includes("404")) {
                    alert("CNPJ não encontrado, por favor cadastre o cliente");
                    setConsultaError("CNPJ não encontrado");
                    return;
                }
                console.error("API error:", err);
            });
    };

    const handleNovoPedido = () => {
        if (Cookies.get("cliente") == null) {
            alert("Por favor, insira um CNPJ válido");
            return;
        }
        router.push("/catalog");
    };

    return (
        <>
            {isNewPedidoModalOpen && (
                <Modal onClose={() => setIsNewPedidoModalOpen(false)}>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Novo Pedido</h2>
                    </div>
                    {consultaError && (
                        <div className="mb-4 text-red-500">{consultaError}</div>
                    )}
                    <div>
                        <label className="label">CNPJ</label>
                    </div>
                    <input
                        type="text"
                        placeholder="cnpj"
                        className="input input-bordered w-full max-w-xs mb-3 bg-gray-300 text-black"
                        value={cnpjInput}
                        onChange={(e) => setCnpjInput(e.target.value)}
                    />
                    <div className="flex justify-center gap-10">
                        <ButtonTailwind
                            className="btn btn-primary"
                            onClick={() => handleSearchButton()}
                        >
                            Procurar
                        </ButtonTailwind>
                        <ButtonTailwind
                            className="btn btn-secondary"
                            onClick={() => {
                                handleNovoPedido();
                            }}
                        >
                            Novo Pedido
                        </ButtonTailwind>
                    </div>
                </Modal>
            )}

            <DefaultHeader />
            <main className="mx-auto max-w-5xl p-8">
                <h1 className="text-4xl font-semibold mb-4">Home</h1>
                <div className="flex justify-between p-4">
                    <p className="text-3xl text-gray-300 ml-4">Pedidos</p>
                    <ButtonTailwind
                        onClick={() => setIsNewPedidoModalOpen(true)}
                    >
                        Novo Pedido
                    </ButtonTailwind>
                </div>

                <table className="w-full border-collapse border border-gray-800 mb-8">
                    <ListHead
                        columns={[
                            { label: "CodPedido", className: "w-1/12" },
                            { label: "CNPJ", className: "w-3/12" },
                            { label: "Nome", className: "w-5/12" },
                            { label: "Data", className: "w-2/12" },
                            { label: "Valor", className: "w-1/12" },
                        ]}
                        rowClassName="bg-gray-800"
                    />
                    <ListItem
                        items={items}
                        onSelect={(item) => {
                            setSelectedItem(item);
                            setIsListModalOpen(true);
                        }}
                        rowClassName="cursor-pointer hover:bg-gray-700"
                        cellClassName="border border-gray-300 p-2"
                    />
                </table>
            </main>

            {isListModalOpen && selectedItem && (
                <Modal onClose={() => setIsListModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-4">
                        {selectedItem.codPedido}
                    </h2>
                    <p>
                        <strong>CNPJ:</strong> {selectedItem.cnpj}
                    </p>
                    <p>
                        <strong>Nome:</strong> {selectedItem.nome}
                    </p>
                    <p>
                        <strong>Data:</strong> {selectedItem.dataPedido}
                    </p>
                    <p>
                        <strong>Valor: </strong>{" "}
                        {!isNaN(Number(selectedItem.valorTotal))
                            ? currencyFormat(+selectedItem.valorTotal)
                            : selectedItem.valorTotal}
                    </p>
                    <div className="flex justify-center mt-4">
                        <ButtonTailwind
                            onClick={() => setIsListModalOpen(false)}
                        >
                            Close
                        </ButtonTailwind>
                    </div>
                </Modal>
            )}
        </>
    );
}
