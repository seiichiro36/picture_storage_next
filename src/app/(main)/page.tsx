// "use client"

// import { Button } from "@/components/ui/button";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useState } from "react";
// import {
//   doc,
//   getDoc,
// } from "firebase/firestore";
// import { db } from "@//firebase";
// import auth from "@/firebase"
// import { User } from "firebase/auth";
// import Task from "@/components/Task";




// export default function Home() {
//   const [loginUser] = useAuthState(auth);
//   const [ enableEnter, setEnableEnter ] = useState("")


//   const user: User|null = auth.currentUser;

//   // const whetherExisitedWordOrNot = async () => {
//   //   const docRef = doc(db, "users",  user.uid, "username", "Existed");
//   //   const docSnap = await getDoc(docRef);
//   //   if ( docSnap.exists()) {
//   //     console.log("Document data:", docSnap.data());
//   //     setEnableEnter("word")
//   //   } else {
//   //     console.log("No such document!");
//   //     setEnableEnter("")
//   //   }
//   // };
//   // whetherExisitedWordOrNot()
  
//   return (
//     <div>
//       <div>
//         {/* {loginUser ? <>{enableEnter ? <Storage /> : <BranchPoint />}</> : < />} */}
//         <Task />
//       </div>
//     </div>

// );
//   // return (
//   //   <>
//   //   <div>
//   //     <Button>Click me!!</Button>
//   //   </div>
//   //   </>
//   // );
// }

export default function Home() {
  return (
    <><div>Hello Next.js!!</div>
    </>
  );
}
