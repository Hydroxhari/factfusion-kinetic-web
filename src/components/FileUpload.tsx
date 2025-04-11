
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Image, Music, Video, X, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      const fileExt = selectedFile.name.split('.').pop()?.toLowerCase() || '';
      setFile(selectedFile);
      
      // Determine file type based on extension
      if (['txt', 'doc', 'docx', 'pdf', 'rtf'].includes(fileExt)) {
        setFileType('text');
      } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt)) {
        setFileType('image');
      } else if (['mp3', 'wav', 'ogg', 'm4a'].includes(fileExt)) {
        setFileType('audio');
      } else if (['mp4', 'mov', 'avi', 'webm'].includes(fileExt)) {
        setFileType('video');
      } else {
        setFileType('unknown');
      }
      
      // Create URL for preview if it's a previewable file
      if (['image', 'audio', 'video'].includes(fileType)) {
        const url = URL.createObjectURL(selectedFile);
        setFileUrl(url);
      }
      
      onFileSelect(selectedFile);
      
      toast({
        title: "File uploaded",
        description: `${selectedFile.name} has been added for analysis`,
      });
    }
  };

  const clearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFile(null);
    setFileUrl('');
    setFileType('');
  };
  
  const fileTypeIcons = {
    text: <FileText className="w-5 h-5 text-purpleAccent" />,
    image: <Image className="w-5 h-5 text-purpleAccent" />,
    audio: <Music className="w-5 h-5 text-purpleAccent" />,
    video: <Video className="w-5 h-5 text-purpleAccent" />,
    unknown: <FileText className="w-5 h-5 text-purpleAccent" />
  };

  return (
    <div className="w-full">
      {!file ? (
        <motion.div 
          className="border-2 border-dashed border-brand-700 rounded-lg p-8 text-center"
          whileHover={{ boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)" }}
        >
          <input
            type="file"
            accept=".txt,.doc,.docx,.pdf,.rtf,.jpg,.jpeg,.png,.gif,.webp,.mp3,.wav,.ogg,.m4a,.mp4,.mov,.avi,.webm"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            id="file-upload"
          />
          <label 
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <motion.div 
              className="w-16 h-16 rounded-full bg-brand-800 flex items-center justify-center mb-4"
              animate={{ 
                boxShadow: ['0 0 0 rgba(139, 92, 246, 0)', '0 0 15px rgba(139, 92, 246, 0.5)', '0 0 0 rgba(139, 92, 246, 0)']
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2
              }}
            >
              <Upload className="w-8 h-8 text-purpleAccent" />
            </motion.div>
            <p className="text-gray-300 mb-2">
              Click to upload a file for analysis
            </p>
            <p className="text-sm text-gray-500">
              Supports text, image, audio, and video files
            </p>
          </label>
        </motion.div>
      ) : (
        <motion.div 
          className="relative bg-brand-800/50 rounded-lg overflow-hidden p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          <motion.button 
            className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-sm rounded-full z-10"
            onClick={clearFile}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.5)" }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
          
          <div className="flex items-center mb-3">
            {fileType in fileTypeIcons && fileTypeIcons[fileType as keyof typeof fileTypeIcons]}
            <span className="font-medium ml-2">{file?.name}</span>
          </div>
          
          {fileType === 'image' && fileUrl && (
            <div className="w-full h-48 relative rounded-md overflow-hidden">
              <img 
                src={fileUrl} 
                alt="Preview" 
                className="w-full h-full object-contain"
              />
            </div>
          )}
          
          {fileType === 'audio' && fileUrl && (
            <audio controls className="w-full">
              <source src={fileUrl} />
              Your browser does not support the audio element.
            </audio>
          )}
          
          {fileType === 'video' && fileUrl && (
            <video controls className="w-full h-48 object-contain rounded-lg">
              <source src={fileUrl} />
              Your browser does not support the video element.
            </video>
          )}
          
          {fileType === 'text' && (
            <div className="bg-brand-700/30 p-3 rounded-md">
              <div className="flex items-center text-sm text-gray-400">
                <FileText className="w-4 h-4 mr-2" />
                Text document ready for analysis
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;
