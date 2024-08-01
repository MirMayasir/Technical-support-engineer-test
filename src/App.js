import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageViewer from './Components/ImageViewer';
import ControlPanel from './Components/ControlPanel';

function App() {
  const [images, setImages] = useState([]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <ImageViewer images={images} />
        </div>
        <div className="col-md-6">
          <ControlPanel images={images} setImages={setImages} />
        </div>
      </div>
    </div>
  );
}

export default App;
