import Link from 'next/link'
import React from 'react'

const imagePath = [
    "test_8.png",
    "test_1.png",
    "test_8.png",
    "test_2.png",
    "test_3.png",
    "test_4.png",
    "test_8.png",
    "test_5.png",
    "test_8.png",
]

const ItemList = () => {
  return (
//   <div className="">
//   <div 
//     className="columns-1 md:columns-2 lg:columns-3"
//   >
//     {imagePath.map((image, index) => (
//       <div 
//         key={index} 
//         className="break-inside-avoid mb-4 relative overflow-hidden"
//       >
//         <img
//           src={`./test_data/${image}`}
//           className="w-full h-auto object-cover"
//           loading="lazy"
//         />
//         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
//         </div>
//       </div>
//     ))}
//   </div>
// </div>
<div>
  <div 
    className="columns-1 md:columns-2 lg:columns-3 gap-0"
  >
    {imagePath.map((image, index) => (
    <Link href={`/posts/${index}`}>
        <div 
        key={index} 
        className="break-inside-avoid relative overflow-hidden"
        > 

        <img
          src={`./test_data/${image}`}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        </div>
      </div>
    </Link>
    
    ))}
  </div>
</div>
  )
}

export default ItemList