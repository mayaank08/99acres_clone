import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/lib/types";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: userData } = useQuery<User | null>({
    queryKey: ["/api/user"]
  });

  const isAuthenticated = !!userData;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Status bar */}
      <div className="bg-blue-600 h-7 flex items-center justify-between px-4">
        <div className="text-white text-xs">12:36</div>
        <div className="flex items-center">
          <div className="text-white text-xs flex space-x-1">
            <span className="flex items-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/>
              </svg>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/>
              </svg>
            </span>
            <span className="flex items-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z"/>
                <path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                <path d="M9 17l3 3 3-3c-1.65-1.66-4.34-1.66-6 0z"/>
              </svg>
            </span>
            <span>4G</span>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="bg-emerald-600 px-3 py-2 flex items-center justify-between">
        <button 
          className="text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="flex-1 flex justify-center">
          <div className="text-white text-xl font-bold">
            99acres
          </div>
        </div>
        
        <div>
          <button className="inline-flex items-center bg-green-500 text-white rounded-md px-2 py-0.5 text-sm">
            <span>Post property</span>
            <span className="ml-1 bg-white text-green-600 text-xs px-1 rounded">FREE</span>
          </button>
        </div>
      </div>
      
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setMenuOpen(false)}>
          <div className="bg-white w-3/4 h-full" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b">
              {isAuthenticated ? (
                <div>
                  <div className="font-medium">{userData?.name}</div>
                  <button 
                    className="mt-2 text-red-600"
                    onClick={async () => {
                      await fetch("/api/logout", { method: "POST" });
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <a href="/login" className="flex-1 text-center py-1 border border-blue-500 text-blue-500 rounded-md">
                      Login
                    </a>
                    <a href="/signup" className="flex-1 text-center py-1 bg-blue-500 text-white rounded-md">
                      Sign Up
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 space-y-4">
              <a href="/properties?listing_type=sale" className="block py-2 border-b">Buy</a>
              <a href="/properties?listing_type=rent" className="block py-2 border-b">Rent</a>
              <a href="/properties?listing_type=pg" className="block py-2 border-b">PG/Co-living</a>
              <a href="/properties?property_type=commercial" className="block py-2 border-b">Commercial</a>
              <a href="/post-property" className="block py-2 border-b">
                Post Property <span className="text-green-500">FREE</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
