'use client';

import { useState, useEffect, useRef } from 'react';

export default function ShareButton({ productName, shareUrl }) {
  const [isSharing, setIsSharing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  const handleNativeShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          url: shareUrl,
        });
      } else {
        setShowOptions(true);
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      setShowOptions(true);
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copiado para a área de transferência!');
      setShowOptions(false);
    } catch (error) {
      alert('Erro ao copiar link. URL: ' + shareUrl);
    }
  };

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;
    window.open(whatsappUrl, '_blank');
    setShowOptions(false);
  };

  const shareToTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`;
    window.open(telegramUrl, '_blank');
    setShowOptions(false);
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank');
    setShowOptions(false);
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank');
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        disabled={isSharing}
        className="px-2 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-md shadow-sm hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
        title="Compartilhar produto"
        style={{ transform: 'scale(1)' }} // Prevent inheritance of parent scale transforms
      >
        {isSharing ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Compartilhando...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Compartilhar
          </span>
        )}
      </button>

      {showOptions && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 min-w-[220px] animate-in fade-in-0 zoom-in-95 duration-200"
          style={{ transform: 'scale(1)' }} // Prevent inheritance of parent scale transforms
        >
          <div className="p-1">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Compartilhar via
            </div>
            <button
              onClick={shareToWhatsApp}
              className="w-full text-left px-3 py-3 text-sm hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg flex items-center gap-3 transition-colors duration-150 group"
            >
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                <span className="text-green-600 dark:text-green-400 text-lg">📱</span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100">WhatsApp</span>
            </button>
            <button
              onClick={shareToTelegram}
              className="w-full text-left px-3 py-3 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg flex items-center gap-3 transition-colors duration-150 group"
            >
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <span className="text-blue-500 dark:text-blue-400 text-lg">✈️</span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100">Telegram</span>
            </button>
            <button
              onClick={shareToFacebook}
              className="w-full text-left px-3 py-3 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg flex items-center gap-3 transition-colors duration-150 group"
            >
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <span className="text-blue-700 dark:text-blue-400 text-lg">📘</span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100">Facebook</span>
            </button>
            <button
              onClick={shareToTwitter}
              className="w-full text-left px-3 py-3 text-sm hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg flex items-center gap-3 transition-colors duration-150 group"
            >
              <div className="w-8 h-8 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center group-hover:bg-sky-200 dark:group-hover:bg-sky-900/50 transition-colors">
                <span className="text-sky-500 dark:text-sky-400 text-lg">🐦</span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100">Twitter</span>
            </button>
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            <button
              onClick={handleCopyLink}
              className="w-full text-left px-3 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg flex items-center gap-3 transition-colors duration-150 group"
            >
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                <span className="text-gray-600 dark:text-gray-300 text-lg">📋</span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100">Copiar Link</span>
            </button>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowOptions(false)}
              className="w-full px-3 py-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-b-xl transition-colors duration-150"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}