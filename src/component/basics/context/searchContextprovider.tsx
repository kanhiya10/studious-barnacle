import React, { useState, ReactNode } from 'react';
import SearchContext from './searchContext';

interface DataType {
    id: number;
    title: string;
    description: string;
    images: string[];
    category: string;
    price: number;
    rating: number;
    stock: number;
}

type SearchContextProviderProps = {
    children: ReactNode;
};

const SearchContextProvider: React.FC<SearchContextProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<DataType[]>([]);

    return (
        <SearchContext.Provider value={{ products, setProducts }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContextProvider;
