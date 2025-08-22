import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ScanFace, 
  Camera, 
  Play, 
  Pause,
  RotateCcw,
  Settings,
  Shield,
  Zap,
  Brain,
  Eye
} from "lucide-react";

export default function FaceDetection() {
  const [isScanning, setIsScanning] = useState(false);
  const [detectionResults, setDetectionResults] = useState({
    focusLevel: 85,
    emotionalState: "Engaged",
    attentionSpan: "High",
    learningRecommendation: "Continue with current pace"
  });

  const features = [
    {
      title: "Attention Tracking",
      description: "Monitor your focus levels during study sessions",
      icon: Eye,
      color: "from-primary to-secondary-purple",
      status: "Active"
    },
    {
      title: "Emotion Analysis",
      description: "Detect emotional states to optimize learning",
      icon: Brain,
      color: "from-secondary-purple to-accent-teal",
      status: "Active"
    },
    {
      title: "Fatigue Detection",
      description: "Alert when you need breaks for better retention",
      icon: Zap,
      color: "from-accent-teal to-primary",
      status: "Active"
    },
    {
      title: "Engagement Metrics",
      description: "Track how engaged you are with different topics",
      icon: ScanFace,
      color: "from-primary to-accent-teal",
      status: "Beta"
    }
  ];

  const privacyPoints = [
    "All processing happens locally on your device",
    "No facial data is stored or transmitted",
    "You can disable this feature at any time",
    "Only learning metrics are saved"
  ];

  return (
    <div className="min-h-screen p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold font-poppins mb-2 flex items-center">
          <ScanFace className="w-8 h-8 mr-3 text-accent-teal" />
          AI Face Detection
        </h1>
        <p className="text-muted-foreground">
          Enhance your learning with real-time attention and emotion analysis
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Detection Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Camera Interface */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold font-poppins flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-primary" />
                  Live Analysis
                </h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-muted-foreground/30"
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Settings
                  </Button>
                  <Button
                    onClick={() => setIsScanning(!isScanning)}
                    className={`${
                      isScanning 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-gradient-to-r from-primary to-secondary-purple hover:from-secondary-purple hover:to-accent-teal'
                    } smooth-transition`}
                  >
                    {isScanning ? (
                      <>
                        <Pause className="w-4 h-4 mr-1" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Camera Preview Area */}
              <div className="relative aspect-video bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden">
                {isScanning ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-teal/10"
                  >
                    {/* Scanning Animation */}
                    <motion.div
                      animate={{ 
                        y: [0, 300, 0],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="absolute w-full h-1 bg-gradient-to-r from-primary via-accent-teal to-secondary-purple"
                    />
                    
                    {/* Detection Overlay */}
                    <div className="absolute inset-4 border-2 border-accent-teal rounded-lg">
                      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-accent-teal"></div>
                      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-accent-teal"></div>
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-accent-teal"></div>
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-accent-teal"></div>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-600 font-medium">Analyzing...</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
                    <p className="text-muted-foreground">Click "Start" to begin face detection</p>
                    <p className="text-sm text-muted-foreground/70 mt-2">
                      Make sure your camera is enabled and you're in good lighting
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <Card className="glass p-6 hover:shadow-lg smooth-transition neural-glow">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge 
                      variant={feature.status === 'Active' ? 'default' : 'secondary'}
                      className={feature.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                    >
                      {feature.status}
                    </Badge>
                  </div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Real-time Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold font-poppins flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-secondary-purple" />
                  Live Metrics
                </h3>
                <Button variant="ghost" size="sm">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary-purple/10 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Focus Level</span>
                    <span className="text-lg font-bold text-primary">{detectionResults.focusLevel}%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${detectionResults.focusLevel}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-primary to-secondary-purple h-2 rounded-full"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Emotional State</span>
                    <Badge className="bg-green-100 text-green-700">{detectionResults.emotionalState}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Attention Span</span>
                    <Badge className="bg-blue-100 text-blue-700">{detectionResults.attentionSpan}</Badge>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-accent-teal/10 border border-accent-teal/20">
                  <h4 className="font-medium text-sm mb-1 text-accent-teal">AI Recommendation</h4>
                  <p className="text-xs text-muted-foreground">{detectionResults.learningRecommendation}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Privacy & Security */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold font-poppins flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Privacy First
                </h3>
              </div>
              
              <div className="space-y-3">
                {privacyPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="flex items-start space-x-2"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-muted-foreground">{point}</p>
                  </motion.div>
                ))}
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4 border-green-500 text-green-600 hover:bg-green-50"
              >
                Learn More About Privacy
              </Button>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Card className="glass p-6">
              <h3 className="text-lg font-semibold font-poppins mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Camera Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  Calibrate Detection
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Settings
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}