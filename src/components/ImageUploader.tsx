
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, X, CheckCircle } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (JPEG/PNG)');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Please select an image smaller than 10MB');
        return;
      }

      setSelectedImage(file);
      onImageSelect(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    onImageSelect(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Clean up preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
      />

      {!selectedImage ? (
        <div className="w-full">
          <Button
            onClick={openFileDialog}
            size="lg"
            variant="outline"
            className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-teal-400 hover:bg-teal-50 transition-all duration-300 flex flex-col space-y-2"
          >
            <Upload size={32} className="text-gray-400" />
            <span className="text-gray-600">Upload Aadhaar Photo</span>
            <span className="text-xs text-gray-400">JPEG/PNG only, max 10MB</span>
          </Button>
        </div>
      ) : (
        <div className="w-full space-y-4">
          {/* Image Preview */}
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <img
              src={previewUrl || ''}
              alt="Aadhaar preview"
              className="w-full h-full object-cover"
            />
            <Button
              onClick={removeImage}
              size="sm"
              variant="destructive"
              className="absolute top-2 right-2 w-8 h-8 rounded-full p-0"
            >
              <X size={16} />
            </Button>
          </div>
          
          {/* File Info */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-green-700">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">Image uploaded successfully</span>
            </div>
            <div className="text-xs text-green-600 mt-1">
              {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          </div>
          
          {/* Replace Button */}
          <Button
            onClick={openFileDialog}
            variant="outline"
            size="sm"
            className="w-full"
          >
            Replace Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
