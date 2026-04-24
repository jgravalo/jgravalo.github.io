import React, { useState } from 'react';
import './loadProduct.css';

export default function LoadProduct() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      imagen: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    const formDataToSend = new FormData();
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('descripcion', formData.descripcion);
    formDataToSend.append('precio', formData.precio);
    if (formData.imagen) {
      formDataToSend.append('imagen', formData.imagen);
    }
    fetch('/api/products/create/', {
      method: 'POST',
      body: formDataToSend
    })
      .then(res => res.json())
      .then(data => {
        console.log('Producto creado:', data);
        // setFormData({ nombre: '', descripcion: '', precio: '', imagen: null });
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="container-form">
      <form onSubmit={handleSubmit} className="form-product">
        <h2>Cargar Producto</h2>
        
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className="btn-submit">Guardar Producto</button>
      </form>
    </div>
  );
}