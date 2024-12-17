import { useState,useContext } from 'react';
// import "./typeBody.css";
import Header from './header';
import SearchContext from './context/searchContext';

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   category: string;
//   rating: number;
//   availabilityStatus: string;
//   stock: number;
//   description: string;
//   thumbnail: string;
// }

function TypeBody() {
 
const context =useContext(SearchContext);

if(!context){
    console.log('MyComponent must be used within a MyProvider');
    return null;
}

const{products,setProducts}=context;

if(products){
    console.log("in body :",products);
}

  return (
  
   <div style={{height:'100%',width:'100vw',backgroundColor:'grey',border:'5px solid black'}}>
    <div style={{position:'fixed',top:'0',left:'0',height:'100%',width:'100%',zIndex:1}}>
        <Header/>
    </div>
    <div style={{paddingTop:'100px'}}>
            {products.length > 0 ? (
          <div style={{ padding: '20px' }}>
            {/* <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Products</h1> */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
              {products.map((product: any) => (
                <div
                  key={product.id}
                  style={{
                    width: '250px',
                    margin: '10px',
                    border: '2px solid black',
                    padding: '10px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                  <h3>{product.title}</h3>
                  <p><strong>Price:</strong> ${product.price}</p>
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Rating:</strong> {product.rating}</p>
                  <p><strong>Availability:</strong> {product.availabilityStatus}</p>
                  <p><strong>Stock:</strong> {product.stock} available</p>
                  <p><strong>Description:</strong> {product.description}</p>
                  <button style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: '20px' }}>
            <h2>No Products Available</h2>
          </div>
        )}
    </div>



   </div>
 
  );
}

export default TypeBody;

