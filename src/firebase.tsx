import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, setDoc, Timestamp, where } from "firebase/firestore";
import { connectStorageEmulator, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {toast} from "react-toastify"

import { LgoinUserProp } from "./types/Login"; 

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

interface LoginUserProp {
  email: string;
  password: string;
}


interface ResisterUserProp {
  email: string;
  password: string;
  username: string;
  userId: string;
  bio?: string;
  tags?: string[];
  ProfileImageName?: string;
}

interface AuthResponse {
  exists: boolean;
  message: string;
  uid?: string;
}


export const checkUserWhetherIsExist = async ({ email, password }: LoginUserProp): Promise<AuthResponse> => {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Firebase Authで認証
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Firestoreでユーザー情報を取得（パスワードは保存しない）
    const userRef = collection(db, 'user');
    const q = query(userRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { exists: true, message: '存在しています', uid };
    }

    return { exists: false, message: '存在していません' };

  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      return { exists: false, message: 'ユーザーが存在しません' };
    }
    if (error.code === 'auth/wrong-password') {
      toast("パスワードが違います！！", {
        style: { background: '#ff3c3c', color: "#ffffff" },
        
      })
      return { exists: false, message: 'パスワードが間違っています' };
    }
    return { exists: false, message: 'ログインエラーが発生しました' };
  }
}

interface UserProfile {
  email: string;
  name: string;
  userId: string;
  statusMessage?: string;
  tags: string[];
  profileImageUrl?: string;
}

export const uploadProfileImage = async (file: File, email: string): Promise<string> => {
  const safeEmailPath = encodeURIComponent(email);
  const storageRef = ref(storage, `profileImage/${safeEmailPath}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};


export const storeTemporaryRegistration = async (profile: UserProfile, password: string): Promise<AuthResponse> => {
  try {
    const tempRef = doc(collection(db, 'tempUser'));
    await setDoc(tempRef, {
      ...profile,
      password,
      createdAt: new Date(),
    });

    return { exists: true, message: 'プロフィール情報を保存しました', tempId: tempRef.id };
  } catch (error: any) {
    console.error('一時保存エラー:', error);
    return { exists: false, message: 'プロフィール保存に失敗しました' };
  }
};

// Step 2: Complete registration
export const completeRegistration = async (tempId: string): Promise<AuthResponse> => {
  try {
    const tempDoc = await getDoc(doc(db, 'tempUser', tempId));
    if (!tempDoc.exists()) {
      throw new Error('一時データが見つかりません');
    }

    const userData = tempDoc.data();
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const uid = userCredential.user.uid;

    const userRef = doc(collection(db, 'users'), uid);
    await setDoc(userRef, {
      email: userData.email,
      name: userData.name,
      userId: userData.userId,
      statusMessage: userData.statusMessage,
      tags: userData.tags,
      profileImageUrl: userData.profileImageUrl,
      createdAt: new Date(),
    });

    await deleteDoc(doc(db, 'tempUsers', tempId));

    return { exists: true, message: 'ユーザー登録が完了しました', uid };
  } catch (error: any) {
    console.error('登録エラー:', error);
    return { exists: false, message: '登録に失敗しました' };
  }
};

// 新規ユーザー登録用の関数
export const createNewUser = async ({ email, password, username, userId, bio, tags, ProfileImageName }: ResisterUserProp): Promise<AuthResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const userRef = doc(collection(db, 'user'), uid); // 'user' から 'users' に修正
    await setDoc(userRef, {
      email,
      username,
      userId, 
      bio,
      tags,
      ProfileImageName,
      createdAt: new Date(),
    });

    return { exists: true, message: 'ユーザーを作成しました', uid };
  } catch (error: any) {
    console.error('作成エラー:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    return { exists: false, message: `ユーザー作成に失敗しました: ${error.message}` };
  }
};

// アートワークスキーマ
interface Artwork {
  userId: string; // 投稿者のユーザーID
  title: string;
  description?: string;
  tags?: string[];
  imageUrl: string; // Storageの画像URL
  videoUrl?: string; // 任意の動画URL
}



// 投稿関係
// アートワーク保存関数
export const saveArtwork = async (artwork: Artwork) => {
  try {
    // ユーザー固有のアートワークコレクションに保存
    const userArtworksRef = collection(db, 'user', artwork.userId, 'artworks');
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
export const uploadArtworkImage = async (file: File, userId: string, fileNameWithDate: string) => {
  try {
    // ユニークなファイル名生成
    // const fileName = `${userId}_${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `artworks/${fileNameWithDate}`);
    
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
export const fetchUserArtworks = async (userId: string): Promise<Artwork[]> => {
  try {
    // Firestoreからメタデータを取得
    const userArtworksRef = collection(db, 'user', userId, 'artworks');
    const artworksSnapshot = await getDocs(userArtworksRef);
    
    // 各アートワークについて、Storageからの画像URLを取得
    const artworksWithUrls = await Promise.all(
      artworksSnapshot.docs.map(async (doc) => {
        const data = doc.data();
        let imageUrl = data.imageUrl;
        
        // imageUrlがStorage参照パスの場合（例: "artworks/image123.jpg"）
        if (imageUrl && !imageUrl.startsWith('http')) {
          try {
            imageUrl = "artworks/" + imageUrl
            const imageRef = ref(storage, imageUrl);

            imageUrl = await getDownloadURL(imageRef);
          } catch (error) {
            console.error('画像URL取得エラー:', error);
            imageUrl = '/placeholder-image.jpg'; // プレースホルダー画像のパス
          }
        }

        let videoUrl = data.videoUrl;
        // 動画URLも同様に処理
        if (videoUrl && !videoUrl.startsWith('http')) {
          try {
            const videoRef = ref(storage, videoUrl);
            videoUrl = await getDownloadURL(videoRef);
          } catch (error) {
            console.error('動画URL取得エラー:', error);
            videoUrl = undefined;
          }
        }

        return {
          id: doc.id,
          ...data,
          imageUrl,
          videoUrl
        } as Artwork;
      })
    );

    return artworksWithUrls;
  } catch (error) {
    console.error('アートワーク取得エラー:', error);
    return [];
  }
};
// プロフィール画像を表示する関数
export async function getProfileImage(email: any) {
  try {
    // Firebaseストレージインスタンスの取得
    const storage = getStorage();
    
    // メールアドレスをエンコードして安全なパスを作成
    const safeEmailPath = encodeURIComponent(email);
    // 画像への参照を作成
    const imageRef = ref(storage, `profileImage/${safeEmailPath}`);
    
    // 画像のダウンロードURLを取得
    const imageUrl = await getDownloadURL(imageRef);
    
    return imageUrl;
  } catch (error) {
    // エラーハンドリング
    console.error("プロフィール画像の取得に失敗しました:", error);
    
    // エラーに応じて異なる処理
    if (error.code === 'storage/object-not-found') {
      console.log('画像が見つかりませんでした');
      return null;
    }
    
    throw error;
  }
}


// exportしてどこからでも使えるようにする
export { storage, db };
export default auth;