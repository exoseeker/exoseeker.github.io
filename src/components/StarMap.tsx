import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { StarField } from './StarField';
import { Star } from './Star';
import { exoplanets } from '@/data/exoplanets';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export const StarMap = () => {
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredPlanets = exoplanets.filter(planet =>
    planet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    planet.starName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    if (filteredPlanets.length > 0) {
      navigate(`/planet/${filteredPlanets[0].id}`);
    }
  };

  return (
    <div className="relative w-full h-screen bg-background">
      {/* Search Bar */}
      <div className="absolute top-6 right-6 z-10 flex gap-2 items-center glass-card p-2">
        <Search className="text-muted-foreground ml-2" size={18} />
        <Input
          type="text"
          placeholder="Search star or planet..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="w-64 bg-transparent border-0 focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
        />
        <Button 
          onClick={handleSearch}
          size="sm"
          className="stellar-glow"
        >
          Go
        </Button>
      </div>

      {/* Title */}
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-4xl font-bold text-foreground mb-2 stellar-glow">
          Exoplanet Explorer
        </h1>
        <p className="text-muted-foreground">
          Click on any star to explore its planets
        </p>
      </div>

      {/* Hovered Star Name */}
      {hoveredStar && (
        <div className="absolute bottom-6 left-6 z-10 glass-card px-4 py-2">
          <p className="text-primary font-medium">{hoveredStar}</p>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas className="w-full h-full">
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={75} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
            autoRotate={false}
          />

          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

          {/* Background Stars */}
          <StarField count={5000} />

          {/* Exoplanet Stars */}
          {exoplanets.map((planet) => (
            <Star
              key={planet.id}
              position={planet.position}
              planetId={planet.id}
              name={planet.starName}
              onHover={setHoveredStar}
            />
          ))}
        </Suspense>
      </Canvas>

      {/* Stats */}
      <div className="absolute bottom-6 right-6 z-10 glass-card px-4 py-2">
        <p className="text-sm text-muted-foreground">
          {exoplanets.length} exoplanets discovered
        </p>
      </div>
    </div>
  );
};