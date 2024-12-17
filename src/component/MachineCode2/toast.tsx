import React,{useEffect, useState,useRef} from 'react'
import "./toast.css";

function Toast() {

    // const time:number=4000;
    // const timerIds=useRef<{id:number | null | NodeJS.Timeout
    // }>({id:null});

    type obj={
        'Success':string
        'Warning':string
        'Info':string
        'Error':string
    }
    const toastColor:obj={
        'Success':'green',
        'Warning':'yellow',
        'Info':'gray',
        'Error':'red'
    }

    type multiple={
        id:number
        message:string 
        // type:string
    }

    const[toast,setToast]=useState<multiple[]>([]);

    // useEffect(()=>{
    //     setTimeout(()=>handleClose(),5000);
    // },[toast])

    const handleTimer=(Id:number):void=>{
        setTimeout(()=>handleClose(Id),5000);
    }

    const handleClose = (Id: number): void => {
        // clearTimeout(timerIds.current[Id])
        // delete timerIds.current[Id];
        setToast((prevToast) => prevToast.filter((value) => value.id !== Id));//here updater function is used to use most recent updated value
    };
    

    const handleToast=(e:React.MouseEvent<HTMLDivElement>):void=>{
        const id=new Date().getTime();

        const message = (e.target as HTMLButtonElement).textContent || '';

        setToast([...toast, {
            "id": id,
            "message": message
        }]);
        handleTimer(id);
        
    }
  return (
    <div style={{backgroundColor:'black',width:'100vw',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <h1>Toast</h1>
    <div style={{ display: 'flex', gap: '10px' }} onClick={(e)=>handleToast(e)} >
    <button className="toast-button">Success</button>
    <button className="toast-button">Warning</button>
    <button className="toast-button">Info</button>
    <button className="toast-button">Error</button>
    </div>
    {
        toast.length>0 && (
        <div style={{position:'fixed',right:40,top:40}}>
        {
            toast.map((item)=>{
                return(
                    <div key={item.id} className="toastStyle" style={{backgroundColor:toastColor[item.message as keyof obj],height:60,width:350,borderRadius:50,marginBottom:20}}>
            <h1 style={{position:'relative',right:50,top:10}}>{item.message} <span style={{position:'absolute',right:24}} onClick={()=>handleClose(item.id)}>x</span></h1>
            </div>
                )
            })
        }
        </div>
            
        )
    }
    </div>
  )
}

export default  Toast;