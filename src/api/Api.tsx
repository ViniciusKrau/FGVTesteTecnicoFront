const BASE_URL = "http://localhost:5000/api";

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
