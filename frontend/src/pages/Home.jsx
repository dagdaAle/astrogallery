import { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import ImageDetail from '../components/ImageDetail';
import { getAllPhotos } from '../config/api';

function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Carica foto dal backend
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await getAllPhotos(100, 0);
        
        // Trasforma i dati dal backend nel formato che Gallery si aspetta
        const transformedPhotos = response.data.map(photo => ({
          id: photo.id,
          title: photo.title || photo.common_name || 'Senza titolo',
          image: photo.image_url,
          description: photo.description,
          // Dati dell'oggetto astronomico
          catalog_id: photo.catalog_id,
          common_name: photo.common_name,
          object_type: photo.object_type,
          constellation: photo.constellation,
          right_ascension: photo.right_ascension,
          declination: photo.declination,
          distance: photo.distance,
          apparent_magnitude: photo.apparent_magnitude,
          angular_size: photo.angular_size,
          age: photo.age,
          mass: photo.mass,
          temperature: photo.temperature,
          composition: photo.composition,
          best_viewing_period: photo.best_viewing_period,
          visible_to_naked_eye: photo.visible_to_naked_eye,
          facts: photo.facts || []
        }));
        
        setPhotos(transformedPhotos);
      } catch (err) {
        console.error('Errore caricamento foto:', err);
        setError('Impossibile caricare le foto');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseDetail = () => {
    setSelectedPhoto(null);
  };

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading-message">
          <h2>[ CARICAMENTO... ]</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="error-message">
          <h2>❌ {error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      {photos.length === 0 ? (
        <div className="empty-gallery">
          <h2>[ NESSUNA FOTO ANCORA ]</h2>
        </div>
      ) : (
        <Gallery photos={photos} onPhotoClick={handlePhotoClick} />
      )}
      
      {selectedPhoto && (
        <ImageDetail photo={selectedPhoto} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

export default Home;

