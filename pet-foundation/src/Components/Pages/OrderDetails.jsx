import React from 'react'
import './Css/OrderDetails.css'
import { Link, useLocation } from 'react-router-dom';

const OrderDetails = () => {
  const location = useLocation();
  const { adoptionDetails } = location.state || {}; // Get adoption details from state

  if (!adoptionDetails) {
    return <div>No order details available. Please track your order again.</div>;
  }

  let orderStatusMessage;
  switch (adoptionDetails.delivery_status) {
    case 'Pending':
      orderStatusMessage = "Your order is pending and has not been shipped yet.";
      break;
    case 'Shipped':
      orderStatusMessage = "Your order has been dispatched. We are delivering your order.";
      break;
    case 'delivered':
      orderStatusMessage = "Your order has been delivered";
      break;
    default:
      orderStatusMessage = "Status unknown. Please check back later.";
      break;


  }

  return (
    <div className="container order-data my-5">
      <h5 className="text-uppercase">{adoptionDetails.user_name}</h5>
      <h4 className="mt-5 theme-color mb-5">Thank you for adopting a pet</h4>

      <div className="card p-4 mt-3">
        <div className="first d-flex justify-content-between align-items-center mb-3">
          <div className="info">
            <span className="d-block status-info">Thank you, {adoptionDetails.user}</span>
            <span className=" status-info">Order Number - {adoptionDetails.orderNumber}</span>

          </div>

          <img src="https://i.imgur.com/NiAVkEw.png" width="40" />


        </div>
        <div className="detail">

          <span className="d-block status-info">{orderStatusMessage}</span>
        </div>
      </div>

      <div className="  order-head">User Details</div>
      <hr className="new1" />
      <div className="d-flex justify-content-between">
        <span className="title">User</span>
        <span className="text-muted">{adoptionDetails.user}</span>
      </div>

      <div className="d-flex justify-content-between">
        <span className="title">Contact</span>
        <span className="text-muted">{adoptionDetails.contact}</span>
      </div>

      <div className="d-flex justify-content-between">
        <span className="title">Shipping Address</span>
        <span className="text-muted">{adoptionDetails.shippingAddress}</span>
      </div>

      <div className=" order-head">Pet Details</div>
      <hr className="new1" />
      <div className="d-flex justify-content-between">
        <span className="title">Pet</span>
        <span className="text-muted">{adoptionDetails.pet}</span>
      </div>

      <div className="d-flex justify-content-between">
        <span className="title">Category</span>
        <span className="text-muted">{adoptionDetails.category}</span>
      </div>

      <div className="d-flex justify-content-between">
        <span className="title">Adoption Fee</span>
        <span className="text-muted">Rs. {adoptionDetails.fee} /-</span>
      </div>

      <div className="  order-head">Payment Summary</div>
         <hr className="new1" />

      <div className="d-flex justify-content-between">
        <span className="title">Type</span>
        <span className="text-muted">Credit Card</span>
      </div>

      <div className="d-flex justify-content-between">
        <span className="title">Total amount</span>
        <span className="text-muted">Rs. {adoptionDetails.payment_amount}/-</span>
      </div>

      <div className="d-flex justify-content-between">
        <span className="title">Payment Status</span>
        <span className="text-muted">Complete</span>
      </div>

      <div className="text-center mt-5">
        <button className="btn btn-info status-btn"><Link to="/">Go Back</Link></button>
      </div>
    </div>
  );
};

export default OrderDetails;
