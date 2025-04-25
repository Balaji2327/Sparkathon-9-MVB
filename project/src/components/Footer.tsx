import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-4 sm:px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} LinkHub - Share your professional identity with one link.
        </p>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="GitHub repository"
          >
            <Github className="w-5 h-5" />
          </a>
          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> by LinkHub Team
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;