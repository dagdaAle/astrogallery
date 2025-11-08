import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UploadPhotoForm from '../components/UploadPhotoForm';
import CreateObjectForm from '../components/CreateObjectForm';
import { getAllObjects } from '../config/api';
import './Admin.css';

function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' o 'objects'
  const [astronomicalObjects, setAstronomicalObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadObjects();
  }, []);

  const loadObjects = async () => {
    try {
      const response = await getAllObjects();
      setAstronomicalObjects(response.data);
    } catch (error) {
      console.error('Errore caricamento oggetti:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleObjectCreated = () => {
    loadObjects();
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div>
            <h1>&gt;&gt; ADMIN PANEL</h1>
            <p className="admin-user">&gt; Utente: {user?.username}</p>
          </div>
          <div className="admin-actions">
            <button onClick={() => navigate('/')} className="btn-secondary">
              [ GALLERIA ]
            </button>
            <button onClick={handleLogout} className="btn-logout">
              [ LOGOUT ]
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="admin-nav">
        <button
          className={`nav-tab ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          [ CARICA FOTO ]
        </button>
        <button
          className={`nav-tab ${activeTab === 'objects' ? 'active' : ''}`}
          onClick={() => setActiveTab('objects')}
        >
          [ GESTISCI OGGETTI ]
        </button>
      </nav>

      {/* Content */}
      <main className="admin-content">
        {activeTab === 'upload' && (
          <div className="admin-section">
            <h2>&gt; CARICA NUOVA ASTROFOTOGRAFIA</h2>
            <UploadPhotoForm 
              astronomicalObjects={astronomicalObjects}
              onUploadSuccess={() => {
                // Opzionale: potresti mostrare un messaggio o reindirizzare
                console.log('Foto caricata con successo!');
              }}
            />
          </div>
        )}

        {activeTab === 'objects' && (
          <div className="admin-section">
            <h2>&gt; CREA NUOVO OGGETTO ASTRONOMICO</h2>
            <CreateObjectForm onObjectCreated={handleObjectCreated} />
            
            <div className="objects-list">
              <h3>&gt; OGGETTI ESISTENTI ({astronomicalObjects.length})</h3>
              {loading ? (
                <div className="loading">[ LOADING... ]</div>
              ) : (
                <div className="objects-grid">
                  {astronomicalObjects.map((obj) => (
                    <div key={obj.id} className="object-card">
                      <div className="object-id">{obj.catalog_id}</div>
                      <div className="object-name">{obj.common_name}</div>
                      <div className="object-type">{obj.object_type}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Admin;

