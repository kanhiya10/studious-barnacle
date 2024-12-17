import React,{useEffect, useState} from "react";

interface MyButtonProps {
    generateDetail:(arg:string)=>void;
}

const Dropdown:React.FC<MyButtonProps>=(props)=>{

    const [data,setData]=useState<string[]>(['Volvo','Saab','Mercedes','Audi','BMW','Toyota','Honda']);

    const [val,setVal]=useState<string>('');

    const selectedValue=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        console.log(e.target.value);
        setVal(e.target.value);
    }

    useEffect(()=>{
        props.generateDetail(val);
    },[val])


    return(
        <div>
            {/* <label htmlFor="cars"> choose a car:</label> */}

        <select name="cars" id="cars" value={val} onChange={selectedValue}>
            {data.length>0 ?(
                <>
            {data.map((instance,index)=>(
                <option key={index} value={instance}>{instance}</option>
            ))}
            </>
        ):(
            <p>Data is not there</p>
        )
        }
        </select>
        
       
        </div>
    )
}
export default Dropdown;