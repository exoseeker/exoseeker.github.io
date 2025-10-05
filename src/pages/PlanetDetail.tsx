import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { exoplanets, getLightCurveData } from '@/data/exoplanets';
import { PlanetVisual } from '@/components/PlanetVisual';
import { DataCard } from '@/components/DataCard';
import { AIConfidenceCard } from '@/components/AIConfidenceCard';
import { LightCurveChart } from '@/components/LightCurveChart';
import { ComparisonDrawer } from '@/components/ComparisonDrawer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const PlanetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(false);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);

  const planet = exoplanets.find(p => p.id === id);

  if (!planet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Planet Not Found</h1>
          <Button onClick={() => navigate('/')}>Return to Star Map</Button>
        </div>
      </div>
    );
  }

  // --- State hooks ---
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<string | null>(null);

  // --- Prediction Handler ---
  const handlePrediction = async () => {
    setPredictionLoading(true);
    toast.info("Running ML prediction...");

    setPredictionResult(null);

    try {
      const payload = {
        koi_period: planet.koi_period,
        koi_duration: planet.koi_duration,
        koi_depth: planet.koi_depth,
        koi_model_snr: planet.koi_model_snr,
        koi_impact: planet.koi_impact,
        koi_prad: planet.koi_prad,
        koi_teq: planet.koi_teq,
        koi_insol: planet.koi_insol,
        koi_steff: planet.koi_steff,
        koi_slogg: planet.koi_slogg,
        koi_srad: planet.koi_srad,
        koi_fpflag_nt: planet.koi_fpflag_nt,
        koi_fpflag_ss: planet.koi_fpflag_ss,
        koi_fpflag_co: planet.koi_fpflag_co,
        koi_fpflag_ec: planet.koi_fpflag_ec
      };

      const res = await fetch(
        "https://fastapi-ml-service-4b3s.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = await res.json();
      setPredictionResult(data.prediction);
      toast.success("Prediction complete!");
    } catch (err: any) {
      console.error(err);
      setPredictionResult("Error: " + err.message);
      toast.error("Prediction failed!");
    } finally {
      setPredictionLoading(false);
    }
  };


  const lightCurveData = getLightCurveData(planet.id);
  const systemPlanets = exoplanets.filter(p =>
    p.starName === planet.starName && p.id !== planet.id
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-card border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Star Map
          </Button>
          <h1 className="text-4xl font-bold mb-2 stellar-glow">{planet.name}</h1>
          <p className="text-muted-foreground">Orbiting {planet.starName}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Planet Visual and Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-card p-6">
              <PlanetVisual radius={planet.koi_prad * 0.7} />
            </Card>

            <Button
              onClick={handlePrediction}
              disabled={predictionLoading}
              className="w-full stellar-glow h-12 text-lg"
            >
              {predictionLoading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={20} />
                  Predicting...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2" size={20} />
                  Run ML Prediction
                </>
              )}
            </Button>

            {predictionResult && (
              <Card className="glass-card p-4 mt-4 bg-blue-50">
                <h3 className="font-semibold text-lg">Prediction Result</h3>
                <p className="text-xl mt-2">{predictionResult}</p>
              </Card>
            )}

            <ComparisonDrawer currentPlanet={planet} />

            {planet.sciFiMatch && (
              <Card className="glass-card p-6 cosmic-glow">
                <h3 className="text-lg font-semibold mb-2 text-secondary">Sci-Fi Comparison</h3>
                <p className="text-sm text-muted-foreground">{planet.sciFiMatch}</p>
              </Card>
            )}
          </div>

          {/* Right Column - Data and Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Analysis Result */}
            {showAIAnalysis && planet.confidence && planet.classification && (
              <div className="animate-fade-in">
                <AIConfidenceCard
                  classification={planet.classification}
                  confidence={planet.confidence}
                />
              </div>
            )}

            {/* Kepler Parameters */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Kepler Mission Data</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <DataCard
                  label="Orbital Period"
                  value={planet.koi_period.toFixed(2)}
                  unit="days"
                  tooltip="Time taken for one complete orbit around the star"
                />
                <DataCard
                  label="Transit Duration"
                  value={planet.koi_duration.toFixed(2)}
                  unit="hours"
                  tooltip="Duration of planet passing in front of the star"
                />
                <DataCard
                  label="Transit Depth"
                  value={planet.koi_depth}
                  unit="ppm"
                  tooltip="Brightness decrease when planet transits"
                />
                <DataCard
                  label="Signal-to-Noise"
                  value={planet.koi_model_snr.toFixed(1)}
                  tooltip="Quality of the detection signal"
                />
                <DataCard
                  label="Impact Parameter"
                  value={planet.koi_impact.toFixed(2)}
                  tooltip="How directly the planet passes across the star"
                />
                <DataCard
                  label="Planet Radius"
                  value={planet.koi_prad.toFixed(2)}
                  unit="R⊕"
                  tooltip="Radius relative to Earth"
                />
                <DataCard
                  label="Equilibrium Temp"
                  value={planet.koi_teq}
                  unit="K"
                  tooltip="Expected surface temperature"
                />
                <DataCard
                  label="Insolation Flux"
                  value={planet.koi_insol.toFixed(2)}
                  unit="S⊕"
                  tooltip="Stellar energy received relative to Earth"
                />
                <DataCard
                  label="Stellar Temperature"
                  value={planet.koi_steff}
                  unit="K"
                  tooltip="Surface temperature of host star"
                />
                <DataCard
                  label="Stellar Log g"
                  value={planet.koi_slogg.toFixed(2)}
                  tooltip="Surface gravity of host star"
                />
                <DataCard
                  label="Stellar Radius"
                  value={planet.koi_srad.toFixed(2)}
                  unit="R☉"
                  tooltip="Radius relative to our Sun"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetDetail;
