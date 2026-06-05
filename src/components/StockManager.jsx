import React, { useState } from 'react';
import ProductForm from './ProductForm';

function StockManager({ user, products, onAdd, onUpdate, onDelete, onLogout }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  // Imagen de respaldo por si el producto no tiene foto o el enlace de Google se cae
  const placeholderImage = "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=500&q=80";

  return (
    <div className="dashboard">
      <header className="dash-header">
        <span className="brand-header-title">📋 BevStock Control</span>
        <button onClick={onLogout} className="btn-logout">Cerrar Sesión</button>
      </header>

      <main className="dash-content">
        {!isFormOpen ? (
          <>
            <h1>Inventory Management</h1>
            <p className="dash-subtitle">Real-time status of your beverage stock levels.</p>

            <div className="products-list">
              {products.map((product) => {
                const isLow = product.quantity < 15;
                return (
                  <div className="product-card" key={product.id}>
                    
                    {/* NUEVO: Contenedor de Imagen de la Tarjeta */}
                    <div className="product-card-image">
                      <img 
                        src={product.image || placeholderImage} 
                        alt={product.name} 
                        onError={(e) => { e.target.src = placeholderImage; }} // Evita romper la app si la URL falla
                      />
                    </div>

                    <div className="product-card-header">
                      <div>
                        <span className="category-badge">{product.category}</span>
                        <h3 className="product-name">{product.name}</h3>
                        <span className="product-sku">SKU: BEER-{product.id}</span>
                      </div>
                      <div className="stock-display">
                        <span className="stock-number">{product.quantity}</span>
                        <span className={`stock-status ${isLow ? 'low-stock' : 'in-stock'}`}>
                          {isLow ? 'Low Stock' : 'In Stock'}
                        </span>
                      </div>
                    </div>

                    <div className="product-card-footer">
                      <span className="product-price">
                        <strong>${product.price.toFixed(2)}</strong> / unit
                      </span>
                      <div className="card-actions">
                        <button className="btn-icon-edit" onClick={() => handleEditClick(product)} title="Modificar">
                          ✏️
                        </button>
                        <button 
                          className="btn-icon-delete" 
                          onClick={() => {
                            if(confirm('¿Eliminar producto?')) onDelete(product.id)
                          }}
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="btn-float-add" onClick={() => setIsFormOpen(true)} title="Añadir Producto">
              +
            </button>
          </>
        ) : (
          <div className="form-container-limited">
            <div className="form-header">
              <button className="btn-back" onClick={handleCloseForm}>←</button>
              <h2>{editingProduct ? 'Modificar Producto' : 'Nuevo Producto'}</h2>
            </div>
            
            <ProductForm 
              onAdd={onAdd} 
              onUpdate={onUpdate}
              editingProduct={editingProduct} 
              closeForm={handleCloseForm} 
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default StockManager;