import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ email });
    } else {
      alert('Por favor, rellena las credenciales');
    }
  };

  return (
    <div className="login-card">
      <div className="brand-icon">📦</div>
      <h2>BevStock Control</h2>
      <p className="brand-subtitle">Gestión inteligente de inventario para profesionales del sector.</p>
      <form onSubmit={handleSubmit}>
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