import { useState } from 'react';
import { uploadPhoto, getAstronomicalData } from '../config/api';
import './SimpleUploadForm.css';

function CompleteUploadForm({ onUploadSuccess }) {
  const [formData, setFormData] = useState({
    // Info base
    title: '',
    description: '',
    
    // Oggetto astronomico
    catalog_id: '',
    common_name: '',
    object_type: '',
    constellation: '',
    
    // Coordinate
    right_ascension: '',
    declination: '',
    
    // Caratteristiche
    distance: '',
    apparent_magnitude: '',
    angular_size: '',
    age: '',
    mass: '',
    temperature: '',
    composition: '',
    
    // Osservazione
    best_viewing_period: '',
    visible_to_naked_eye: false,
    
    // Curiosità (4 campi)
    fact1: '',
    fact2: '',
    fact3: '',
    fact4: '',
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
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

  const handleAutoFill = async () => {
    if (!formData.common_name || formData.common_name.trim() === '') {
      setError('Inserisci prima il nome dell\'oggetto astronomico');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setAiLoading(true);
    setError('');

    try {
      const response = await getAstronomicalData(formData.common_name);
      const aiData = response.data.data;

      // Compila i campi con i dati ricevuti (inclusi title e description!)
      setFormData(prev => ({
        ...prev,
        title: aiData.title || prev.title,
        description: aiData.description || prev.description,
        catalog_id: aiData.catalog_id || prev.catalog_id,
        common_name: aiData.common_name || prev.common_name,
        object_type: aiData.object_type || prev.object_type,
        constellation: aiData.constellation || prev.constellation,
        right_ascension: aiData.right_ascension || prev.right_ascension,
        declination: aiData.declination || prev.declination,
        distance: aiData.distance || prev.distance,
        apparent_magnitude: aiData.apparent_magnitude || prev.apparent_magnitude,
        angular_size: aiData.angular_size || prev.angular_size,
        age: aiData.age || prev.age,
        mass: aiData.mass || prev.mass,
        temperature: aiData.temperature || prev.temperature,
        composition: aiData.composition || prev.composition,
        best_viewing_period: aiData.best_viewing_period || prev.best_viewing_period,
        visible_to_naked_eye: aiData.visible_to_naked_eye || prev.visible_to_naked_eye,
        fact1: aiData.facts?.[0] || prev.fact1,
        fact2: aiData.facts?.[1] || prev.fact2,
        fact3: aiData.facts?.[2] || prev.fact3,
        fact4: aiData.facts?.[3] || prev.fact4,
      }));

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Errore durante auto-compilazione');
      setTimeout(() => setError(''), 5000);
    } finally {
      setAiLoading(false);
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
      
      // Aggiungi tutti i campi base
      Object.keys(formData).forEach(key => {
        if (key.startsWith('fact')) return; // Skip facts
        if (formData[key] !== '' && formData[key] !== false) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Aggiungi facts come array JSON
      const facts = [
        formData.fact1,
        formData.fact2,
        formData.fact3,
        formData.fact4,
      ].filter(f => f.trim() !== '');
      
      if (facts.length > 0) {
        formDataToSend.append('facts', JSON.stringify(facts));
      }

      await uploadPhoto(formDataToSend);
      
      setSuccess(true);
      
      // Reset form
      setImageFile(null);
      setImagePreview(null);
      setFormData({
        title: '',
        description: '',
        catalog_id: '',
        common_name: '',
        object_type: '',
        constellation: '',
        right_ascension: '',
        declination: '',
        distance: '',
        apparent_magnitude: '',
        angular_size: '',
        age: '',
        mass: '',
        temperature: '',
        composition: '',
        best_viewing_period: '',
        visible_to_naked_eye: false,
        fact1: '',
        fact2: '',
        fact3: '',
        fact4: '',
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
      {/* Bottone AI in alto */}
      <div className="ai-autofill-section">
        <button 
          type="button" 
          onClick={handleAutoFill} 
          className="ai-autofill-btn"
          disabled={aiLoading || !formData.common_name}
        >
          {aiLoading ? (
            <>
              <span className="ai-spinner">⟳</span>
              [ AI ELABORAZIONE... ]
            </>
          ) : (
            <>
              <span className="ai-icon">✨</span>
              [ AUTO-COMPILA CON AI ]
            </>
          )}
        </button>
        <p className="ai-hint">
          &gt; Inserisci il nome dell'oggetto e clicca per compilare automaticamente tutti i campi
        </p>
      </div>

      {error && (
        <div className="message error-msg">&gt; ERROR: {error}</div>
      )}
      
      {success && (
        <div className="message success-msg">&gt; SUCCESS: Dati compilati con AI!</div>
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
            placeholder="Descrizione generale dell'oggetto..."
            rows="3"
          />
        </div>
      </div>

      {/* Identificazione Oggetto */}
      <div className="form-section">
        <h3>[ IDENTIFICAZIONE OGGETTO ]</h3>
        <div className="form-grid-2">
          <div className="form-group">
            <label>&gt; ID Catalogo</label>
            <input
              type="text"
              name="catalog_id"
              value={formData.catalog_id}
              onChange={handleChange}
              placeholder="es: M42, NGC 1976"
            />
          </div>
          <div className="form-group">
            <label>&gt; Nome Comune *</label>
            <input
              type="text"
              name="common_name"
              value={formData.common_name}
              onChange={handleChange}
              placeholder="es: Nebulosa di Orione"
              required
            />
          </div>
          <div className="form-group">
            <label>&gt; Tipo Oggetto</label>
            <input
              type="text"
              name="object_type"
              value={formData.object_type}
              onChange={handleChange}
              placeholder="es: Nebulosa a Emissione"
            />
          </div>
          <div className="form-group">
            <label>&gt; Costellazione</label>
            <input
              type="text"
              name="constellation"
              value={formData.constellation}
              onChange={handleChange}
              placeholder="es: Orione"
            />
          </div>
        </div>
      </div>

      {/* Coordinate e Posizione */}
      <div className="form-section">
        <h3>[ COORDINATE E POSIZIONE ]</h3>
        <div className="form-grid-2">
          <div className="form-group">
            <label>&gt; Ascensione Retta</label>
            <input
              type="text"
              name="right_ascension"
              value={formData.right_ascension}
              onChange={handleChange}
              placeholder="es: 05h 35m 17.3s"
            />
          </div>
          <div className="form-group">
            <label>&gt; Declinazione</label>
            <input
              type="text"
              name="declination"
              value={formData.declination}
              onChange={handleChange}
              placeholder="es: -05° 23' 28''"
            />
          </div>
          <div className="form-group">
            <label>&gt; Distanza</label>
            <input
              type="text"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              placeholder="es: 1.344 anni luce"
            />
          </div>
          <div className="form-group">
            <label>&gt; Dimensione Angolare</label>
            <input
              type="text"
              name="angular_size"
              value={formData.angular_size}
              onChange={handleChange}
              placeholder="es: 65' × 60'"
            />
          </div>
          <div className="form-group">
            <label>&gt; Magnitudine Apparente</label>
            <input
              type="text"
              name="apparent_magnitude"
              value={formData.apparent_magnitude}
              onChange={handleChange}
              placeholder="es: 4.0"
            />
          </div>
        </div>
      </div>

      {/* Caratteristiche Fisiche */}
      <div className="form-section">
        <h3>[ CARATTERISTICHE FISICHE ]</h3>
        <div className="form-grid-2">
          <div className="form-group">
            <label>&gt; Età</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="es: ~3 milioni di anni"
            />
          </div>
          <div className="form-group">
            <label>&gt; Massa</label>
            <input
              type="text"
              name="mass"
              value={formData.mass}
              onChange={handleChange}
              placeholder="es: ~2.000 masse solari"
            />
          </div>
          <div className="form-group full-width">
            <label>&gt; Temperatura</label>
            <input
              type="text"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              placeholder="es: ~10.000 K"
            />
          </div>
        </div>
        <div className="form-group">
          <label>&gt; Composizione</label>
          <textarea
            name="composition"
            value={formData.composition}
            onChange={handleChange}
            placeholder="es: Idrogeno (90%), Elio (10%), tracce di C, N, O"
            rows="2"
          />
        </div>
      </div>

      {/* Osservazione */}
      <div className="form-section">
        <h3>[ OSSERVAZIONE ]</h3>
        <div className="form-grid-2">
          <div className="form-group">
            <label>&gt; Periodo Migliore</label>
            <input
              type="text"
              name="best_viewing_period"
              value={formData.best_viewing_period}
              onChange={handleChange}
              placeholder="es: Dicembre - Marzo"
            />
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="visible_to_naked_eye"
                checked={formData.visible_to_naked_eye}
                onChange={handleChange}
              />
              <span>&gt; Visibile ad occhio nudo</span>
            </label>
          </div>
        </div>
      </div>

      {/* Curiosità */}
      <div className="form-section">
        <h3>[ CURIOSITÀ ]</h3>
        <div className="form-group">
          <label>&gt; Curiosità 1</label>
          <input
            type="text"
            name="fact1"
            value={formData.fact1}
            onChange={handleChange}
            placeholder="Prima curiosità interessante"
          />
        </div>
        <div className="form-group">
          <label>&gt; Curiosità 2</label>
          <input
            type="text"
            name="fact2"
            value={formData.fact2}
            onChange={handleChange}
            placeholder="Seconda curiosità"
          />
        </div>
        <div className="form-group">
          <label>&gt; Curiosità 3</label>
          <input
            type="text"
            name="fact3"
            value={formData.fact3}
            onChange={handleChange}
            placeholder="Terza curiosità"
          />
        </div>
        <div className="form-group">
          <label>&gt; Curiosità 4</label>
          <input
            type="text"
            name="fact4"
            value={formData.fact4}
            onChange={handleChange}
            placeholder="Quarta curiosità"
          />
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? '[ CARICAMENTO... ]' : '[ CARICA FOTO ]'}
      </button>
    </form>
  );
}

export default CompleteUploadForm;

