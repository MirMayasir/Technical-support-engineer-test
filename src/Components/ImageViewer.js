import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ImageViewer({ images }) {
  return (
    <div style={{ height: '500px', overflowY: 'auto', border: '1px solid black' }}>
      <div className="row">
        {images.map((image, index) => (
          <div className="col-6" key={index} style={{ padding: '10px' }}>
            <img src={image} alt={`Scanned ${index}`} className="img-fluid" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageViewer;
