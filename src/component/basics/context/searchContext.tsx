import React,{createContext} from 'react';


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

type SearchType={
    products:dataType[] ;
    setProducts:(arg:dataType[])=>void
}

    const SearchContext=createContext<SearchType | null>(null);
    export default SearchContext;
