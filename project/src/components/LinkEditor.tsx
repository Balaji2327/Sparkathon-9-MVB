import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import LinkItem from './LinkItem';
import { LinkItem as LinkItemType, UserProfile } from '../types';
import { generateId } from '../utils';

interface LinkEditorProps {
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
}

const LinkEditor: React.FC<LinkEditorProps> = ({ profile, updateProfile }) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // Add a new link
  const addLink = () => {
    const newLink: LinkItemType = {
      id: generateId(),
      title: 'New Link',
      url: '',
      icon: 'Link'
    };
    
    updateProfile({
      ...profile,
      links: [...profile.links, newLink]
    });
  };

  // Update a specific field of a link
  const updateLink = (id: string, field: keyof LinkItemType, value: string) => {
    const updatedLinks = profile.links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    );
    
    updateProfile({
      ...profile,
      links: updatedLinks
    });
  };

  // Remove a link
  const removeLink = (id: string) => {
    const updatedLinks = profile.links.filter(link => link.id !== id);
    
    updateProfile({
      ...profile,
      links: updatedLinks
    });
  };

  // Move a link up or down
  const moveLink = (id: string, direction: 'up' | 'down') => {
    const linkIndex = profile.links.findIndex(link => link.id === id);
    if (linkIndex === -1) return;
    
    const newLinks = [...profile.links];
    const newIndex = direction === 'up' ? linkIndex - 1 : linkIndex + 1;
    
    if (newIndex < 0 || newIndex >= newLinks.length) return;
    
    // Swap the links
    [newLinks[linkIndex], newLinks[newIndex]] = [newLinks[newIndex], newLinks[linkIndex]];
    
    updateProfile({
      ...profile,
      links: newLinks
    });
  };

  // Handle drag start
  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === id) return;
    
    const draggedIndex = profile.links.findIndex(link => link.id === draggedItem);
    const hoverIndex = profile.links.findIndex(link => link.id === id);
    
    if (draggedIndex === hoverIndex) return;
    
    // Reorder the links
    const newLinks = [...profile.links];
    const draggedLink = newLinks[draggedIndex];
    newLinks.splice(draggedIndex, 1);
    newLinks.splice(hoverIndex, 0, draggedLink);
    
    updateProfile({
      ...profile,
      links: newLinks
    });
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          value={profile.name}
          onChange={(e) => updateProfile({ ...profile, name: e.target.value })}
          placeholder="John Doe"
          className="w-full h-10 px-3 border border-gray-300 dark:border-gray-700 rounded-md 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Bio (optional)
        </label>
        <textarea
          id="bio"
          value={profile.bio}
          onChange={(e) => updateProfile({ ...profile, bio: e.target.value })}
          placeholder="A short description about yourself"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Accent Color
        </label>
        <div className="flex items-center gap-4">
          <select
            id="accentColor"
            value={profile.accentColor}
            onChange={(e) => updateProfile({ ...profile, accentColor: e.target.value })}
            className="h-10 px-3 border border-gray-300 dark:border-gray-700 rounded-md 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="#3B82F6">Blue</option>
            <option value="#8B5CF6">Purple</option>
            <option value="#F59E0B">Amber</option>
            <option value="#10B981">Emerald</option>
            <option value="#EF4444">Red</option>
            <option value="#EC4899">Pink</option>
          </select>
          <div 
            className="w-6 h-6 rounded-full" 
            style={{ backgroundColor: profile.accentColor }}
          />
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Your Links</h2>
          <button
            onClick={addLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary-50 dark:bg-primary-900/20 
              text-primary-600 dark:text-primary-400 text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900/30 
              transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Add Link
          </button>
        </div>
        
        <div className="space-y-3">
          {profile.links.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-lg 
              bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
              No links added yet. Click "Add Link" to get started.
            </div>
          ) : (
            profile.links.map((link, index) => (
              <div
                key={link.id}
                draggable
                onDragStart={() => handleDragStart(link.id)}
                onDragOver={(e) => handleDragOver(e, link.id)}
                onDragEnd={handleDragEnd}
              >
                <LinkItem
                  link={link}
                  index={index}
                  totalLinks={profile.links.length}
                  updateLink={updateLink}
                  removeLink={removeLink}
                  moveLink={moveLink}
                  isDragging={draggedItem === link.id}
                  dragHandleProps={{ draggable: true }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkEditor;