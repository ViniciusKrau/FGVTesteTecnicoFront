

export default function Catalogo() {
    const placeholderItems = [
        { id: 1, name: "Product 1", price: 100 },
        { id: 2, name: "Product 2", price: 200 },
        { id: 3, name: "Product 3", price: 300 },
    ];
    return (
        <div className="mx-auto max-w-5xl p-8">
            <h1 className="text-3xl font-semibold mb-4">Catalogo</h1>
            <ul>
                {placeholderItems.map(item => (
                    <li key={item.id} className="border-b py-2">
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-gray-600">${item.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}