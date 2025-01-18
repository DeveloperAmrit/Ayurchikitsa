"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type ImageData = {
    imageUrl: string;
    userId: string;
}

type ApiResponse = {
    images: ImageData[];
}

export default function Analysis() {
    const [images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('/api/image');
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: ApiResponse = await res.json();
                setImages(data.images);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) {
        return <div className="text-center">Loading images...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Analysis Dashboard</h2>

            <Card>
                <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                    <CardDescription>Latest product lineup</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((item, index) => (
                            <div key={index} className="text-center">
                                <Image
                                    src={item.imageUrl || "/placeholder.svg"}
                                    alt={`Image by user ${item.userId}`}
                                    width={200}
                                    height={200}
                                    className="rounded-lg"
                                />
                                <p className="mt-2 font-medium">{item.userId}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
