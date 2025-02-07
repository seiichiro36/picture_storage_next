import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { fetchUserArtworks } from '@/firebase';
import { ArtworkGridClient } from './ArtworkGridClient';

interface Artwork {
    id: string;
    title: string;
    description?: string;
    imageUrl: string;
    tags?: string[];
    videoUrl?: string;
  }

export async function ArtworkGridServer({ userId }: { userId: string }) {
  const artworks = await fetchUserArtworks(userId);
  
  return <ArtworkGridClient artworks={artworks} />;
}