import { useState } from 'react';
import { createObject } from '../config/api';
import './CreateObjectForm.css';

function CreateObjectForm({ onObjectCreated }) {
  const [formData, setFormData] = useState({
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
    description: '',
    fact1: '',
    fact2: '',
    fact3: '',
    fact4: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Prepara facts array
      const facts = [
        formData.fact1,
        formData.fact2,
        formData.fact3,
        formData.fact4,
      ].filter(f => f.trim() !== '');

      const objectData = {
        catalog_id: formData.catalog_id,
        common_name: formData.common_name,
        object_type: formData.object_type,
        constellation: formData.constellation,
        right_ascension: formData.right_ascension,
        declination: formData.declination,
        distance: formData.distance,
        apparent_magnitude: formData.apparent_magnitude,
        angular_size: formData.angular_size,
        age: formData.age,
        mass: formData.mass,
        temperature: formData.temperature,
        composition: formData.composition,
        best_viewing_period: formData.best_viewing_period,
        visible_to_naked_eye: formData.visible_to_naked_eye,
        description: formData.description,
        facts: facts,
      };

      await createObject(objectData);
      
      setSuccess(true);
      
      // Reset form
      setFormData({
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
        description: '',
        fact1: '',
        fact2: '',
        fact3: '',
        fact4: '',
      });

      if (onObjectCreated) {
        onObjectCreated();
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Errore durante creazione oggetto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-object-form">
      {error && (
        <div className="message error-msg">
          &gt; ERROR: {error}
        </div>
      )}
      
      {success && (
        <div className="message success-msg">
          &gt; SUCCESS: Oggetto creato con successo!
        </div>
      )}

      {/* Identificazione */}
      <div className="form-section">
        <h3>[ IDENTIFICAZIONE ]</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>&gt; ID Catalogo *</label>
            <input
              type="text"
              name="catalog_id"
              value={formData.catalog_id}
              onChange={handleChange}
              placeholder="es: M42 / NGC 1976"
              required
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
            <label>&gt; Tipo Oggetto *</label>
            <input
              type="text"
              name="object_type"
              value={formData.object_type}
              onChange={handleChange}
              placeholder="es: Nebulosa a Emissione"
              required
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

      {/* Coordinate */}
      <div className="form-section">
        <h3>[ COORDINATE E POSIZIONE ]</h3>
        <div className="form-grid">
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
        <div className="form-grid">
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

          <div className="form-group">
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
        <div className="form-grid">
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

      {/* Descrizione */}
      <div className="form-section">
        <h3>[ DESCRIZIONE ]</h3>
        <div className="form-group">
          <label>&gt; Descrizione Generale *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descrizione dell'oggetto astronomico..."
            rows="4"
            required
          />
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
        {loading ? '[ CREATING... ]' : '[ CREA OGGETTO ]'}
      </button>
    </form>
  );
}

export default CreateObjectForm;

