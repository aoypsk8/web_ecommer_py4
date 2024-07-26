import React from 'react';
function formatNumber(number) {
    return new Intl.NumberFormat("en-US").format(number);
  }
const Bill = ({ orderData }) => {
  if (!orderData || !orderData.Products || !Array.isArray(orderData.Products)) {
    return <p>No order data available</p>;
  }

  const { customerName = 'Unknown', Phone = 'Unknown', Location = 'Unknown', Products = [], totalAmount = 0 } = orderData;

  return (
    <div className="p-5 border border-gray-300 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Bill</h2>
      <div className="mb-4">
        <p><strong>Customer:</strong> {customerName}</p>
        <p><strong>Phone:</strong> {Phone}</p>
        <p><strong>Location:</strong> {Location}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Products:</h3>
        <ul>
          {Products.map((product, index) => (
            <li key={index} className="flex justify-between">
              <span>{product.Product_Name}</span>
              <span>{product.quantity} x {formatNumber(product.Price)} ກີບ</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>{formatNumber(totalAmount)} ກີບ</span>
      </div>
    </div>
  );
};

export default Bill;