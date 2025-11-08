import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CompleteUploadForm from '../components/CompleteUploadForm';
import ManagePhotos from '../components/ManagePhotos';
import './SimpleAdmin.css';

function SimpleAdmin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    // Opzionale: passa automaticamente alla tab gestione
    // setActiveTab('manage');
  };

  return (
    <div className="simple-admin-page">
      {/* Header */}
      <header className="simple-admin-header">
        <div className="header-content">
          <div className="header-left">
            <h1>&gt;&gt; ADMIN PANEL</h1>
            <p>&gt; Ciao, {user?.username}</p>
          </div>
          <div className="header-actions">
            <button onClick={() => navigate('/')} className="btn-gallery">
              [ GALLERIA ]
            </button>
            <button onClick={handleLogout} className="btn-logout">
              [ LOGOUT ]
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="simple-admin-nav">
        <button
          className={`nav-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          [ CARICA FOTO ]
        </button>
        <button
          className={`nav-btn ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => setActiveTab('manage')}
        >
          [ GESTISCI FOTO ]
        </button>
      </nav>

      {/* Content */}
      <main className="simple-admin-content">
        {activeTab === 'upload' && (
          <div className="content-section">
            <h2>&gt; CARICA NUOVA ASTROFOTOGRAFIA</h2>
            <CompleteUploadForm onUploadSuccess={handleUploadSuccess} />
          </div>
        )}

        {activeTab === 'manage' && (
          <div className="content-section">
            <h2>&gt; LE TUE FOTO</h2>
            <ManagePhotos refreshTrigger={refreshTrigger} />
          </div>
        )}
      </main>
    </div>
  );
}

export default SimpleAdmin;

