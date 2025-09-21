import { useState, useCallback } from "react";
import { Upload, Camera, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
}

export const ImageUpload = ({ onImagesChange }: ImageUploadProps) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [aiDetections, setAiDetections] = useState<string[]>([]);

  const simulateAIDetection = (file: File) => {
    // Simulate AI detection based on filename or random selection
    const detections = [
      "Pothole detected",
      "Road damage identified",
      "Broken streetlight found",
      "Garbage accumulation",
      "Water logging",
      "Infrastructure damage"
    ];
    
    const randomDetection = detections[Math.floor(Math.random() * detections.length)];
    setAiDetections(prev => [...prev, randomDetection]);
  };

  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    fileArray.forEach(file => {
      simulateAIDetection(file);
    });
    
    const newImages = [...uploadedImages, ...fileArray];
    setUploadedImages(newImages);
    onImagesChange(newImages);
  }, [uploadedImages, onImagesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    const newDetections = aiDetections.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    setAiDetections(newDetections);
    onImagesChange(newImages);
  };

  return (
    <div className="bg-card card-government rounded-lg p-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-foreground mb-4">Upload Images</h2>
      
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-government ${
          dragActive 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary hover:bg-primary/5"
        }`}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-medium text-foreground mb-2">
          Drop images here or click to upload
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Supports JPG, PNG files up to 10MB
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="outline" 
            className="btn-primary"
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose Files
          </Button>
          
          <Button 
            variant="outline"
            className="btn-accent"
            onClick={() => {
              // In a real app, this would access device camera
              alert("Camera feature would open device camera");
            }}
          >
            <Camera className="h-4 w-4 mr-2" />
            Take Photo
          </Button>
        </div>
        
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />
      </div>

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-medium text-foreground mb-3">
            Uploaded Images ({uploadedImages.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {uploadedImages.map((file, index) => (
              <div key={index} className="card-elevated rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* AI Detection Result */}
                {aiDetections[index] && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                      AI: {aiDetections[index]}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};