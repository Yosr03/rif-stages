import { useState, useRef } from 'react';
import { Upload, X, FileText, Check } from 'lucide-react';

const FileUpload = ({
  label,
  name,
  onChange,
  accept = '.pdf,.doc,.docx',
  maxSizeMB = 5,
  error,
  required = false,
  className = '',
}) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      onChange({ target: { name, value: null } });
      alert(`Le fichier ne doit pas dépasser ${maxSizeMB}MB`);
      return;
    }
    setFile(selectedFile);
    onChange({ target: { name, value: selectedFile } });
  };

  const handleChange = (e) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    onChange({ target: { name, value: null } });
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="label-field">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {!file ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-all duration-200 ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : error
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            name={name}
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700">
            Glissez votre fichier ici ou{' '}
            <span className="text-blue-600 underline">parcourir</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PDF, DOC, DOCX • Max {maxSizeMB}MB
          </p>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <button
              type="button"
              onClick={removeFile}
              className="p-1 hover:bg-red-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;