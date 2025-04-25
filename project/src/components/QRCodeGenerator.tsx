import React, { useState, useEffect } from 'react';
import { Download, Share2 } from 'lucide-react';
import { UserProfile } from '../types';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  profile: UserProfile;
  shareUrl: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ profile, shareUrl }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Generate QR code using qrcode library
  useEffect(() => {
    if (!shareUrl) return;
    
    const generateQR = async () => {
      try {
        const qrDataUrl = await QRCode.toDataURL(shareUrl, {
          width: 250,
          margin: 1,
          color: {
            dark: profile.theme === 'dark' ? '#FFFFFF' : '#000000',
            light: '#0000'
          }
        });
        setQrCodeUrl(qrDataUrl);
        setIsLoading(false);
      } catch (err) {
        console.error('Error generating QR code:', err);
        setIsLoading(false);
      }
    };

    generateQR();
  }, [shareUrl, profile.theme]);

  // Copy to clipboard
  const copyToClipboard = () => {
    if (!shareUrl) return;
    
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };

  // Download QR code
  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${profile.name || 'linkhub'}-qrcode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 rounded-lg 
      border border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        Share Your Links
      </h2>
      
      <div className="text-center mb-6">
        {isLoading ? (
          <div className="p-8 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg w-48 h-48 mx-auto" />
        ) : (
          <div className="p-2 bg-white dark:bg-gray-900 rounded-lg inline-block mb-3">
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="w-48 h-48 rounded-lg"
            />
          </div>
        )}
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Scan this QR code to visit your link page
        </p>
      </div>
      
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 h-10 px-3 border border-gray-300 dark:border-gray-700 rounded-md 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <button
            onClick={copyToClipboard}
            className="px-3 h-10 rounded-md bg-primary-50 dark:bg-primary-900/20 
              text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-100 
              dark:hover:bg-primary-900/30 transition-colors inline-flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        <button
          onClick={downloadQRCode}
          disabled={isLoading}
          className="w-full h-10 rounded-md bg-gray-100 dark:bg-gray-800 
            text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 
            dark:hover:bg-gray-700 transition-colors inline-flex items-center 
            justify-center gap-1.5 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export default QRCodeGenerator;