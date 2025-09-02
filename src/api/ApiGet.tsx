const BASE_URL = "https://localhost:7242/api";

export interface Cliente {
    codCliente: number | string;
    cnpj: string;
    nome: string;
    email: string;
    dataCadastro: string;
    pedidos?: Pedido[];
}

export interface Pedido {
    codPedido: number | string;
    cnpj: string;
    nome: string;
    dataPedido: string;
    valorTotal: number | string;
    itens?: [];
}

export interface PagedResult<Product> {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    data: Product[];
}

export interface Product {
    codProduto: number;
    nome: string;
    preco: number;
    estoque: number;
}

export interface NewCliente {
    cnpj: string;
    nome: string;
    email: string;
}

export interface NewProduct {
    nome: string;
    preco: number;
    estoque: number;
}

export interface NewPedido {
    codCliente: number;
    valorTotal: number;
    produtosQuantidades: ProdutosQuantidade[];
}

export interface ProdutosQuantidade {
    codProduto: number;
    quantidade: number;
}

export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
        ...options,
    });
    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }
    return res.json();
}

export async function apiPost<T>(
    endpoint: string,
    body: T,
    options?: RequestInit
): Promise<T> {
    console.log("Posting to API:", endpoint, body);
    return apiFetch<T>(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
        ...options,
    });
}
