
import InteractiveHero from '@/components/branding/InteractiveHero';
import { GlassCursorTrail } from '@/components/glass/GlassCursorTrail';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <GlassCursorTrail />
      <InteractiveHero />
      
      {/* CTA Section */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <Link to="/console">
          <Button 
            size="lg"
            className="glass-btn-primary backdrop-blur-md border border-archon-primary/30 px-8 py-6 text-lg"
          >
            Enter Console →
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Landing;
