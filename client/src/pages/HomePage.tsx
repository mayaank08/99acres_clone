import HeroSection from "@/components/home/HeroSection";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Real Estate | Property in India | Buy, Sale, Rent Properties | 99acres</title>
        <meta name="description" content="99acres.com India's No.1 Real Estate Portal - Buy, Sale, Rent residential and commercial properties in India." />
      </Helmet>
      
      <HeroSection />
    </>
  );
};

export default HomePage;
