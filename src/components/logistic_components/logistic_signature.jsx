import React, { useRef } from 'react';
import SignaturePad from 'react-signature-canvas';

const LogisticSignature = ({ onSave, onCancel }) => {
  const sigCanvas = useRef({});

  const clear = (e) => {
    e.preventDefault();
    sigCanvas.current.clear();
  };

  const save = (e) => {
    e.preventDefault();
    const signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    onSave(signature);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SignaturePad
        ref={sigCanvas}
        canvasProps={{
          style: {
            border: '1px solid #000',
            borderRadius: '5px',
            width: '100%',
            height: '200px',
          }
        }}
      />
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button
          type="button"
          onClick={save}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={clear}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogisticSignature;
