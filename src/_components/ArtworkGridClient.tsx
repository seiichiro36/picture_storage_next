'use client';

import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { fetchUserArtworks } from "@/firebase";
import { usePathname, useRouter } from "next/navigation";
import { persistentEmailAtom } from "@/basic/atom";
import { useAtom } from "jotai";




interface Artwork {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    tags?: string[];
    videoUrl?: string;
}

export function ArtworkGridClient({ artworks }: { artworks: Artwork[] }) {
    const pathname = usePathname()
    const router = useRouter()

    const [persistentAtom, setPersistentAtom] = useAtom(persistentEmailAtom);

    useEffect(() => {
        fetchUserArtworks("sss"); // pathname が変わるたびにデータを取得
        router.refresh()

    }, [pathname]);
    console.log(persistentAtom);
    
    return (
        <div className="container mx-auto p-4">
            {persistentAtom}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {artworks.map((artwork) => (
                    <Card key={artwork.id} className="overflow-hidden">
                        <div className="aspect-square relative"  onClick={() => {router.push(`/arts/${artwork.id}`)}}>
                            <img
                                src={artwork.imageUrl}
                                alt={artwork.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-lg">{artwork.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {artwork.videoUrl && (
                                <video
                                    className="w-full"
                                    controls
                                    src={artwork.videoUrl}
                                />
                            )}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {artwork.tags?.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 bg-gray-100 rounded-full text-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}