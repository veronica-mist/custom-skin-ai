import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Camera, Upload, Scan, Brain, CheckCircle, ArrowRight } from 'lucide-react';
import aiScanBg from '@/assets/ai-scan-bg.jpg';

const AIScan = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        setImageFile(blob);
        analyzeSkin(blob);
      });
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      analyzeSkin(file);
    }
  };

  const analyzeSkin = async (imageBlob) => {
    setIsScanning(true);
    
    // Simulate AI analysis with real-looking data
    setTimeout(() => {
      // Generate realistic skin analysis data
      const skinTones = ['Fair', 'Light', 'Medium', 'Tan', 'Deep'];
      const undertones = ['Cool Pink', 'Neutral', 'Warm Yellow', 'Warm Golden', 'Cool Rose'];
      const skinTypes = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'];
      
      const result = {
        skinTone: skinTones[Math.floor(Math.random() * skinTones.length)],
        undertone: undertones[Math.floor(Math.random() * undertones.length)],
        skinType: skinTypes[Math.floor(Math.random() * skinTypes.length)],
        confidence: Math.floor(Math.random() * 10) + 90, // 90-99%
        customCode: `TT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        recommendations: {
          mattePrice: '250,000 MMK',
          dewyPrice: '300,000 MMK',
          coverage: ['Light', 'Medium', 'Full'],
          additives: ['Hyaluronic Acid', 'Vitamin E', 'SPF Protection']
        }
      };
      
      setScanResult(result);
      setIsScanning(false);
    }, 3000);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section 
        className="relative py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${aiScanBg})`
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              AI Face Scan Tool
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Get instant, scientific analysis of your skin tone and undertone
            </p>
          </div>
        </div>
      </section>

      {/* Scan Interface */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {!scanResult ? (
              <div className="space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold text-primary">
                    Start Your Skin Analysis
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Choose how you'd like to capture your image for analysis
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Live Camera Scan */}
                  <Card className="p-8 shadow-luxury">
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 mx-auto gradient-primary rounded-full flex items-center justify-center">
                        <Camera className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary">Live Camera Scan</h3>
                      <p className="text-muted-foreground">
                        Use your device's camera for real-time analysis. Make sure you're in good lighting.
                      </p>
                      
                      <div className="space-y-4">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full rounded-lg bg-muted"
                          style={{ maxHeight: '300px' }}
                        />
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                        
                        <div className="space-y-3">
                          <Button 
                            variant="scan" 
                            size="lg" 
                            onClick={startCamera}
                            className="w-full"
                          >
                            <Camera className="h-5 w-5" />
                            Start Camera
                          </Button>
                          <Button 
                            variant="hero" 
                            size="lg" 
                            onClick={captureImage}
                            className="w-full"
                            disabled={!videoRef.current?.srcObject}
                          >
                            <Scan className="h-5 w-5" />
                            Capture & Analyze
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Upload from Gallery */}
                  <Card className="p-8 shadow-luxury">
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 mx-auto gradient-primary rounded-full flex items-center justify-center">
                        <Upload className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary">Upload Photo</h3>
                      <p className="text-muted-foreground">
                        Upload a clear photo from your gallery. Best results with natural lighting and no makeup.
                      </p>
                      
                      <div className="space-y-4">
                        <div 
                          className="w-full h-64 border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center bg-muted/50 cursor-pointer hover:bg-muted transition-smooth"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {imageFile ? (
                            <img 
                              src="/lovable-uploads/e2942bc5-ca06-4a0e-8224-190702092e5a.png"
                              alt="Uploaded" 
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <div className="text-center space-y-2">
                              <Upload className="h-12 w-12 text-primary mx-auto" />
                              <p className="text-muted-foreground">Click to upload or drag & drop</p>
                            </div>
                          )}
                        </div>
                        
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        
                        <Button 
                          variant="hero" 
                          size="lg" 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full"
                        >
                          <Upload className="h-5 w-5" />
                          Choose Photo
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Scanning Animation */}
                {isScanning && (
                  <Card className="p-12 text-center shadow-luxury">
                    <div className="space-y-6">
                      <div className="w-24 h-24 mx-auto gradient-primary rounded-full flex items-center justify-center animate-pulse">
                        <Brain className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary">Analyzing Your Skin...</h3>
                      <p className="text-muted-foreground">
                        Our AI is processing your image to determine your perfect foundation match
                      </p>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-gradient-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            ) : (
              /* Scan Results */
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto gradient-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-primary">
                    Analysis Complete!
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Here's your personalized skin analysis and foundation recommendation
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Analysis Results */}
                  <Card className="p-8 shadow-luxury">
                    <h3 className="text-2xl font-bold text-primary mb-6">Your Skin Analysis</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Skin Tone:</span>
                        <span className="text-primary">{scanResult.skinTone}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Undertone:</span>
                        <span className="text-primary">{scanResult.undertone}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Skin Type:</span>
                        <span className="text-primary">{scanResult.skinType}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Confidence Score:</span>
                        <span className="text-primary font-bold">{scanResult.confidence}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Custom Code:</span>
                        <span className="text-primary font-mono">{scanResult.customCode}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Foundation Recommendations */}
                  <Card className="p-8 shadow-luxury gradient-luxury">
                    <h3 className="text-2xl font-bold text-primary mb-6">Perfect Foundation Match</h3>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-primary">Available Finishes:</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                            <span>Matte Finish</span>
                            <span className="font-bold text-primary">{scanResult.recommendations.mattePrice}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                            <span>Dewy Finish</span>
                            <span className="font-bold text-primary">{scanResult.recommendations.dewyPrice}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Coverage Options:</h4>
                        <div className="flex flex-wrap gap-2">
                          {scanResult.recommendations.coverage.map((coverage, index) => (
                            <span key={index} className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm">
                              {coverage}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-primary mb-2">Optional Additives:</h4>
                        <div className="flex flex-wrap gap-2">
                          {scanResult.recommendations.additives.map((additive, index) => (
                            <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                              {additive}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="text-center space-y-4">
                  <Link to="/shop" state={{ scanResult }}>
                    <Button variant="hero" size="xl" className="hover-lift">
                      Order Your Custom Foundation
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Your analysis will be saved for easy reordering
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 gradient-luxury">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-primary">
              Tips for Best Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/80 backdrop-blur-sm">
                <h3 className="font-bold text-primary mb-2">Good Lighting</h3>
                <p className="text-sm text-muted-foreground">
                  Use natural lighting or bright, even indoor lighting for accurate color detection
                </p>
              </Card>
              <Card className="p-6 bg-card/80 backdrop-blur-sm">
                <h3 className="font-bold text-primary mb-2">Clean Face</h3>
                <p className="text-sm text-muted-foreground">
                  Remove makeup and clean your face for the most accurate skin tone analysis
                </p>
              </Card>
              <Card className="p-6 bg-card/80 backdrop-blur-sm">
                <h3 className="font-bold text-primary mb-2">Direct View</h3>
                <p className="text-sm text-muted-foreground">
                  Face the camera directly and ensure your face fills most of the frame
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIScan;