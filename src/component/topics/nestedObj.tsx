// import { useState } from "react";
// import React from 'react'

//  function NestedObj() {
//     const [person, setPerson] = useState({
//         name: 'Niki de Saint Phalle',
//         artwork: {
//           title: 'Blue Nana',
//           city: 'Hamburg',
//           image: 'https://i.imgur.com/Sd1AgUOm.jpg',
//         }
//       });

//       const handleCity=()=>{
//         setPerson((prevPerson)=>({
//             ...prevPerson,artwork:{
//                 ...prevPerson.artwork,city:'rohtak'
//             }
//         })
//         )
//       }
//   return (
//     <div>
//       <h1>update person.artwork.city</h1>
//       {
//         Object.keys(person).length>0 &&(
//             <div style={{border:'2px solid black' ,width:500}}>
//                 <h1>{person.name}</h1>
//                 <p>{person.artwork.title}</p>
//                 <p>{person.artwork.city}</p>
//                 <img src={person.artwork.image} style={{height:120,width:100}}/>
//                 </div>
//         )
//       }

//       <button onClick={handleCity}>change city to rohtak</button>
//     </div>
//   )
// }
// export default NestedObj

import { useState } from 'react';

export default function NestedObj() {
  const [player, setPlayer] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  function handlePlusClick():void {
    setPlayer(
      {
        ...player,score:(++player.score),
      }
    )
  }

  function handleFirstNameChange(e:React.ChangeEvent<HTMLInputElement>) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e:React.ChangeEvent<HTMLInputElement>) {
    setPlayer({
      ...player,lastName:e.target.value,
    });
  }

  return (
    <>
      <label>
        Score: <b>{player.score}</b>
        {' '}
        <button onClick={handlePlusClick}>
          +1
        </button>
      </label>
      <label>
        First name:
        <input
          value={player.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:
        <input
          value={player.lastName}
          onChange={handleLastNameChange}
        />
      </label>
    </>
  );
}
