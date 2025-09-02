"use client";

import { apiFetch, apiPost } from "@/api/Api";
import { Cliente, NewPedido, PagedResult, Product, ProdutosQuantidade } from "@/api/ApiInterface";
import ButtonTailwind from "@/components/ButtonTailwind";
import DefaultHeader from "@/components/header/DefaultHeader";
import Modal from "@/components/Modal";
import { currencyFormat } from "@/lib/currencyFormat";
import { Button } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CartItem extends Product {
    quantity: number;
}

export default function Catalog() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCompraFeita, setIsCompraFeita] = useState(false);
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [valorTotal, setValorTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [pageSize] = useState(16);
    const router = useRouter();
    const [newPedido, setNewPedido] = useState<NewPedido>({
        codCliente: 0,
        valorTotal: 0,
        produtosQuantidades: []
    });

    useEffect(() => {
        const cartCookie = Cookies.get("cart");
        if (cartCookie) {
            setCart(JSON.parse(cartCookie));
        }
    }, []);

    useEffect(() => {
        const clienteCookie = Cookies.get("cliente");
        if (clienteCookie) {
            setCliente(JSON.parse(clienteCookie));
        }
    }, []);

    useEffect(() => {
        apiFetch<PagedResult<Product>>("/Produto/?page=" + page + "&pageSize=" + pageSize)
            .then((data) => {
                console.log("Fetched products: ", data);
                setProducts(data.data ?? []);
                setTotalPages(data.totalPages);
            })
            .catch((err) => console.error("API error:", err));
    }, [page, pageSize]);

    useEffect(() => {
        if (newPedido) {
            newPedido.codCliente = Cookies.get("cliente") ? JSON.parse(Cookies.get("cliente")!).codCliente : 0;
        }
    }, []);


    useEffect(() => {
        Cookies.set("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.preco * item.quantity, 0);
        setValorTotal(total);
    }, [cart]);


    const handleAddToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.codProduto === product.codProduto);
            if (existingItem) {
                if (existingItem.quantity >= product.estoque) {
                    return prevCart;
                }
                const cartItem = prevCart.map(item =>
                    item.codProduto === product.codProduto
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return cartItem;
            }
            if (product.estoque > 0) {
                return [...prevCart, { ...product, quantity: 1 }];
            }
            return prevCart;
        });
    };    

    const handleRemoveFromCart = (item: CartItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(i => i.codProduto === item.codProduto);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    return prevCart.filter(i => i.codProduto !== item.codProduto);
                }
                return prevCart.map(i =>
                    i.codProduto === item.codProduto
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                );
            }
            return prevCart;
        });
    };

    const handleCookies = (nome: string, cart:string) => {
        Cookies.set(nome, cart, { expires: 7 });
        setIsCompraFeita(true);
    }

    const handleCompra = async () => {
        const produtosQuantidade: ProdutosQuantidade[] = cart.map((cartItem) => ({
            codProduto: cartItem.codProduto,
            quantidade: cartItem.quantity
        }));

        const clienteCod = Cookies.get("cliente") ? JSON.parse(Cookies.get("cliente")!).codCliente : 0;

        const novoPedido: NewPedido = {
            codCliente: clienteCod,
            valorTotal: valorTotal,
            produtosQuantidades: produtosQuantidade
        };

        console.log("New Pedido: ", novoPedido);

        try {
            await apiPost<NewPedido>("/Pedido/create", novoPedido);
        } catch (error) {
            console.error("Erro ao criar pedido: ", error);
        }
    }

    const handleCheckout = () => {
        setIsModalOpen(true);
        setIsCompraFeita(false);
    }

    function maskCNPJ(cnpj?: string) {
    if (!cnpj) return "";
    return cnpj
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 18);
}

    return (
        <>
            {isModalOpen && (
                <Modal className="important w-2/5 h-auto max-h-170" onClose={() => setIsModalOpen(false)}>
                    <div className="justify-center items-center flex-col">
                        <h2 className="text-center text-2xl font-bold mb-4">Checkout</h2>
                        <div className="max-h-90 overflow-y-auto h-auto">
                            {cart.map((item, index) => (
                                <div className={`flex justify-between mx-4 ${index > 0  ? 'border-t-1' : ''}`} key={item.codProduto}>
                                    <div className="flex w-1/2 border-r-2 h-full py-2 px-1">
                                        <span>{item.nome} x{item.quantity}</span>
                                    </div>
                                    <div className="flex w-1/2 justify-end items-center py-2 px-2">
                                        <span>{currencyFormat(valorTotal)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mb-4 text-center">Total Amount: {currencyFormat(valorTotal)}</p>
                        {isCompraFeita && (
                            <p className="mb-4 text-center text-green-500">Compra realizada com sucesso!</p>
                        )}
                        <div className="flex justify-center gap-10">
                            <ButtonTailwind onClick={() => setIsModalOpen(false)}>
                                Back
                            </ButtonTailwind>
                            <ButtonTailwind onClick={() => {
                                handleCompra();
                                handleCookies("cart", JSON.stringify(cart));
                            }}>
                                Confirm
                            </ButtonTailwind>
                        </div>
                    </div>
                </Modal>
            )}
            <DefaultHeader />
            <main className="flex-grow flex p-8 mx-24">
                <div className="w-2/3 border-r-2 pr-4">
                    <div className= "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pr-4">
                        {(products ?? []).map((item) => (
                            <Button 
                                key={item.codProduto} 
                                className="border-gray-700 p-4 flex flex-col items-center hover:bg-gray-800 transition-colors text-center h-40"
                                onClick={() => handleAddToCart(item)}
                            >
                                <h2 className="text-xl font-bold mb-2 line-clamp-2 break-words">{item.nome}</h2>
                                <p className="text-lg text-gray-300">{currencyFormat(item.preco)}</p>
                                <p className="text-sm text-gray-400">Disponivel: {item.estoque}</p>
                            </Button>
                        ))}
                    </div>
                    
                </div>
                <div className="w-1/3 pl-4">
                {Cookies.get("cliente") && cliente && (
                    <div className="mb-4 p-4">
                        <h2 className="text-xl font-semibold mb-2">CNPJ</h2>
                        <p>{maskCNPJ(cliente.cnpj)}</p>
                        <ButtonTailwind onClick={() => {
                            Cookies.remove("cliente");
                            router.push("/");
                        }}>
                            Voltar
                        </ButtonTailwind>
                    </div>
                )}
                    <h2 className="text-3xl font-semibold mb-4 border-b-2 pb-2">Cart</h2>
                    {cart.length === 0 && (
                        <p className="text-gray-400">Your cart is empty.</p>
                    )}
                        <>
                            <ul className="max-h-96 overflow-y-auto">
                                {cart.map(item => (
                                    <li key={item.codProduto} className="flex justify-between items-center mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer"
                                    onClick={() => handleRemoveFromCart(item)}>
                                        <div>
                                            <p className="font-semibold">{item.nome}</p>
                                            <p className="text-sm text-gray-400">x{item.quantity}</p>
                                        </div>
                                        <span>{currencyFormat(item.preco * item.quantity)}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="border-t-2 mt-4 pt-4">
                                <p className="flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span>{currencyFormat(valorTotal)}</span>
                                </p>
                            </div>
                            <div className="px-10">
                                <Button className="w-full mt-4" onClick={() => handleCheckout()}>
                                    Checkout
                                </Button>
                                <Button className="w-full mt-4 bg-red-700" onClick={() => {setCart([]); Cookies.remove("cart");}}>
                                    Clear Cart
                                </Button>
                            </div>
                        </>
                    <div className="flex justify-center mt-4 gap-4">
                        <ButtonTailwind onClick={() => setPage(page => Math.max(page - 1, 1))}>
                            Previous
                        </ButtonTailwind>
                        <span>Page {page}</span>
                        <ButtonTailwind onClick={() => setPage(page => page + 1)} hidden={page === totalPages}>
                            Next
                        </ButtonTailwind>
                    </div>  
                </div>
            </main>
        </>
    );
}