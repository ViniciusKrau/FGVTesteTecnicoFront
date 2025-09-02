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