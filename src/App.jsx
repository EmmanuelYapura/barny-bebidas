import React, { useState } from 'react';
import Login from './components/Login';
import StockManager from './components/StockManager';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([
    { 
      id: '1', 
      name: 'Stella Artois 330ml', 
      category: 'Cervezas', 
      quantity: 124, 
      price: 4.50,
      image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500&q=80' // URL de Google/Internet
    },
    { 
      id: '2', 
      name: 'Coca Cola Classic', 
      category: 'Refrescos', 
      quantity: 12, 
      price: 2.20,
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80'
    },
    { 
      id: '3', 
      name: 'Johnnie Walker Black', 
      category: 'Licores Premium', 
      quantity: 42, 
      price: 45.00,
      image: 'https://images.unsplash.com/photo-1527281400828-ac34a6598351?w=500&q=80'
    },
  ]);

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: Date.now().toString() }]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app-container">
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <StockManager 
          user={user} 
          products={products}
          onAdd={addProduct}
          onUpdate={updateProduct}
          onDelete={deleteProduct}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;