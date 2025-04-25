import React from 'react';
import { UserProfile } from '../types';
import { extractDomain } from '../utils';
import * as LucideIcons from 'lucide-react';

interface ProfilePreviewProps {
  profile: UserProfile;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ profile }) => {
  // Function to get icon component by name
  const getIconComponent = (iconName: string) => {
    // Default to Link icon if not found
    const IconComponent = (LucideIcons as Record<string, React.ComponentType<any>>)[iconName] || LucideIcons.Link;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm 
      border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header with avatar and profile info */}
      <div className="p-6 text-center" style={{ backgroundColor: `${profile.accentColor}20` }}>
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br"
             style={{ backgroundImage: `linear-gradient(135deg, ${profile.accentColor}40, ${profile.accentColor}90)` }}>
          <div className="w-full h-full flex items-center justify-center text-white font-bold text-2xl">
            {profile.name ? profile.name.charAt(0).toUpperCase() : '?'}
          </div>
        </div>
        
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {profile.name || 'Your Name'}
        </h1>
        
        {profile.bio && (
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {profile.bio}
          </p>
        )}
      </div>
      
      {/* Links */}
      <div className="p-6">
        {profile.links.length === 0 ? (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            Add links to see them appear here
          </div>
        ) : (
          <div className="space-y-3">
            {profile.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border border-gray-200 dark:border-gray-800 rounded-lg 
                  hover:border-gray-300 dark:hover:border-gray-700 group transition-all
                  hover:shadow-sm hover:translate-y-[-2px]"
                style={{ 
                  borderColor: link.url ? undefined : '#ff000030',
                  cursor: link.url ? 'pointer' : 'not-allowed',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: `${profile.accentColor}20`, color: profile.accentColor }}>
                    {getIconComponent(link.icon)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 
                      dark:group-hover:text-primary-400 transition-colors">
                      {link.title || 'Untitled Link'}
                    </h3>
                    {link.url && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {extractDomain(link.url)}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Made with LinkHub
        </p>
      </div>
    </div>
  );
};

export default ProfilePreview;