// Image analysis utilities for skin tone detection and lighting analysis

export interface SkinAnalysisResult {
  skinTone: string;
  undertone: string;
  skinType: string;
  lighting: {
    quality: string;
    score: number;
    recommendations: string[];
  };
  confidence: number;
  customCode: string;
  recommendations: {
    mattePrice: string;
    dewyPrice: string;
    coverage: string[];
    additives: string[];
  };
}

// Convert RGB to HSL for better color analysis
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number, l: number;

  l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

// Analyze skin tone from RGB values
function analyzeSkinTone(avgR: number, avgG: number, avgB: number): { tone: string; undertone: string } {
  const [h, s, l] = rgbToHsl(avgR, avgG, avgB);
  
  // Determine skin tone based on lightness
  let tone: string;
  if (l < 20) tone = 'Very Deep';
  else if (l < 35) tone = 'Deep';
  else if (l < 50) tone = 'Medium Deep';
  else if (l < 65) tone = 'Medium';
  else if (l < 80) tone = 'Light Medium';
  else if (l < 90) tone = 'Light';
  else tone = 'Very Light';

  // Determine undertone based on hue and color ratios
  let undertone: string;
  const redYellowRatio = avgR / Math.max(avgG, 1);
  const blueRatio = avgB / Math.max((avgR + avgG) / 2, 1);

  if (blueRatio > 0.85 && h > 180 && h < 270) {
    undertone = 'Cool Pink';
  } else if (redYellowRatio > 1.1 && h > 0 && h < 60) {
    undertone = 'Warm Golden';
  } else if (avgG > avgR && avgG > avgB) {
    undertone = 'Warm Yellow';
  } else if (blueRatio > 0.75) {
    undertone = 'Cool Rose';
  } else {
    undertone = 'Neutral';
  }

  return { tone, undertone };
}

// Analyze lighting conditions
function analyzeLighting(imageData: ImageData): { quality: string; score: number; recommendations: string[] } {
  const data = imageData.data;
  const pixels = data.length / 4;
  
  let brightnessSum = 0;
  let contrastSum = 0;
  let colorBalance = { r: 0, g: 0, b: 0 };

  // Calculate average brightness and color balance
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    brightnessSum += (r + g + b) / 3;
    colorBalance.r += r;
    colorBalance.g += g;
    colorBalance.b += b;
  }

  const avgBrightness = brightnessSum / pixels;
  colorBalance.r /= pixels;
  colorBalance.g /= pixels;
  colorBalance.b /= pixels;

  // Calculate contrast (simplified)
  let varianceSum = 0;
  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    varianceSum += Math.pow(brightness - avgBrightness, 2);
  }
  const contrast = Math.sqrt(varianceSum / pixels);

  // Determine lighting quality
  let quality: string;
  let score: number;
  let recommendations: string[] = [];

  if (avgBrightness < 80) {
    quality = 'Too Dark';
    score = Math.max(0, 30 - (80 - avgBrightness));
    recommendations.push('Move to brighter lighting');
    recommendations.push('Use natural daylight if possible');
  } else if (avgBrightness > 200) {
    quality = 'Too Bright';
    score = Math.max(0, 30 - (avgBrightness - 200));
    recommendations.push('Reduce direct lighting');
    recommendations.push('Move away from harsh light sources');
  } else if (contrast < 20) {
    quality = 'Low Contrast';
    score = 60 + contrast;
    recommendations.push('Ensure even lighting on face');
  } else if (contrast > 60) {
    quality = 'High Contrast';
    score = 90 - (contrast - 60);
    recommendations.push('Use diffused lighting');
    recommendations.push('Avoid harsh shadows');
  } else {
    quality = 'Excellent';
    score = 90 + Math.min(10, contrast / 6);
    recommendations.push('Perfect lighting conditions!');
  }

  return { quality, score: Math.round(score), recommendations };
}

// Extract dominant skin color from face region
function extractSkinColor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): { avgR: number; avgG: number; avgB: number } {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Focus on center region (where face is likely to be)
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(canvas.width, canvas.height) / 4;
  
  let totalR = 0, totalG = 0, totalB = 0;
  let pixelCount = 0;

  for (let y = Math.max(0, centerY - radius); y < Math.min(canvas.height, centerY + radius); y++) {
    for (let x = Math.max(0, centerX - radius); x < Math.min(canvas.width, centerX + radius); x++) {
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      
      if (distance <= radius) {
        const index = (y * canvas.width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        
        // Skip very dark or very bright pixels (likely not skin)
        const brightness = (r + g + b) / 3;
        if (brightness > 30 && brightness < 220) {
          totalR += r;
          totalG += g;
          totalB += b;
          pixelCount++;
        }
      }
    }
  }

  return {
    avgR: Math.round(totalR / pixelCount) || 150,
    avgG: Math.round(totalG / pixelCount) || 120,
    avgB: Math.round(totalB / pixelCount) || 100
  };
}

export async function analyzeImage(imageFile: File | Blob): Promise<SkinAnalysisResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        // Create canvas for analysis
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          throw new Error('Could not get canvas context');
        }

        // Resize image for processing (max 512px for performance)
        const maxSize = 512;
        let { width, height } = img;
        
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Extract skin color
        const { avgR, avgG, avgB } = extractSkinColor(canvas, ctx);
        
        // Analyze skin tone and undertone
        const { tone, undertone } = analyzeSkinTone(avgR, avgG, avgB);
        
        // Analyze lighting
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const lighting = analyzeLighting(imageData);
        
        // Determine skin type (simplified logic)
        const skinTypes = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive'];
        const brightness = (avgR + avgG + avgB) / 3;
        let skinTypeIndex = Math.floor(brightness / 50);
        skinTypeIndex = Math.max(0, Math.min(skinTypes.length - 1, skinTypeIndex));
        
        const result: SkinAnalysisResult = {
          skinTone: tone,
          undertone: undertone,
          skinType: skinTypes[skinTypeIndex],
          lighting: lighting,
          confidence: Math.max(85, lighting.score),
          customCode: `TT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          recommendations: {
            mattePrice: '250,000 MMK',
            dewyPrice: '300,000 MMK',
            coverage: ['Light', 'Medium', 'Full'],
            additives: ['Hyaluronic Acid', 'Vitamin E', 'SPF Protection']
          }
        };

        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    
    if (imageFile instanceof File) {
      img.src = URL.createObjectURL(imageFile);
    } else {
      // For blob from canvas
      img.src = URL.createObjectURL(imageFile);
    }
  });
}