import { useEffect, useState,useContext } from 'react';
import "./typeAhead.css";
import SearchContext from './context/searchContext';

function TypeAhead() {

  const[val,setVal]=useState('');
  const[data,setData]=useState<dataType[]>([]);

  const context=useContext(SearchContext)



  useEffect(() => {
    const abortController=new AbortController();
    const {signal}=abortController;
    const handleSearch = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${val}`,{signal});
        const data = await response.json();
        console.log(data);
        setData(data.products);
        setProducts(data.products)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Set a timeout to delay the search
    const timerId = setTimeout(() => {
      if (val) {
        handleSearch();
      }
    }, 2000);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(timerId);
      abortController.abort();
    };
  }, [val]);



  if(!context){
    console.log('MyComponent must be used within a MyProvider');
    return null;
  }

  const {setProducts}=context;



  interface dataType{
    id:number,
    title:string,
    description:string,
    images:string[],
    category:string,
    price:number,
    rating :number,
    stock:number,
  }


  return (
  <div >
    <div className='searchbar'>
    <input type="text" value={val} onChange={(e)=>setVal(e.target.value)}/>
    <button >Search</button>
    </div>
   {/* {val.length>0 && (

   )
} */}

  </div>
  );
}

export default TypeAhead;