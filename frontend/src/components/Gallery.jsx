import './Gallery.css';

function Gallery({ photos, onPhotoClick }) {
  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h1>AstroGallery</h1>
        <p>La mia collezione di astrofotografie</p>
      </header>
      
      <div className="masonry-grid">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="masonry-item"
            onClick={() => onPhotoClick(photo)}
          >
            <img 
              src={photo.image} 
              alt={photo.title}
              loading="lazy"
            />
            <div className="masonry-item-overlay">
              <h3>{photo.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;

