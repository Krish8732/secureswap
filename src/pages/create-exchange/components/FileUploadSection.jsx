import React, { useEffect, useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FileUploadSection = ({ files, onFilesChange, exchangeType }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const maxFiles = 5;
  const maxFileSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain'];

  useEffect(() => {
    return () => {
      files?.forEach((fileObj) => {
        if (fileObj?.preview) {
          URL.revokeObjectURL(fileObj.preview);
        }
      });
    };
  }, [files]);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e?.dataTransfer?.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e?.target?.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles?.filter((file) => {
      if (!allowedTypes?.includes(file?.type)) {
        alert(`File type ${file?.type} is not supported`);
        return false;
      }
      if (file?.size > maxFileSize) {
        alert(`File ${file?.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });

    const totalFiles = files?.length + validFiles?.length;
    if (totalFiles > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const filesWithPreview = validFiles?.map((file) => ({
      file,
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      preview: file?.type?.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));

    onFilesChange([...files, ...filesWithPreview]);
  };

  const removeFile = (fileId) => {
    const fileToRemove = files?.find((file) => file?.id === fileId);
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }

    const updatedFiles = files?.filter((file) => file?.id !== fileId);
    onFilesChange(updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith('image/')) return 'Image';
    if (fileType === 'application/pdf') return 'FileText';
    return 'File';
  };

  const getUploadText = () => {
    switch (exchangeType) {
      case 'service':
        return 'Upload portfolio samples, certificates, or work examples';
      case 'product':
        return 'Upload product photos from multiple angles';
      case 'giftcard':
        return 'Upload gift card images (hide sensitive details)';
      default:
        return 'Upload supporting files and images';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-base font-medium text-foreground mb-1">Supporting Files</h4>
        <p className="text-sm text-muted-foreground">{getUploadText()}</p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 bg-muted/20'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedTypes?.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="text-center">
          <Icon name="Upload" size={32} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-sm font-medium text-foreground mb-2">
            Drop files here or click to browse
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Supports: Images (JPG, PNG, GIF, WebP), PDF, Text files
          </p>
          <p className="text-xs text-muted-foreground">
            Maximum {maxFiles} files, 10MB each
          </p>
        </div>
      </div>

      {files?.length > 0 && (
        <div className="space-y-3">
          <h5 className="text-sm font-medium text-foreground">
            Uploaded Files ({files?.length}/{maxFiles})
          </h5>
          <div className="space-y-2">
            {files?.map((fileObj) => (
              <div
                key={fileObj?.id}
                className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg"
              >
                {fileObj?.preview ? (
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={fileObj?.preview}
                      alt={fileObj?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={getFileIcon(fileObj?.type)} size={20} color="var(--color-muted-foreground)" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {fileObj?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(fileObj?.size)}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(fileObj?.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="text-sm font-medium text-foreground mb-1">Upload Guidelines</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>- High-quality images help build trust with potential partners</li>
              <li>- For gift cards: Cover sensitive information like codes or PINs</li>
              <li>- For products: Show condition, brand labels, and any defects</li>
              <li>- For services: Include certificates, portfolio samples, or testimonials</li>
              <li>- Avoid uploading personal documents with sensitive information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadSection;
