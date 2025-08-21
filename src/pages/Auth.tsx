import { AuthForm } from '@/components/ui/auth-form';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Auth() {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4 relative">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-white hover:bg-white/10"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>

      {/* Floating decoration elements */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-white/5 animate-pulse-slow" />
      <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-white/5 animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      <AuthForm onAuthSuccess={handleAuthSuccess} />
    </div>
  );
}