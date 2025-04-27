import HeroSection from "@/components/home/HeroSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import PropertiesByCity from "@/components/home/PropertiesByCity";
import PropertyTypes from "@/components/home/PropertyTypes";
import RecentListings from "@/components/home/RecentListings";
import PropertyTools from "@/components/home/PropertyTools";
import TopAgents from "@/components/home/TopAgents";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>99acres Clone - Real Estate Property Search in India</title>
        <meta name="description" content="Search real estate properties across India. Buy, Sell or Rent residential and commercial properties." />
      </Helmet>
      
      <HeroSection />
      <FeaturedProperties />
      <PropertiesByCity />
      <PropertyTypes />
      <RecentListings />
      <PropertyTools />
      <TopAgents />
    </>
  );
};

export default HomePage;
