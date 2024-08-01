import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';

function ControlPanel({ images, setImages }) {
  const [scanner, setScanner] = useState('TWAIN2 FreeImage Software');
  const [showUI, setShowUI] = useState(false);
  const [autoFeeder, setAutoFeeder] = useState(false);
  const [pixelType, setPixelType] = useState('Color');
  const [resolution, setResolution] = useState('100');

  // Mock scanner function
  const scanImages = async () => {
    // Replace this with actual scanning logic
    const mockImages = [
      'https://via.placeholder.com/150', // Replace with actual scanned image URLs
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150'
    ];
    return mockImages;
  };

  const handleScanAndSave1 = async () => {
    try {
      const scannedImages = await scanImages();
      setImages(scannedImages); // Update state with scanned image URLs

      const pdf = new jsPDF();

      scannedImages.forEach((image, index) => {
        const dataURL = image;
        if (index > 0) {
          pdf.addPage();
        }
        pdf.addImage(dataURL, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      });

      pdf.save('result.pdf'); // Save the PDF file
    } catch (error) {
      console.error('Scanning and saving error:', error);
    }
  };

  const handleScanAndSave2 = () => {
    try {
      images.forEach((image, index) => {
        const link = document.createElement('a');
        link.href = image;
        link.download = `image_${index + 1}.png`; // Save each image with a unique name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } catch (error) {
      console.error('Error saving images:', error);
    }
  };

  const handleRemoveBlankImages = () => {
    const filteredImages = images.filter(image => !isImageBlank(image));
    setImages(filteredImages);
  };

  const handleRemoveAllImages = () => {
    setImages([]);
  };

  const isImageBlank = (image) => {
    const img = new Image();
    img.src = image;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] < 240 || data[i + 1] < 240 || data[i + 2] < 240) {
          return false; // Image is not blank
        }
      }
      return true; // Image is blank
    };
  };

  return (
    <div>
      <div className="form-group">
        <label>Select Source:</label>
        <select className="form-control" value={scanner} onChange={(e) => setScanner(e.target.value)}>
          <option value="TWAIN2 FreeImage Software">TWAIN2 FreeImage Software</option>
          {/* Dynamically load scanner options */}
        </select>
      </div>
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={showUI}
          onChange={(e) => setShowUI(e.target.checked)}
        />
        <label className="form-check-label">Show UI</label>
      </div>
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={autoFeeder}
          onChange={(e) => setAutoFeeder(e.target.checked)}
        />
        <label className="form-check-label">AutoFeeder</label>
      </div>
      <div className="form-group">
        <label>Pixel Type:</label>
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="pixelType"
              value="Black & White"
              checked={pixelType === 'Black & White'}
              onChange={(e) => setPixelType(e.target.value)}
            />
            <label className="form-check-label">Black & White</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="pixelType"
              value="Gray"
              checked={pixelType === 'Gray'}
              onChange={(e) => setPixelType(e.target.value)}
            />
            <label className="form-check-label">Gray</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="pixelType"
              value="Color"
              checked={pixelType === 'Color'}
              onChange={(e) => setPixelType(e.target.value)}
            />
            <label className="form-check-label">Color</label>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Resolution:</label>
        <select className="form-control" value={resolution} onChange={(e) => setResolution(e.target.value)}>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="600">600</option>
        </select>
      </div>
      <div className="form-group">
        <button className="btn btn-primary mb-2" onClick={handleScanAndSave1}>Scan and Save 1</button>
      </div>
      <div className="form-group">
        <button className="btn btn-primary mb-2" onClick={handleScanAndSave2}>Scan and Save 2</button>
      </div>
      <div className="form-group">
        <button className="btn btn-danger mb-2" onClick={handleRemoveBlankImages}>Remove Blank Images</button>
      </div>
      <div className="form-group">
        <button className="btn btn-danger" onClick={handleRemoveAllImages}>Remove All Images</button>
      </div>
    </div>
  );
}

export default ControlPanel;
