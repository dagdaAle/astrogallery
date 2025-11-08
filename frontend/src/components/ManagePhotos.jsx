import { useState, useEffect } from 'react';
import { getAllPhotos, deletePhoto } from '../config/api';
import EditPhotoModal from './EditPhotoModal';
import './ManagePhotos.css';

function ManagePhotos({ refreshTrigger }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPhotos();
  }, [refreshTrigger]);

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const response = await getAllPhotos();
      setPhotos(response.data);
    } catch (err) {
      setError('Errore caricamento foto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (photoId) => {
    if (!confirm('Sei sicuro di voler eliminare questa foto?')) {
      return;
    }

    try {
      await deletePhoto(photoId);
      setPhotos(photos.filter(p => p.id !== photoId));
    } catch (err) {
      alert('Errore durante eliminazione: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleEdit = (photo) => {
    setEditingPhoto(photo);
  };

  const handleEditSuccess = () => {
    setEditingPhoto(null);
    loadPhotos();
  };

  if (loading) {
    return <div className="loading">[ CARICAMENTO... ]</div>;
  }

  if (error) {
    return <div className="error-message">&gt; ERROR: {error}</div>;
  }

  if (photos.length === 0) {
    return (
      <div className="no-photos">
        <p>&gt; Nessuna foto caricata ancora.</p>
        <p>Vai su "Carica Foto" per caricare la tua prima astrofotografia!</p>
      </div>
    );
  }

  return (
    <div className="manage-photos">
      <div className="photos-count">
        &gt; Totale foto: {photos.length}
      </div>

      <div className="photos-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <div className="photo-image">
              <img src={photo.image_url} alt={photo.title || 'Foto'} />
            </div>
            
            <div className="photo-info">
              <h4>{photo.title || 'Senza titolo'}</h4>
              <div className="photo-meta">
                <span>&gt; {photo.object_name || 'N/A'}</span>
                {photo.object_type && <span>{photo.object_type}</span>}
                {photo.constellation && <span>{photo.constellation}</span>}
              </div>
              {photo.description && (
                <div className="photo-description">
                  {photo.description}
                </div>
              )}
            </div>

            <div className="photo-actions">
              <button 
                onClick={() => handleEdit(photo)}
                className="btn-edit"
              >
                [ MODIFICA ]
              </button>
              <button 
                onClick={() => handleDelete(photo.id)}
                className="btn-delete"
              >
                [ ELIMINA ]
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPhoto && (
        <EditPhotoModal
          photo={editingPhoto}
          onClose={() => setEditingPhoto(null)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}

export default ManagePhotos;

