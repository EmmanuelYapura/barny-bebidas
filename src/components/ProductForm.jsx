import React, { useState, useEffect } from 'react';

// 1. Diccionario de productos basado en tu Excel con sus rutas de imágenes locales
const PRODUCTOS_POR_CATEGORIA = {
  Cervezas: [
    { name: 'Cerveza Salta Negra 1L', image: '/bebidas/salta-negra.webp' },
    { name: 'Cerveza Salta Rubia 1.2L', image: '/bebidas/salta-rubia.webp' },
    { name: 'Cerveza Heineken 1L', image: '/bebidas/heineken.png' },
    { name: 'Cerveza Stella 1L', image: '/bebidas/stella.png' },
    { name: 'Cerveza Corona 710', image: '/bebidas/corona.webp' },
    { name: 'Cerveza Imperial Rubia 1L', image: '/bebidas/imperial-rubia.jpg' },
    { name: 'Cerveza Imperial Negra 1L', image: '/bebidas/imperial-negra.jpg' },
    { name: 'Cerveza Salta 1.2L Cajon', image: '/bebidas/cajon-salta.webp' },
  ],
  Latones: [
    { name: 'Laton Schneider 710', image: '/bebidas/schneider-laton.webp' },
    { name: 'Laton Heineken 710', image: '/bebidas/heineken-laton.webp' },
    { name: 'Laton Budweiser 710', image: '/bebidas/budweiser-laton.webp' },
    { name: 'Laton Stella Dorada 710', image: '/bebidas/stella-laton.webp' },
    { name: 'Schneider 6u Laton 710ML', image: '/bebidas/scheneider-pack.png' }
  ],
  Latas: [
    { name: 'Lata Salta Rubia 473', image: '/bebidas/salta-lata.jpg' },
    { name: 'Lata Salta Negra 473', image: '/bebidas/saltan-lata.jpg' },
    { name: 'Lata Smirnoff 473', image: '/bebidas/lata-smirnoff.webp' },
    { name: 'Lata Dr Lemon 473', image: '/bebidas/lata-drlemon.webp' },
    { name: 'Lata Brahma 473', image: '/bebidas/brahma-lata.jpg' },
    { name: 'Salta 6u Lata 473ML', image: '/bebidas/salta-rubia-pack.webp' },
    { name: 'Salta Negra 6u Lata 473ML', image: '/bebidas/salta-negra-pack.jpg' },
    { name: 'Brahma 6u Lata 473ML', image: '/bebidas/brahma-pack.jpg' },
  ],
  Fernet: [
    { name: 'Fercho Fernet-Cola 1L', image: '/bebidas/fercho.webp' },
    { name: 'Fernet Vittone 750ml', image: '/bebidas/vitone.png' },
    { name: 'Fernet 1882 750ml', image: '/bebidas/fernet1882.jpg' },
    { name: 'Fernet Branca 750ml', image: '/bebidas/branca.jpg' },
  ],
  Damajuanas: [
    { name: 'Damajuana Domingo Hermano Roble', image: '/bebidas/droble.jpg' },
    { name: 'Damajuana Domingo Hermano Malbec', image: '/bebidas/dmalbec.jpg' },
    { name: 'Damajuana Domingo Hermano Vino Tinto', image: '/bebidas/dtinto.jpg' },
    { name: 'Damajuana Duret', image: '/bebidas/dduret.jpg' },
  ],
  Vinos: [
    { name: 'Vino Toro Tinto', image: '/bebidas/toro-tinto.jpg' },
    { name: 'Vino Toro Blanco', image: '/bebidas/toro-blanco.jpg' },
    { name: 'Vino Animana Blanco', image: '/bebidas/animana.jpg' },
    { name: 'Vino Balbo', image: '/bebidas/balbo.jpg' },
    { name: 'Toro Viejo Tinto Botella', image: '/bebidas/toro-viejo.jpg' },
    { name: 'Viña de Alvear Tinto', image: '/bebidas/alvear.jpg' },
    { name: 'Vino Michel Torino Tinto 1.125L', image: '/bebidas/mtorino.jpg' },
    { name: 'Vino Parrales Tinto', image: '/bebidas/vino-parrales.jpg' },
    { name: 'Vino Parrales Blanco', image: '/bebidas/parrales-blanco.jpg' },
    { name: 'Vino Parnaso', image: '/bebidas/parnaso.jpg' },
    { name: 'Vino Toro Tinto Fardo', image: '/bebidas/toro-fardo.jpg' },
    { name: 'Vino Parral Tinto Blanco Fardo', image: '/bebidas/torob-fardo.jpg' },
  ],
  Whiskys: [
    { name: 'Whisky Blenders 1L', image: '/bebidas/whisky-blenders.jpg' },
    { name: 'Petaca Whisky Blenders 200ml', image: '/bebidas/petaca-whiskyb.jpg' },
    { name: 'Whisky Gloucester Fire', image: '/bebidas/whisky-fire.jpg' },
    { name: 'Whisky Gloucester Blended', image: '/bebidas/whisky-b.jpg' },
  ],
  Vodkas: [
    { name: 'Vodka Sernova', image: '/bebidas/sernova.png' },
    { name: 'Vodka Skyy', image: '/bebidas/skyy.webp' },
    { name: 'Vodka Skyy Cosmic', image: '/bebidas/skyy-cosmic.webp' },
    { name: 'Vodka Smirnoff', image: '/bebidas/smirnoff.jpg' },
    { name: 'Vodka New Style 1L', image: '/bebidas/newstyle.jpg' },
    { name: 'Vodka New Style Evolution 1L', image: '/bebidas/newstyleevolution.jpg' },
    { name: 'Dr Lemon 1L', image: '/bebidas/drlemonbotella.jpg' },
  ],
  Otros: [
    { name: 'Frizze 1L', image: '/bebidas/frizze.jpg' },
    { name: 'Frizze Limonata 1L', image: '/bebidas/frizzelimonata.jpg' },
    { name: 'Gancia 1.250L', image: '/bebidas/gancia.jpg' },
    { name: 'New Style Gin 1L', image: '/bebidas/newstylegin.jpg' },
    { name: 'New Style Ron 1L', image: '/bebidas/newstyleron.jpg' },
    { name: 'Petaca 3 Plumas Cafe Coñac', image: '/bebidas/petaca3plumas.jpg' },
    { name: 'Tres Pluma Cafe al coñac 750ml', image: '/bebidas/cafecoñac.jpg' },
    { name: 'Cuernavaca tekila', image: '/bebidas/tequila.jpg' },
  ],
};

function ProductForm({ onAdd, onUpdate, editingProduct, closeForm }) {
  const [category, setCategory] = useState('Cervezas');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  // 2. UNICO EFFECT: Carga inicial de datos SOLO cuando se va a EDITAR un producto existente
  useEffect(() => {
    if (editingProduct) {
      setCategory(editingProduct.category);
      setName(editingProduct.name);
      setQuantity(editingProduct.quantity);
      setPrice(editingProduct.price);
      setImage(editingProduct.image);
    } else {
      // Si es una creación limpia, tomamos el primer elemento de 'Cervezas' por defecto
      const defecto = PRODUCTOS_POR_CATEGORIA['Cervezas'][0];
      setCategory('Cervezas');
      setName(defecto.name);
      setImage(defecto.image);
      setQuantity('');
      setPrice('');
    }
  }, [editingProduct]);

  // 3. FUNCIÓN CORRECTORA: Cambia la categoría, el nombre y la foto al mismo tiempo sin esperar al renderizado
  const handleCategoryChange = (e) => {
    const nuevaCategoria = e.target.value;
    setCategory(nuevaCategoria);

    const productosDeNuevaCategoria = PRODUCTOS_POR_CATEGORIA[nuevaCategoria];
    if (productosDeNuevaCategoria && productosDeNuevaCategoria.length > 0) {
      setName(productosDeNuevaCategoria[0].name);
      setImage(productosDeNuevaCategoria[0].image);
    }
  };

  // 4. Al cambiar el producto específico, actualizamos su foto correspondiente
  const handleProductChange = (e) => {
    const seleccionado = e.target.value;
    setName(seleccionado);
    
    const productoEncontrado = PRODUCTOS_POR_CATEGORIA[category].find(p => p.name === seleccionado);
    if (productoEncontrado) {
      setImage(productoEncontrado.image);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      name,
      category,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      image
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
      {/* SELECT 1: CATEGORÍA */}
      <div className="form-group">
        <label>Categoria</label>
        <select value={category} onChange={handleCategoryChange}>
          <option value="Cervezas">Cervezas</option>
          <option value="Latones">Latones</option>
          <option value="Latas">Latas</option>
          <option value="Fernet">Fernet</option>
          <option value="Damajuanas">Damajuanas</option>
          <option value="Vinos">Vinos</option>
          <option value="Whiskys">Whiskys</option>
          <option value="Vodkas">Vodkas</option>
          <option value="Otros">Otros</option>
        </select>
      </div>

      {/* SELECT 2: PRODUCTO DEPENDIENTE */}
      <div className="form-group">
        <label>Nombre bebida</label>
        <select value={name} onChange={handleProductChange}>
          {PRODUCTOS_POR_CATEGORIA[category]?.map((prod, index) => (
            <option key={index} value={prod.name}>
              {prod.name}
            </option>
          ))}
        </select>
      </div>

      {/* VISTA PREVIA AUTOMÁTICA DEL DISEÑO */}
      <div className="form-group">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>Imagen</span>
          <img 
            src={image} 
            alt="Preview" 
            style={{ 
              width: '90px', 
              height: '90px', 
              borderRadius: '12px', 
              objectFit: 'contain',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              padding: '5px'
            }} 
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=200&q=80";
            }}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Cantidad</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required min="0" />
      </div>

      <div className="form-group">
        <label>Precio ($)</label>
        <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" />
      </div>

      <button type="submit" className="btn-primary">Guardar</button>
      <button type="button" className="btn-secondary" onClick={closeForm}>Cancelar</button>
    </form>
  );
}

export default ProductForm;