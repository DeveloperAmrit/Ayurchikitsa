import { useState, useEffect } from "react";

async function fetchUserToken(userId: any) {
    const response = await fetch('/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user token');
    }

    const data = await response.json();
    return data.token;
}

export default function useToken(userId: unknown) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        fetchUserToken(userId)
            .then(setToken)
            .catch(console.error);
    }, [userId]);

    return token;
}