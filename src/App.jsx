import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'; 
import { auth, db } from './firebase';
import Login from './components/Login';
import StockManager from './components/StockManager';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if(firebaseUser){
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email
        });
      } else{
        setUser(null);
      }
      setLoading(false);
    })

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setLoadingProducts(true);
      return; // Si no está logueado, no descarga nada
    }

    // Apuntamos a la colección llamada "productos" en Firebase
    const productosRef = collection(db, "productos");

    const unsubscribeSnapshot = onSnapshot(productosRef, (snapshot) => {
      const listaProductos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(listaProductos);
      setLoadingProducts(false);
    }, (error) => {
      console.error("Error en snapshot: ", error)
      setLoadingProducts(false);
    });

    return () => unsubscribeSnapshot();
  }, [user]);

  const addProduct = async (newProduct) => {
    try {
      await addDoc(collection(db, "productos"), {
        ...newProduct,
        createdAt: serverTimestamp() // Guarda la fecha y hora oficial del servidor
      });
    } catch (error) {
      console.error("Error al agregar producto: ", error);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      // Obtenemos la referencia exacta del documento por su ID
      const productoDoc = doc(db, "productos", updatedProduct.id);
      await updateDoc(productoDoc, {
        name: updatedProduct.name,
        category: updatedProduct.category,
        quantity: updatedProduct.quantity,
        price: updatedProduct.price,
        image: updatedProduct.image
      });
    } catch (error) {
      console.error("Error al actualizar producto: ", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const productoDoc = doc(db, "productos", id);
      await deleteDoc(productoDoc);
    } catch (error) {
      console.error("Error al eliminar producto: ", error);
      alert("No tienes permisos para eliminar productos.");
    }
  };

  const handleLogout = async () => {
    try{
      await signOut(auth);
    } catch(error){
      console.error("Error al cerrar sesion", error);
    }
  };

  if (loading) {
    return <div className="app-container"><p style={{color: '#64748b'}}>Cargando aplicación...</p></div>;
  }

  return (
    <div className="app-container">
      {!user ? (
        <Login />
      ) : (
        <StockManager 
          user={user} 
          products={products}
          loadingProducts={loadingProducts}
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