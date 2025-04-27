import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  user: User | null;
}

const MobileMenu = ({ isOpen, onClose, isAuthenticated, user }: MobileMenuProps) => {
  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white py-4 border-b border-gray-200">
      <div className="space-y-3">
        <Link href="/properties?listing_type=sale">
          <a className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
            Buy
          </a>
        </Link>
        <Link href="/properties?listing_type=rent">
          <a className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
            Rent
          </a>
        </Link>
        <Link href="/properties?listing_type=pg">
          <a className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
            PG/Co-living
          </a>
        </Link>
        <Link href="/properties?property_type=commercial">
          <a className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
            Commercial
          </a>
        </Link>
        <Link href="/home-loans">
          <a className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
            Home Loans
          </a>
        </Link>
        
        {isAuthenticated ? (
          <>
            <Link href="/dashboard">
              <a className="block px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
                {user?.name}'s Dashboard
              </a>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              className="w-full text-left"
              onClick={async () => {
                await fetch("/api/logout", { method: "POST" });
                window.location.href = "/";
                onClose();
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <div className="px-4 py-2 space-y-2">
            <Link href="/login">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mb-2"
                onClick={handleLinkClick}
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button 
                size="sm" 
                className="w-full bg-primary hover:bg-red-700"
                onClick={handleLinkClick}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
        
        <Link href="/post-property">
          <a 
            className="block w-full px-4 py-2 text-left text-sm text-secondary hover:bg-gray-100"
            onClick={handleLinkClick}
          >
            Post Property <span className="text-primary">FREE</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
