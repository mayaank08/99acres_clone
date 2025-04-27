import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">99acres.com</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Careers with Us</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Request Info</a></li>
              <li><a href="#" className="hover:text-white">Feedback</a></li>
              <li><a href="#" className="hover:text-white">Report a Problem</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Column 2 - Popular Locations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Locations</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Mumbai</a></li>
              <li><a href="#" className="hover:text-white">Delhi NCR</a></li>
              <li><a href="#" className="hover:text-white">Bangalore</a></li>
              <li><a href="#" className="hover:text-white">Hyderabad</a></li>
              <li><a href="#" className="hover:text-white">Pune</a></li>
              <li><a href="#" className="hover:text-white">Kolkata</a></li>
              <li><a href="#" className="hover:text-white">Chennai</a></li>
              <li><a href="#" className="hover:text-white">Ahmedabad</a></li>
            </ul>
          </div>
          
          {/* Column 3 - Property Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Property Services</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Home Loans</a></li>
              <li><a href="#" className="hover:text-white">Legal Services</a></li>
              <li><a href="#" className="hover:text-white">Vastu</a></li>
              <li><a href="#" className="hover:text-white">Property Valuation</a></li>
              <li><a href="#" className="hover:text-white">Interior Services</a></li>
              <li><a href="#" className="hover:text-white">Property Insurance</a></li>
            </ul>
          </div>
          
          {/* Column 4 - Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-300 mb-4">
              Toll Free: 1800-41-99099 (Monday to Saturday, 9:00 AM to 8:00 PM)
            </p>
            
            <h4 className="text-md font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.593 7.203a2.506 2.506 0 00-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 00-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 001.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"></path>
                </svg>
              </a>
            </div>
            
            <h4 className="text-md font-semibold mt-4 mb-2">Download App</h4>
            <div className="flex space-x-2">
              <a href="#" className="block">
                <img src="https://static.99acres.com/universalapp/img/ios_app_download.png" alt="iOS App" className="h-8" />
              </a>
              <a href="#" className="block">
                <img src="https://static.99acres.com/universalapp/img/android_app_download.png" alt="Android App" className="h-8" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Awards and Recognition */}
        <div className="border-t border-gray-700 pt-8 pb-4">
          <h3 className="text-center text-lg font-semibold mb-4">Awards & Recognition</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <img src="https://static.99acres.com/universalapp/img/n_award1.png" alt="Award 1" className="h-16 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
            <img src="https://static.99acres.com/universalapp/img/n_award2.png" alt="Award 2" className="h-16 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
            <img src="https://static.99acres.com/universalapp/img/n_award3.png" alt="Award 3" className="h-16 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all" />
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>All rights reserved - Info Edge (India) Ltd. A 99acres.com initiative</p>
          <p className="mt-2">©2023 Info Edge (India) Ltd.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;