import { useState } from 'react';
import { uploadPhoto } from '../config/api';
import './UploadPhotoForm.css';

function UploadPhotoForm({ astronomicalObjects, onUploadSuccess }) {
  const [formData, setFormData] = useState({
    object_id: '',
    telescope: '',
    camera: '',
    exposure: '',
    filters: '',
    capture_date: '',
    location: '',
    bortle_scale: '',
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
      
      // Preview
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
      
      // Aggiungi tutti i campi del form
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await uploadPhoto(formDataToSend);
      
      setSuccess(true);
      setImageFile(null);
      setImagePreview(null);
      setFormData({
        object_id: '',
        telescope: '',
        camera: '',
        exposure: '',
        filters: '',
        capture_date: '',
        location: '',
        bortle_scale: '',
      });
      
      // Reset file input
      document.getElementById('image-input').value = '';
      
      if (onUploadSuccess) {
        onUploadSuccess();
      }

      // Nascondi messaggio successo dopo 3 secondi
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Errore durante upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      {error && (
        <div className="message error-msg">
          &gt; ERROR: {error}
        </div>
      )}
      
      {success && (
        <div className="message success-msg">
          &gt; SUCCESS: Foto caricata con successo!
        </div>
      )}

      {/* Image Upload */}
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
                <div>&gt; Click per selezionare immagine</div>
                <div className="upload-hint">Max 10MB - JPG, PNG</div>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Oggetto Astronomico */}
      <div className="form-section">
        <h3>[ OGGETTO ASTRONOMICO ]</h3>
        
        <div className="form-group">
          <label>&gt; Seleziona Oggetto</label>
          <select
            name="object_id"
            value={formData.object_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Seleziona un oggetto --</option>
            {astronomicalObjects.map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.catalog_id} - {obj.common_name}
              </option>
            ))}
          </select>
          <p className="field-hint">
            Non trovi l'oggetto? Vai su "Gestisci Oggetti" per crearne uno nuovo
          </p>
        </div>
      </div>

      {/* Dati Tecnici Ripresa */}
      <div className="form-section">
        <h3>[ DATI TECNICI RIPRESA ]</h3>
        
        <div className="form-grid">
          <div className="form-group">
            <label>&gt; Telescopio</label>
            <input
              type="text"
              name="telescope"
              value={formData.telescope}
              onChange={handleChange}
              placeholder="es: Celestron NexStar 8SE"
              required
            />
          </div>

          <div className="form-group">
            <label>&gt; Camera</label>
            <input
              type="text"
              name="camera"
              value={formData.camera}
              onChange={handleChange}
              placeholder="es: ZWO ASI294MC Pro"
              required
            />
          </div>

          <div className="form-group">
            <label>&gt; Esposizione</label>
            <input
              type="text"
              name="exposure"
              value={formData.exposure}
              onChange={handleChange}
              placeholder="es: 20 x 180s"
              required
            />
          </div>

          <div className="form-group">
            <label>&gt; Filtri</label>
            <input
              type="text"
              name="filters"
              value={formData.filters}
              onChange={handleChange}
              placeholder="es: L-eXtreme, Nessuno"
              required
            />
          </div>

          <div className="form-group">
            <label>&gt; Data Ripresa</label>
            <input
              type="date"
              name="capture_date"
              value={formData.capture_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>&gt; Località</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="es: Monte Baldo"
              required
            />
          </div>

          <div className="form-group">
            <label>&gt; Scala Bortle</label>
            <select
              name="bortle_scale"
              value={formData.bortle_scale}
              onChange={handleChange}
              required
            >
              <option value="">-- Seleziona --</option>
              <option value="Classe 1">Classe 1 - Cielo eccellente</option>
              <option value="Classe 2">Classe 2 - Cielo veramente buio</option>
              <option value="Classe 3">Classe 3 - Cielo rurale</option>
              <option value="Classe 4">Classe 4 - Transizione rurale/suburbano</option>
              <option value="Classe 5">Classe 5 - Cielo suburbano</option>
              <option value="Classe 6">Classe 6 - Cielo suburbano luminoso</option>
              <option value="Classe 7">Classe 7 - Transizione suburbano/urbano</option>
              <option value="Classe 8">Classe 8 - Cielo urbano</option>
              <option value="Classe 9">Classe 9 - Cielo centro città</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? '[ UPLOADING... ]' : '[ CARICA FOTO ]'}
      </button>
    </form>
  );
}

export default UploadPhotoForm;

