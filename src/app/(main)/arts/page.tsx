"use client"

import { ArtworkGridServer } from "@/_components/ArtworkGridServer ";
import { useAtom  } from "jotai";
import { persistentEmailAtom } from "@/basic/atom";


export default function ArtworksPage() {
  const [persistentAtom, setPersistentAtom] = useAtom(persistentEmailAtom);

  return <ArtworkGridServer userId={persistentAtom} />;
}