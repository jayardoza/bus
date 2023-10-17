import React from 'react';

function Sales({ totalSales }) {
  return (
    <div>
      <div className="sales-title">Sales</div>
      <div className="sales-container">
        <h2>Total Sales: {totalSales}</h2>
      </div>
    </div>
  );
}

export default Sales;
