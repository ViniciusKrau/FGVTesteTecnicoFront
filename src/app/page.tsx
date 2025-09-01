"use client";
import ButtonTailwind from "@/components/ButtonTailwind";
import DefaultHeader from "@/components/header/DefaultHeader";
import ListHead from "@/components/ListHead";
import ListItem from "@/components/ListItem";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function Home() {
  const placeholderItems = [
    {
      codPedido: 1,
      cnpj: "Item 1",
      nome: "Description 1",
      date: "2023-01-01",
      valor: "Active",
    },
    {
      codPedido: 2,
      cnpj: "Item 2",
      nome: "Description 2",
      date: "2023-01-02",
      valor: "Inactive",
    },
    {
      codPedido: 3,
      cnpj: "Item 3",
      nome: "Description 3",
      date: "2023-01-03",
      valor: "Active",
    },
    {
      codPedido: 4,
      cnpj: "Item 4",
      nome: "Description 4",
      date: "2023-01-04",
      valor: "Inactive",
    },
    {
      codPedido: 5,
      cnpj: "Item 5",
      nome: "Description 5",
      date: "2023-01-05",
      valor: "Active",
    },
    {
      codPedido: 6,
      cnpj: "Item 6",
      nome: "Description 6",
      date: "2023-01-06",
      valor: "Active",
    },
    {
      codPedido: 7,
      cnpj: "Item 7",
      nome: "Description 7",
      date: "2023-01-07",
      valor: "Inactive",
    },
    {
      codPedido: 8,
      cnpj: "Item 8",
      nome: "Description 8",
      date: "2023-01-08",
      valor: "Active",
    },
    {
      codPedido: 9,
      cnpj: "Item 9",
      nome: "Description 9",
      date: "2023-01-09",
      valor: "Inactive",
    },
    {
      codPedido: 10,
      cnpj: "Item 10",
      nome: "Description 10",
      date: "2023-01-10",
      valor: "Active",
    },
    {
      codPedido: 11,
      cnpj: "Item 11",
      nome: "Description 11",
      date: "2023-01-11",
      valor: "Inactive",
    },
    {
      codPedido: 12,
      cnpj: "Item 12",
      nome: "Description 12",
      date: "2023-01-12",
      valor: "Active",
    },
    {
      codPedido: 13,
      cnpj: "Item 13",
      nome: "Description 13",
      date: "2023-01-13",
      valor: "Inactive",
    },
    {
      codPedido: 14,
      cnpj: "Item 14",
      nome: "Description 14",
      date: "2023-01-14",
      valor: "Active",
    },
    {
      codPedido: 15,
      cnpj: "Item 15",
      nome: "Description 15",
      date: "2023-01-15",
      valor: "Inactive",
    },
    {
      codPedido: 16,
      cnpj: "Item 16",
      nome: "Description 16",
      date: "2023-01-16",
      valor: "Active",
    },
    {
      codPedido: 17,
      cnpj: "Item 17",
      nome: "Description 17",
      date: "2023-01-17",
      valor: "Inactive",
    },
    {
      codPedido: 18,
      cnpj: "Item 18",
      nome: "Description 18",
      date: "2023-01-18",
      valor: "Active",
    },
    {
      codPedido: 19,
      cnpj: "Item 19",
      nome: "Description 19",
      date: "2023-01-19",
      valor: "Inactive",
    },
    {
      codPedido: 20,
      cnpj: "Item 20",
      nome: "Description 20",
      date: "2023-01-20",
      valor: "Active",
    },
    {
      codPedido: 21,
      cnpj: "Item 21",
      nome: "Description 21",
      date: "2023-01-21",
      valor: "Inactive",
    },
    {
      codPedido: 22,
      cnpj: "Item 22",
      nome: "Description 22",
      date: "2023-01-22",
      valor: "Active",
    },
    {
      codPedido: 23,
      cnpj: "Item 23",
      nome: "Description 23",
      date: "2023-01-23",
      valor: "Inactive",
    },
    {
      codPedido: 24,
      cnpj: "Item 24",
      nome: "Description 24",
      date: "2023-01-24",
      valor: "Active",
    },
    {
      codPedido: 25,
      cnpj: "Item 25",
      nome: "Description 25",
      date: "2023-01-25",
      valor: "Inactive",
    },
    {
      codPedido: 26,
      cnpj: "Item 26",
      nome: "Description 26",
      date: "2023-01-26",
      valor: "Active",
    },
  ];

  const [isNewPedidoModalOpen, setIsNewPedidoModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>();

  interface SelectedItem {
    codPedido: number | string;
    cnpj: string;
    nome: string;
    date: string;
    valor: number | string;
  }

  return (
    <>
      {isNewPedidoModalOpen && (
        <Modal onClose={() => setIsNewPedidoModalOpen(false)}>
          <input
            type="text"
            placeholder="cnpj"
            className="input input-bordered w-full max-w-xs mb-3"
          />
          <div className="flex justify-center gap-10">
            <button
              className="btn btn-primary"
              onClick={() => setIsNewPedidoModalOpen(false)}
            >
              Close
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                console.log("teste");
              }}
            >
              Teste
            </button>
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
            novo pedido
          </ButtonTailwind>
        </div>

        <table className="w-full border-collapse border border-gray-800 mb-8">
          <ListHead
            columns={[
              { label: 'ID', className: 'w-1/12' },
              { label: 'Title', className: 'w-3/12' },
              { label: 'Description', className: 'w-5/12' },
              { label: 'Date', className: 'w-2/12' },
              { label: 'Status', className: 'w-1/12' },
            ]}
            rowClassName="bg-gray-800"
          />
          <ListItem
            items={placeholderItems}
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
          <h2 className="text-2xl font-bold mb-4">{selectedItem.codPedido}</h2>
          <p>
            <strong>ID:</strong> {selectedItem.cnpj}
          </p>
          <p>
            <strong>Description:</strong> {selectedItem.nome}
          </p>
          <p>
            <strong>Date:</strong> {selectedItem.date}
          </p>
          <p>
            <strong>Status:</strong> {selectedItem.valor}
          </p>
          <div className="flex justify-center mt-4">
            <ButtonTailwind onClick={() => setIsListModalOpen(false)}>
              Close
            </ButtonTailwind>
          </div>
        </Modal>
      )}

    </>
  );
}
