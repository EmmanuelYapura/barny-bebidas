import React, { useState, useEffect } from 'react';

function ProductForm({ onAdd, onUpdate, editingProduct, closeForm }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Cervezas');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  
  // Estado único para la imagen del producto (guardará el Base64)
  const [image, setImage] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setCategory(editingProduct.category);
      setQuantity(editingProduct.quantity);
      setPrice(editingProduct.price);
      setImage(editingProduct.image || '');
    }
  }, [editingProduct]);

  // Procesa tanto fotos de la cámara como archivos descargados de la galería/PC
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Transforma la foto a una cadena de texto Base64 interpretable por <img src="..." />
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      name,
      category,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      image: image // Se guarda la cadena Base64 en el objeto de datos local
    };

    if (editingProduct) {
      onUpdate({ ...productData, id: editingProduct.id });
    } else {
      onAdd(productData);
    }
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Product Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="e.g. Corona Extra 355ml" 
          required 
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Cervezas">Cervezas</option>
          <option value="Refrescos">Refrescos</option>
          <option value="Aguas">Aguas</option>
          <option value="Licores Premium">Licores Premium</option>
        </select>
      </div>

      {/* Control único y optimizado para imágenes locales/cámara */}
      <div className="form-group">
        <label>Imagen del Producto (Archivo o Foto)</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          style={{ padding: '8px' }}
        />
        
        {/* Contenedor estético de Vista Previa en tiempo real */}
        {image && (
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>VISTA PREVIA</span>
            <img 
              src={image} 
              alt="Preview" 
              style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '12px', 
                objectFit: 'cover',
                border: '1px solid #cbd5e1',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
              }} 
            />
          </div>
        )}
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required min="0" />
      </div>

      <div className="form-group">
        <label>Price ($)</label>
        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" />
      </div>

      <button type="submit" className="btn-primary">Guardar</button>
      <button type="button" className="btn-secondary" onClick={closeForm}>Cancelar</button>
    </form>
  );
}

export default ProductForm;