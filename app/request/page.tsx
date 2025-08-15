'use client';

import { useState } from 'react';

export default function RequestPage() {
  const [itemCode, setItemCode] = useState('');
  const [pcs, setPcs] = useState('');
  const [cartons, setCartons] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Replace this with your logic
    console.log('Item:', itemCode);
    console.log('Quantity (pcs):', pcs);
    console.log('Quantity (cartons):', cartons);

    // Optionally reset
    setItemCode('');
    setPcs('');
    setCartons('');
  };

  return (
    <div className="background">
      <div className="request-box">
        <h2>Supervisor Request</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Scan or enter item code"
            value={itemCode}
            onChange={(e) => setItemCode(e.target.value)}
            required
          />

          <div className="quantity-row">
            <input
              type="number"
              placeholder="Quantity (pcs)"
              value={pcs}
              onChange={(e) => setPcs(e.target.value)}
              min="0"
            />
            <input
              type="number"
              placeholder="Quantity (cartons)"
              value={cartons}
              onChange={(e) => setCartons(e.target.value)}
              min="0"
            />
          </div>

          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
}
