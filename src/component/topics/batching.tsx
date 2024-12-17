// import { useState } from "react";
// import React from 'react'

//  function Batching() {
//     const [number, setNumber] = useState(0);
//     const[name,setName]=useState('ramesh');

//     return (
//       <>
//         <h1>{number}</h1>
//         <h1>{name}</h1>
//         <button onClick={() => {
//             setNumber(n => number + 1);
//           setNumber(number + 5);
//           setNumber(n => n + 1);
//           setNumber(number + 5);
//           setNumber(n => n + 1);
//           setName('suresh');
//           setNumber(n => n + 1);
//           setNumber(n => n + 1);
//           alert(number);
//           setNumber(number + 4);
//           setNumber(n => n + 1);
//           setName((name)=>name +'babli');
//           setNumber(n => n + 5);
//         }}>Increase the number and update the name</button>
//       </>
//     )
// }

// export default Batching;


import { useState } from "react";
import React from 'react'

 function Batching() {
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);

    function delay(ms:number) {
        return new Promise(resolve => {
          setTimeout(resolve, ms);
        });
      }
  
    async function handleClick() {
      setPending(pending + 1);
      await delay(3000);
      setPending(pending - 1);
      setCompleted(completed + 1);
    }
  
    return (
      <>
        <h3>
          Pending: {pending}
        </h3>
        <h3>
          Completed: {completed}
        </h3>
        <button onClick={handleClick}>
          Buy     
        </button>
      </>
    );
}

export default Batching;

