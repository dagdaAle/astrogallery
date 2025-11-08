import { useState } from 'react';
import { uploadPhoto } from '../config/api';
import './SimpleUploadForm.css';

function SimpleUploadForm({ onUploadSuccess }) {
  const [formData, setFormData] = useState({
    // Info base
    title: '',
    description: '',
    
    // Dati oggetto astronomico
    object_name: '',
    object_type: '',
    constellation: '',
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File troppo grande. Massimo 10MB');
        return;
      }
      
      setImageFile(file);
      setError('');
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageFile) {
      setError('Seleziona un\'immagine');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', imageFile);
      
      // Aggiungi tutti i campi
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await uploadPhoto(formDataToSend);
      
      setSuccess(true);
      
      // Reset form
      setImageFile(null);
      setImagePreview(null);
      setFormData({
        title: '',
        description: '',
        object_name: '',
        object_type: '',
        constellation: '',
      });
      
      document.getElementById('image-input').value = '';
      
      if (onUploadSuccess) {
        onUploadSuccess();
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Errore durante upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="simple-upload-form">
      {error && (
        <div className="message error-msg">&gt; ERROR: {error}</div>
      )}
      
      {success && (
        <div className="message success-msg">&gt; SUCCESS: Foto caricata!</div>
      )}

      {/* Immagine */}
      <div className="form-section">
        <h3>[ IMMAGINE ]</h3>
        <div className="image-upload-area">
          <input
            type="file"
            id="image-input"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
            required
          />
          <label htmlFor="image-input" className="file-label">
            {imagePreview ? (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <span className="change-image">&gt; Click per cambiare</span>
              </div>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">[ + ]</div>
                <div>&gt; Seleziona immagine</div>
                <div className="upload-hint">Max 10MB - JPG, PNG</div>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Info Base */}
      <div className="form-section">
        <h3>[ INFORMAZIONI BASE ]</h3>
        <div className="form-group">
          <label>&gt; Titolo Foto *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="es: Nebulosa di Orione"
            required
          />
        </div>
        <div className="form-group">
          <label>&gt; Descrizione</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Breve descrizione della foto..."
            rows="3"
          />
        </div>
      </div>

      {/* Oggetto Astronomico */}
      <div className="form-section">
        <h3>[ OGGETTO FOTOGRAFATO ]</h3>
        <div className="form-group">
          <label>&gt; Nome Oggetto *</label>
          <input
            type="text"
            name="object_name"
            value={formData.object_name}
            onChange={handleChange}
            placeholder="es: M42, Nebulosa di Orione, Andromeda"
            required
          />
        </div>
        <div className="form-grid-2">
          <div className="form-group">
            <label>&gt; Tipo</label>
            <input
              type="text"
              name="object_type"
              value={formData.object_type}
              onChange={handleChange}
              placeholder="es: Nebulosa, Galassia, Ammasso"
            />
          </div>
          <div className="form-group">
            <label>&gt; Costellazione</label>
            <input
              type="text"
              name="constellation"
              value={formData.constellation}
              onChange={handleChange}
              placeholder="es: Orione, Andromeda, Cigno"
            />
          </div>
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? '[ CARICAMENTO... ]' : '[ CARICA FOTO ]'}
      </button>
    </form>
  );
}

export default SimpleUploadForm;

