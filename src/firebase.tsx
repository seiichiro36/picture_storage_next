import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, Timestamp, where } from "firebase/firestore";
import { connectStorageEmulator, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { LgoinUserProp } from "./_Props/Login"; 

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 4. authとfirebaseそれぞれ実行、インスタンス化
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const checkUserWhetherIsExist = async ({email, password}: LgoinUserProp) => {
  console.log("checkUserWhetherIsExist", email, password);
  
  try {
    // まずFirebase Authで認証
    // const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // const uid = userCredential.user.uid;
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Firebaseでユーザデータを検索
    const userRef = collection(db, 'users')
    const q = query(userRef, where('email', '==', email), where('password', '==', password));
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      return {exists: true, message: '存在しています'};
    } 
    return {exist: false, message: '存在していません'};

  } catch (error) {
    console.error('検索エラー', error);
    return {exists: false, message: 'エラーが発生しました'};
  }
};

// アートワークスキーマ
interface Artwork {
  id: string;
  userId: string; // 投稿者のユーザーID
  title: string;
  description?: string;
  tags?: string[];
  imageUrl: string; // Storageの画像URL
  videoUrl?: string; // 任意の動画URL
  createdAt: Timestamp;
  updatedAt: Timestamp;
}



// 投稿関係
// アートワーク保存関数
const saveArtwork = async (artwork: Artwork) => {
  try {
    // ユーザー固有のアートワークコレクションに保存
    const userArtworksRef = collection(db, 'users', artwork.userId, 'artworks');
    const userArtworkDoc = await addDoc(userArtworksRef, {
      title: artwork.title,
      description: artwork.description || '',
      tags: artwork.tags || [],
      imageUrl: artwork.imageUrl,
      videoUrl: artwork.videoUrl || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // メインのアートワークコレクションに保存
    const artworksRef = collection(db, 'artworks');
    await addDoc(artworksRef, {
      ...artwork,
      id: userArtworkDoc.id
    });

    return userArtworkDoc.id;
  } catch (error) {
    console.error('アートワーク保存エラー:', error);
    throw error;
  }
};

// 画像アップロード関数
const uploadArtworkImage = async (file: File, userId: string) => {
  try {
    // ユニークなファイル名生成
    const fileName = `${userId}_${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `artworks/${fileName}`);
    
    // 画像アップロード
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      fileName,
      downloadURL
    };
  } catch (error) {
    console.error('画像アップロードエラー:', error);
    return null;
  }
};

// 画像とメタデータの取得
const fetchUserArtworks = async (userId: string): Promise<Artwork[]> => {
  try {
    const userArtworksRef = collection(db, 'users', userId, 'artworks');
    const artworksSnapshot = await getDocs(userArtworksRef);
    
    return artworksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Artwork));
  } catch (error) {
    console.error('アートワーク取得エラー:', error);
    return [];
  }
};


// exportしてどこからでも使えるようにする
export { storage, db };
export default auth;