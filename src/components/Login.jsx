import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try{
      await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
      console.error(error.code);

      if (error.code === 'auth/invalid-credential'){
        setErrorMsg('Correo o password incorrectos');
      } else {
        setErrorMsg('Ocurrio un error al intentar ingresar');
      }
    }
  };

  return (
    <div className="login-card">
      <div className="brand-icon">📦</div>
      <h2>BevStock Control</h2>
      <p className="brand-subtitle">Gestión inteligente de inventario para profesionales del sector.</p>
      <form onSubmit={handleSubmit}>
        {errorMsg && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '15px' }}>{errorMsg}</p>}
        
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="nombre@empresa.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••"
            required
          />
        </div>
        <button type="submit" className="btn-primary">Ingresar →</button>
      </form>
    </div>
  );
}

export default Login;