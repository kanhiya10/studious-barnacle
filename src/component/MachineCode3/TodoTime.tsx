import React,{useEffect, useState} from 'react';
import { BsFillStopwatchFill } from "react-icons/bs";
import lion from '../../image/lion.jpg'

type RemainderType=({
    id:number | null;
    event:string;
    timer:number;
    isActive:boolean;
})

type timeProp=({
    id:number;
    // handleTime:(args:RemainderType)=>void;
})


 const TodoTime:React.FC<timeProp>=({id})=> {


    const[event,setEvent]=useState<string>('');
    const[time,setTime]=useState<string>('');

    const[remainder,setRemainder]=useState<RemainderType>({
    id:null,
    event:'',
    timer:0,
    isActive:false,
    });

    const[toggle,setToggle]=useState<boolean>(false);

    useEffect(()=>{
        if (Notification.permission === 'default') {
            Notification.requestPermission();
          }
    },[])

   useEffect(()=>{

      const intervalId=setInterval(()=>{
        setRemainder((prevRemainder)=>({...prevRemainder,timer:prevRemainder.timer-1000}))
      },1000)
      return ()=>clearInterval(intervalId);
    },[remainder.isActive])

    const remainderInfo=()=>{
        const timeInMilliseconds = parseInt(time) * 1000;
        if(timeInMilliseconds<0){
            alert('Please enter a valid event and time.');
            return;
        }
        
        setRemainder({
            id:id,
            event:event,
            timer:timeInMilliseconds,
            isActive:true,
        })
        setEvent('');
        setTime('');
        setTimeout(()=>{
            if (Notification.permission === 'granted') {
                new Notification('Reminder Alert', {
                    body: `${event} is due!`,
                    icon: lion, // Custom icon URL
                    requireInteraction: true, // Keeps the notification until the user interacts
                  });
            }
    
            setRemainder({id:null,
    event:'',
    timer:0,
    isActive:false,})

    setToggle(!toggle);
    
          },timeInMilliseconds)
    }

    const formatTime = (timeInMilliseconds: number) => {
        const seconds = Math.floor(timeInMilliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
      };

  


  return (
    <div>
        {
            remainder.isActive ?(
                <span>{formatTime(remainder.timer)}</span>
            ):(
                
                    toggle ?(
                        <span >
                        <input style={{width:60,height:30,backgroundColor:'honeydew',borderRadius: 10,border:'2px solid black'}} type="text" value={event} onChange={(e)=>setEvent(e.target.value)}/>
                        <input style={{width:40,height:30,backgroundColor:'honeydew',borderRadius:10,border:'2px solid black'}} type="text" value={time} onChange={(e)=>setTime((e.target.value))}/>
                        <button onClick={remainderInfo} style={{height:25,width:70,backgroundColor:'khaki',borderRadius:5,marginLeft:2}}>SetTimer</button>
                        </span>
                    )
                    :(
                        <BsFillStopwatchFill color='#B5651D' size={30} onClick={() => setToggle(!toggle)}/>
                    )
                
            )
        }


        
      
    </div>
  )
}
export default TodoTime;