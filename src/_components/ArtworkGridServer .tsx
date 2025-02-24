import { fetchUserArtworks } from '@/firebase';
import { ArtworkGridClient } from './ArtworkGridClient';
import { Artwork } from '@/types/interface';


// Firebaseから取得したデータを変換する関数
function convertTimestampToString(artwork: any): Artwork {
  return {
    ...artwork,
    createdAt: artwork.createdAt?.toDate().toISOString() || '',
    updatedAt: artwork.updatedAt?.toDate().toISOString() || ''
  };
}

export async function ArtworkGridServer({ userId }: { userId: string }) {
  const artworks = await fetchUserArtworks(userId);
  const convertedArtworks = artworks.map(convertTimestampToString);

  return <ArtworkGridClient artworks={convertedArtworks} />;
}