import React, { useEffect, useState } from 'react';
import './virtualList.css';

interface MyProp {
    list: number[];
}

const VirtualList: React.FC<MyProp> = ({ list }) => {
    const itemHeight = 35;
    const windowHeight = 500;

    const [visibleData, setVisibleData] = useState<number[]>([]);
    const [scrollTop, setScrollTop] = useState(0);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    };

    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(startIndex + Math.floor(windowHeight / itemHeight), list.length);

    useEffect(() => {
        setVisibleData(list.slice(startIndex, endIndex)); // No need for +1
    }, [startIndex, endIndex, list]);
   


    return (
        <div 
        onScroll={handleScroll}
        style={{
            height:windowHeight,
            backgroundColor:'lightblue',
            overflowY:'auto',
            position:'relative'
        }}> 
            <div style={{
                height:list.length*itemHeight,//to make list scrollable as it provides enough height
                width:"100wh"
            }} >
                {visibleData.map((item,index)=>{
                    return(
                        <div
                        style={{
                            height:itemHeight,
                            backgroundColor:item%2===0?'gray':'greenyellow',
                            position:'absolute',
                            top:(startIndex+index)*itemHeight,//this is because when page is scrolled new array of limited size is generated, now relative to scrolling the array generated will always start from
                            //top , so array will not catchup with relative to scrolling therefore we use top property to align the array with scrolling as it variably assigns the gap from top to catch up with scrolling
                            width:"100%"
                        }}>
                            {item}
                            </div>
                    )
                })}

            </div>
           
        </div>
    );
};

export default VirtualList;
