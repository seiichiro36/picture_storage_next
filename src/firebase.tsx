import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

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


// export const checkUserExistance = () => {
//   return new Promise((resolve) => {
//     onAuthStateChanged(auth, async (user) => {
//       if (!user) {
//         return null;
//       }
//       console.log("checkUserDocumentExists内のuid: ", user.uid);
//       if (user) {
//         const uid = user.uid;
//         const userRef = doc(db, "users", uid);

//         try {
//           const docSnap = await getDoc(userRef);
//           if (docSnap.exists()) {
//             console.log("ユーザードキュメントが存在します");
//             resolve(true);
//           } else {
//             console.log("ユーザードキュメントが存在しません");
//             resolve(false);
//           }
//         } catch (error) {
//           console.error("エラーが発生しました:", error);
//           resolve(false);
//         }
//       } else {
//         console.log("ユーザーがログインしていません");
//         resolve(false);
//       }
//     });
//   });
// }

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


// exportしてどこからでも使えるようにする
export { storage, db };
export default auth;