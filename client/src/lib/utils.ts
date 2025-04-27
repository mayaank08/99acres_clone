import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Property, FormattedProperty } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price in Indian currency style
export function formatPrice(price: number): string {
  if (price >= 10000000) {
    // Convert to crores
    return `₹ ${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    // Convert to lakhs
    return `₹ ${(price / 100000).toFixed(2)} Lac`;
  } else if (price >= 1000) {
    // Convert to thousands
    return `₹ ${(price / 1000).toFixed(2)}k`;
  } else {
    return `₹ ${price}`;
  }
}

// Format date as relative time
export function formatDate(dateString: Date | string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}

// Format property for display with formatted price and date
export function formatProperty(property: Property, cities: any[] = [], localities: any[] = []): FormattedProperty {
  const city = cities.find(c => c.id === property.city_id);
  const locality = localities.find(l => l.id === property.locality_id);
  
  return {
    ...property,
    formattedPrice: formatPrice(property.price),
    formattedDate: formatDate(property.created_at),
    cityName: city?.name,
    localityName: locality?.name
  };
}

// Get role label for display
export function getRoleLabel(role: string): string {
  switch (role) {
    case 'seller':
      return 'Owner';
    case 'agent':
      return 'Agent';
    case 'builder':
      return 'Builder';
    default:
      return role.charAt(0).toUpperCase() + role.slice(1);
  }
}

// Format area with unit
export function formatArea(area: number): string {
  return `${area.toLocaleString()} sqft`;
}

// Get property type label
export function getPropertyTypeLabel(type: string): string {
  switch (type) {
    case 'apartment':
      return 'Apartment';
    case 'house':
      return 'Independent House';
    case 'villa':
      return 'Villa';
    case 'plot':
      return 'Plot';
    case 'commercial':
      return 'Commercial';
    case 'pg':
      return 'PG/Co-living';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
}

// Calculate EMI based on loan amount, interest rate and tenure
export function calculateEMI(principal: number, rate: number, tenure: number): number {
  // Convert interest rate from percentage to decimal and divide by 12 for monthly rate
  const monthlyRate = rate / (12 * 100);
  
  // Convert tenure from years to months
  const months = tenure * 12;
  
  // Calculate EMI using formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
              (Math.pow(1 + monthlyRate, months) - 1);
  
  return Math.round(emi);
}

// Generate star rating component array
export function generateRatingStars(rating: number): ('full' | 'half' | 'empty')[] {
  const stars: ('full' | 'half' | 'empty')[] = [];
  
  // Get the whole number part of the rating
  const fullStars = Math.floor(rating);
  
  // Get the decimal part of the rating
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Fill the array with the appropriate star types
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push('full');
    } else if (i === fullStars && hasHalfStar) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }
  
  return stars;
}

// Truncate text to specified length
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

// Generate a placeholder image URL
export function getPlaceholderImage(type: string): string {
  // Default to apartment image
  return "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg";
}

// Format phone number to Indian format
export function formatPhoneNumber(phone: string): string {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid 10-digit Indian number
  if (cleaned.length === 10) {
    return `+91 ${cleaned.substr(0, 5)} ${cleaned.substr(5)}`;
  }
  
  // Otherwise return as is
  return phone;
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}
