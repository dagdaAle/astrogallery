import { useState } from 'react';
import './EditPhotoModal.css';

function EditPhotoModal({ photo, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: photo.title || '',
    description: photo.description || '',
    object_name: photo.object_name || '',
    object_type: photo.object_type || '',
    constellation: photo.constellation || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Implementare API per update foto
      // await updatePhoto(photo.id, formData);
      
      alert('Funzionalità di modifica in arrivo! Per ora puoi solo cancellare.');
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Errore durante modifica');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>&gt;&gt; MODIFICA FOTO</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          <div className="modal-image">
            <img src={photo.image_url} alt={photo.title} />
          </div>

          <form onSubmit={handleSubmit} className="edit-form">
            {error && (
              <div className="error-msg">&gt; ERROR: {error}</div>
            )}

            <div className="form-group">
              <label>&gt; Titolo</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>&gt; Descrizione</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>&gt; Nome Oggetto</label>
              <input
                type="text"
                name="object_name"
                value={formData.object_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>&gt; Tipo</label>
                <input
                  type="text"
                  name="object_type"
                  value={formData.object_type}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>&gt; Costellazione</label>
                <input
                  type="text"
                  name="constellation"
                  value={formData.constellation}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" onClick={onClose} className="btn-cancel">
                [ ANNULLA ]
              </button>
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? '[ SALVATAGGIO... ]' : '[ SALVA ]'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPhotoModal;

