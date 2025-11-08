import './ImageDetail.css';

function ImageDetail({ photo, onClose }) {
  if (!photo) return null;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="detail-content">
          {/* Immagine a sinistra */}
          <div className="detail-image-section">
            <img src={photo.image} alt={photo.title} />
          </div>

          {/* Informazioni astronomiche a destra */}
          <div className="detail-info-section">
            {/* Header */}
            <div className="detail-header">
              <h1>{photo.common_name || photo.title}</h1>
              {photo.catalog_id && (
                <div className="catalog-id">{photo.catalog_id}</div>
              )}
              {photo.description && (
                <p className="detail-description">{photo.description}</p>
              )}
            </div>

            {/* Classificazione */}
            {(photo.object_type || photo.constellation) && (
              <div className="detail-section">
                <h2>[ CLASSIFICAZIONE ]</h2>
                <div className="info-grid">
                  {photo.object_type && (
                    <div className="info-item">
                      <label>&gt; Tipo Oggetto</label>
                      <p>{photo.object_type}</p>
                    </div>
                  )}
                  {photo.constellation && (
                    <div className="info-item">
                      <label>&gt; Costellazione</label>
                      <p>{photo.constellation}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Coordinate e Posizione */}
            {(photo.right_ascension || photo.declination || photo.distance || photo.angular_size) && (
              <div className="detail-section">
                <h2>[ POSIZIONE ]</h2>
                <div className="info-grid">
                  {photo.right_ascension && (
                    <div className="info-item">
                      <label>&gt; Ascensione Retta</label>
                      <p>{photo.right_ascension}</p>
                    </div>
                  )}
                  {photo.declination && (
                    <div className="info-item">
                      <label>&gt; Declinazione</label>
                      <p>{photo.declination}</p>
                    </div>
                  )}
                  {photo.distance && (
                    <div className="info-item">
                      <label>&gt; Distanza</label>
                      <p>{photo.distance}</p>
                    </div>
                  )}
                  {photo.angular_size && (
                    <div className="info-item">
                      <label>&gt; Dimensione Angolare</label>
                      <p>{photo.angular_size}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Caratteristiche Fisiche */}
            {(photo.age || photo.mass || photo.temperature || photo.apparent_magnitude) && (
              <div className="detail-section">
                <h2>[ CARATTERISTICHE FISICHE ]</h2>
                <div className="info-grid">
                  {photo.age && (
                    <div className="info-item">
                      <label>&gt; Età</label>
                      <p>{photo.age}</p>
                    </div>
                  )}
                  {photo.mass && (
                    <div className="info-item">
                      <label>&gt; Massa</label>
                      <p>{photo.mass}</p>
                    </div>
                  )}
                  {photo.temperature && (
                    <div className="info-item">
                      <label>&gt; Temperatura</label>
                      <p>{photo.temperature}</p>
                    </div>
                  )}
                  {photo.apparent_magnitude && (
                    <div className="info-item">
                      <label>&gt; Magnitudine Apparente</label>
                      <p>{photo.apparent_magnitude}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Composizione */}
            {photo.composition && (
              <div className="detail-section">
                <h2>[ COMPOSIZIONE ]</h2>
                <div className="info-item">
                  <p className="composition">{photo.composition}</p>
                </div>
              </div>
            )}

            {/* Osservazione */}
            {(photo.best_viewing_period || photo.visible_to_naked_eye !== undefined) && (
              <div className="detail-section">
                <h2>[ OSSERVAZIONE ]</h2>
                <div className="info-grid">
                  {photo.best_viewing_period && (
                    <div className="info-item">
                      <label>&gt; Periodo Migliore</label>
                      <p>{photo.best_viewing_period}</p>
                    </div>
                  )}
                  {photo.visible_to_naked_eye !== undefined && (
                    <div className="info-item">
                      <label>&gt; Visibile ad Occhio Nudo</label>
                      <p>{photo.visible_to_naked_eye ? 'Sì' : 'No'}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Curiosità */}
            {photo.facts && photo.facts.length > 0 && (
              <div className="detail-section">
                <h2>[ CURIOSITÀ ]</h2>
                <ul className="facts-list">
                  {photo.facts.map((fact, index) => (
                    <li key={index}>&gt; {fact}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageDetail;
