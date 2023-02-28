// // @ts-nocheck
// // temporary workaround till I actually understand TS :+1:
// import type { NextPage } from "next";
// import Head from "next/head";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { TextLoop } from "react-text-loop-next";

// const Home: NextPage = () => {
//   const [definition, setDefinition] = useState(false);

//   const definitionHandler = () => {
//     setDefinition(true);
//   };

//   return (
//     <div className="w-screen h-screen bg-[#070707] overflow-x-clip overflow-y-clip text-white">
//       {/* <div className="absolute top-[10%] left-[7.5%]">
//         <h1 className="font-krona text-[42px] ">First Impressions Matter.</h1>
//       </div> */}
//       <h1 className="font-serif absolute top-[7.5%] left-[5%] fade-in">
//         The web is for the most part{" "}
//         <button onClick={definitionHandler} className=" underline text-[16px]">
//           static
//         </button>
//       </h1>

//       {definition && (
//         <div className="font-serif absolute top-[11%] left-[5%] text-[16px]">
//           <h1>
//             /ˈstatɪk/ <span className="italic text-[#7d7d7d]">(adjective)</span>
//           </h1>

//           <h1 className="indent-4 mt-2">
//             - lacking in movement, action, or change, especially in an
//             undesirable or uninteresting way.
//           </h1>
//           <h1 className="indent-4 mt-2">
//             - the absence of development or vitality.
//           </h1>
//           <h1 className="indent-4 mt-2">-</h1>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
