import React from 'react';
import { ChevronUp, ChevronDown, Trash2, GripVertical } from 'lucide-react';
import { LinkItem as LinkItemType } from '../types';
import * as LucideIcons from 'lucide-react';

interface LinkItemProps {
  link: LinkItemType;
  index: number;
  totalLinks: number;
  updateLink: (id: string, field: keyof LinkItemType, value: string) => void;
  removeLink: (id: string) => void;
  moveLink: (id: string, direction: 'up' | 'down') => void;
  isDragging?: boolean;
  dragHandleProps?: any;
}

const LinkItem: React.FC<LinkItemProps> = ({
  link,
  index,
  totalLinks,
  updateLink,
  removeLink,
  moveLink,
  isDragging,
  dragHandleProps
}) => {
  // Function to get icon component by name
  const getIconComponent = (iconName: string) => {
    // Default to Link icon if not found
    const IconComponent = (LucideIcons as Record<string, React.ComponentType<any>>)[iconName] || LucideIcons.Link;
    return <IconComponent className="w-5 h-5" />;
  };

  // Common Lucide icon names for dropdown
  const commonIcons = [
    'Link', 'Github', 'Linkedin', 'Mail', 'Twitter', 
    'Facebook', 'Instagram', 'Youtube', 'Globe', 'File',
    'FileText', 'Image', 'Video', 'Music', 'Phone'
  ];

  return (
    <div 
      className={`p-4 mb-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 
        shadow-sm transition-all ${isDragging ? 'opacity-70 shadow-md' : ''}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          {...dragHandleProps}
          className="cursor-move text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <GripVertical className="w-5 h-5" />
        </div>
        
        <select
          value={link.icon}
          onChange={(e) => updateLink(link.id, 'icon', e.target.value)}
          className="h-9 text-sm border border-gray-300 dark:border-gray-700 rounded-md 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          {commonIcons.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </select>
        
        <div className="flex-1">
          <input
            type="text"
            value={link.title}
            onChange={(e) => updateLink(link.id, 'title', e.target.value)}
            placeholder="Link Title"
            className="w-full h-9 px-3 text-sm border border-gray-300 dark:border-gray-700 rounded-md 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="url"
            value={link.url}
            onChange={(e) => updateLink(link.id, 'url', e.target.value)}
            placeholder="https://example.com"
            className="w-full h-9 px-3 text-sm border border-gray-300 dark:border-gray-700 rounded-md 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => moveLink(link.id, 'up')}
            disabled={index === 0}
            className={`p-1.5 rounded-md 
              ${index === 0 ? 'text-gray-300 dark:text-gray-700' : 
                'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => moveLink(link.id, 'down')}
            disabled={index === totalLinks - 1}
            className={`p-1.5 rounded-md 
              ${index === totalLinks - 1 ? 'text-gray-300 dark:text-gray-700' : 
                'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => removeLink(link.id)}
            className="p-1.5 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkItem;