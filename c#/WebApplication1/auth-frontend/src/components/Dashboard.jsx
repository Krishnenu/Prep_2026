import { useState, useEffect } from 'react';
import authService from '../services/authService';

function Dashboard({ onLogout }) {
    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);

        // Fetch profile from protected endpoint
        const fetchProfile = async () => {
            try {
                const data = await authService.getProfile();
                setProfileData(data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        authService.logout();
        onLogout();
    };

    if (loading) {
        return (
            <div className="dashboard">
                <div className="dashboard-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span className="spinner"></span>
                        <span>Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Welcome, {user?.username}! 👋</h1>
                <p className="dashboard-subtitle">You're successfully logged in</p>
            </div>

            <div className="dashboard-content">
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: 'var(--text-primary)' }}>
                    Your Profile
                </h2>

                <div className="user-info">
                    <div className="info-item">
                        <span className="info-label">Username:</span>
                        <span className="info-value">{user?.username}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{user?.email}</span>
                    </div>
                    {profileData && (
                        <div className="info-item">
                            <span className="info-label">Status:</span>
                            <span className="info-value" style={{ color: 'var(--success)' }}>
                                ✓ {profileData.message}
                            </span>
                        </div>
                    )}
                </div>

                <div className="dashboard-actions">
                    <button className="btn btn-primary" onClick={handleLogout}>
                        Sign Out
                    </button>
                    <button className="btn btn-secondary">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
