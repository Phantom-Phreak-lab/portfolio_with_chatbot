import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-gray-400 flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-2 text-red-500" /> by Aditya Yadav
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2025 Aditya Yadav. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;