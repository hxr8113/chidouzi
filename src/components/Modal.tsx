import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  buttonText: string;
  onButtonClick: () => void;
  showSecondary?: boolean;
  secondaryText?: string;
  onSecondaryClick?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  buttonText,
  onButtonClick,
  showSecondary = false,
  secondaryText = '',
  onSecondaryClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div 
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border-2 border-green-500 shadow-2xl max-w-md mx-4"
        style={{
          animation: 'modalBounce 0.6s ease-in-out 2',
        }}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-400 mb-4">{title}</h2>
          <p className="text-gray-300 mb-6 whitespace-pre-line">{message}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={onButtonClick}
              className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
            >
              {buttonText}
            </button>
            {showSecondary && onSecondaryClick && (
              <button
                onClick={onSecondaryClick}
                className="w-full py-3 px-6 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
              >
                {secondaryText}
              </button>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes modalBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};