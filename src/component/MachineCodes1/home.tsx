import React, { useState } from "react";
import cars from '../../carData.json';
import Dropdown from "./Dropdown";

const Home:React.FC=()=>{

    interface Car{
        carId:number;
        carName:string;
        carModel:string;
        carPrice:number;
        carPic:string;
    }
    const[carDescription,setCarDesc]=useState<Car[]>([]);

 const getDetail=(name:string):void=>{
    setCarDesc(cars.filter((item:Car)=>item.carName===name));
 }

 if(carDescription.length>0){
    console.log(carDescription);
 }

return(
    <div>

<h1>Choose the car you want to see in detail:</h1>
<Dropdown generateDetail={getDetail}/>

{carDescription.length > 0 && (
        <>
          {carDescription.map((temp:Car) => (
            <div key={temp.carId}>
                <h1>{temp.carName}</h1>
                <img src={temp.carPic} width={220} height={250}/>
              <h1>{temp.carModel}</h1>
              <p>Price: ${temp.carPrice}</p>
            </div>
          ))}
        </>
      )}
    </div>
)
}

export default Home;