'use client';
import React from 'react';

const LanguageSelector: React.FC = () => {
  return (
    <div className="line3 text-right">
      <span className="mr-2">Ngôn ngữ:</span>
      <a href="#" className="inline-flex items-center">
        <img
          src="/image/header/VN-Flag.jpg"
          alt="Tiếng Việt"
          className="h-4 w-4 mr-1"
          style={{
            backgroundPosition: '50% -484px',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <span className="text-sm">Tiếng Việt</span>
      </a>
      <a href="#" className="inline-flex items-center ml-4">
        <img
          src="/image/header/Eng-Flag.jpg"
          alt="English"
          className="h-4 w-4 mr-1"
          style={{
            backgroundPosition: '50% -110px',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <span className="text-sm">English</span>
      </a>
    </div>
  );
};

export default LanguageSelector;
