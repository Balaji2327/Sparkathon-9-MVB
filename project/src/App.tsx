import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LinkEditor from './components/LinkEditor';
import ProfilePreview from './components/ProfilePreview';
import QRCodeGenerator from './components/QRCodeGenerator';
import useLocalStorage from './hooks/useLocalStorage';
import { UserProfile } from './types';
import { generateId, generateShortCode } from './utils';

function App() {
  // Initialize with default profile data
  const defaultProfile: UserProfile = {
    name: '',
    bio: '',
    links: [],
    theme: 'light',
    accentColor: '#3B82F6',  // Default blue
    role: 'admin'  // Default role
  };
  
  // Use local storage to persist data
  const [profile, setProfile] = useLocalStorage<UserProfile>('linkhub-profile', defaultProfile);
  
  // Use local storage for the share URL to keep it consistent
  const [shareUrl, setShareUrl] = useState<string>('');
  
  // Update the document theme when user theme changes
  useEffect(() => {
    if (profile.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [profile.theme]);
  
  // Generate and store a consistent share URL
  useEffect(() => {
    const storedUrl = localStorage.getItem('linkhub-share-url');
    if (storedUrl) {
      setShareUrl(storedUrl);
    } else {
      const userId = generateId();
      const shortCode = generateShortCode();
      const newShareUrl = `${window.location.origin}/share/${userId}/${shortCode}`;
      localStorage.setItem('linkhub-share-url', newShareUrl);
      setShareUrl(newShareUrl);
    }
  }, []);
  
  // Toggle between light and dark theme
  const toggleTheme = () => {
    if (profile.role === 'viewer') return;
    
    setProfile({
      ...profile,
      theme: profile.theme === 'light' ? 'dark' : 'light'
    });
  };

  // Toggle between admin and viewer roles (for demo purposes)
  const toggleRole = () => {
    setProfile({
      ...profile,
      role: profile.role === 'admin' ? 'viewer' : 'admin'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col transition-colors">
      <Header 
        theme={profile.theme} 
        toggleTheme={toggleTheme} 
        role={profile.role}
        toggleRole={toggleRole}
      />
      
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Editor (only visible to admin) */}
            {profile.role === 'admin' && (
              <div className="space-y-6">
                <LinkEditor profile={profile} updateProfile={setProfile} />
                <QRCodeGenerator profile={profile} shareUrl={shareUrl} />
              </div>
            )}
            
            {/* Right Column - Preview (full width for viewers) */}
            <div className={`lg:sticky lg:top-8 h-fit space-y-4 ${profile.role === 'viewer' ? 'lg:col-span-2' : ''}`}>
              <div className="bg-gray-50 dark:bg-gray-950 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                {profile.role === 'admin' && (
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Preview
                  </h2>
                )}
                
                <div className={`p-4 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-lg
                  ${profile.role === 'viewer' ? 'max-w-2xl mx-auto' : ''}`}>
                  <ProfilePreview profile={profile} />
                </div>
              </div>
              
              {/* Show QR code for viewers */}
              {profile.role === 'viewer' && (
                <div className="max-w-2xl mx-auto">
                  <QRCodeGenerator profile={profile} shareUrl={shareUrl} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;