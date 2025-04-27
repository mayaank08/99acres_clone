import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-lg mb-4">99acres Clone</h3>
            <p className="text-gray-300 text-sm">India's No.1 Property Portal. Search from over 5 lakh properties across top cities in India.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-primary">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-primary">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-primary">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-primary">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          {/* Column 2 */}
          <div>
            <h4 className="font-bold mb-4">Popular Locations</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/properties?city=1">
                  <a className="hover:text-primary">Mumbai</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?city=2">
                  <a className="hover:text-primary">Delhi NCR</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?city=3">
                  <a className="hover:text-primary">Bangalore</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?city=4">
                  <a className="hover:text-primary">Hyderabad</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?city=5">
                  <a className="hover:text-primary">Pune</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?city=6">
                  <a className="hover:text-primary">Chennai</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h4 className="font-bold mb-4">Buy Property</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/properties?property_type=apartment&listing_type=sale">
                  <a className="hover:text-primary">Popular Apartment</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?property_type=villa&listing_type=sale">
                  <a className="hover:text-primary">Premium Villas</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?owner=builder&listing_type=sale">
                  <a className="hover:text-primary">Builder Properties</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?status=ready&listing_type=sale">
                  <a className="hover:text-primary">Ready to Move</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?status=new&listing_type=sale">
                  <a className="hover:text-primary">New Projects</a>
                </Link>
              </li>
              <li>
                <Link href="/properties?max_price=5000000&listing_type=sale">
                  <a className="hover:text-primary">Budget Homes</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4 */}
          <div>
            <h4 className="font-bold mb-4">Information</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about">
                  <a className="hover:text-primary">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-primary">Contact Us</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="hover:text-primary">Terms & Conditions</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="hover:text-primary">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/testimonials">
                  <a className="hover:text-primary">Testimonials</a>
                </Link>
              </li>
              <li>
                <Link href="/sitemap">
                  <a className="hover:text-primary">Sitemap</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 5 */}
          <div>
            <h4 className="font-bold mb-4">Our Apps</h4>
            <p className="text-sm text-gray-300 mb-3">Download our app for the best experience</p>
            <div className="space-y-2">
              <a href="#" className="block">
                <img 
                  src="https://static.99acres.com/universalapp/img/Play_Store_Badge.png" 
                  alt="Google Play Store" 
                  className="h-10" 
                />
              </a>
              <a href="#" className="block">
                <img 
                  src="https://static.99acres.com/universalapp/img/App_Store_Badge.png" 
                  alt="Apple App Store" 
                  className="h-10" 
                />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} 99acres Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
