import { Hero } from "@/components/Hero";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return <Hero onGetStarted={handleGetStarted} />;
};

export default Index;
