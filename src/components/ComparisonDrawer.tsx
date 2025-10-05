import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ExoplanetData, exoplanets } from '@/data/exoplanets';
import { Search, ArrowLeftRight } from 'lucide-react';
import { DataCard } from './DataCard';

interface ComparisonDrawerProps {
  currentPlanet: ExoplanetData;
}

export const ComparisonDrawer = ({ currentPlanet }: ComparisonDrawerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState<ExoplanetData | null>(null);

  const otherPlanets = exoplanets.filter(p => p.id !== currentPlanet.id);
  const filteredPlanets = otherPlanets.filter(planet =>
    planet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const comparisonData = [
    { key: 'koi_period', label: 'Orbital Period', unit: 'days' },
    { key: 'koi_prad', label: 'Planet Radius', unit: 'Earth radii' },
    { key: 'koi_teq', label: 'Equilibrium Temp', unit: 'K' },
    { key: 'koi_insol', label: 'Insolation Flux', unit: 'Earth flux' },
    { key: 'koi_steff', label: 'Stellar Temp', unit: 'K' },
    { key: 'koi_srad', label: 'Stellar Radius', unit: 'Solar radii' }
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="glass-card">
          <ArrowLeftRight className="mr-2" size={18} />
          Compare with Other Planets
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-2xl glass-card overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">Planet Comparison</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search planet to compare..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass-card"
            />
          </div>

          {/* Planet Selection */}
          {!selectedPlanet && (
            <div className="grid gap-2">
              {filteredPlanets.slice(0, 5).map((planet) => (
                <Button
                  key={planet.id}
                  variant="outline"
                  className="glass-card justify-start h-auto py-3"
                  onClick={() => setSelectedPlanet(planet)}
                >
                  <div className="text-left">
                    <p className="font-semibold">{planet.name}</p>
                    <p className="text-xs text-muted-foreground">{planet.starName}</p>
                  </div>
                </Button>
              ))}
            </div>
          )}

          {/* Comparison View */}
          {selectedPlanet && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {currentPlanet.name} vs {selectedPlanet.name}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPlanet(null)}
                >
                  Change
                </Button>
              </div>

              <div className="space-y-4">
                {comparisonData.map(({ key, label, unit }) => (
                  <div key={key} className="glass-card p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3">{label}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <DataCard
                        label={currentPlanet.name}
                        value={currentPlanet[key as keyof ExoplanetData] as number}
                        unit={unit}
                      />
                      <DataCard
                        label={selectedPlanet.name}
                        value={selectedPlanet[key as keyof ExoplanetData] as number}
                        unit={unit}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};