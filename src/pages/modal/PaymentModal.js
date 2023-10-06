import React from 'react';
import PropTypes from 'prop-types'; // Add this line
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./paymentmodel.css";

function PaymentModal({ showModal, hideModal, projects, projectInfo }) {
  return (
    <div className='modelpayment'>
      <Modal show={showModal} onHide={hideModal} style={{ width: "100vw" }}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">All Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {projectInfo ? (
            <>
              {projects.map((data, index) => (
                <div key={index} className='modelpayment'>
                  <span className='fs-5 fw-bold'>Payment Details-{index + 1}</span>
                  <p style={{ fontWeight: 750 }} className='fs-5 '>Beneficiary Name: <span style={{ fontWeight: 600 }}>{data.beneficiary_name}</span></p>
                  <p style={{ fontWeight: 750 }} className='fs-5'>Account Number:<span style={{ fontWeight: 600 }}>  {data.account_number}</span></p>
                  <p style={{ fontWeight: 750 }} className='fs-5'>Account Type: <span style={{ fontWeight: 600 }}>{data.account_type}</span></p>
                  <p style={{ fontWeight: 750 }} className='fs-5'>Bank Name: <span style={{ fontWeight: 600 }}>{data.bank_name}</span></p>
                  <p style={{ fontWeight: 750 }} className='fs-5'>Bank Address: <span style={{ fontWeight: 600 }}>{data.bank_address}</span></p>
                  <p style={{ fontWeight: 750 }} className='fs-5'>Sort Code: <span style={{ fontWeight: 600 }}>{data.sort_code}</span></p>
                  <p style={{ fontWeight: 750 }} className='fs-5'>SWIFT: <span style={{ fontWeight: 600 }}> {data.swift}</span></p>
                  <p style={{ fontWeight: 750 }} className='fs-5'>Iban Code: <span style={{ fontWeight: 600 }}>{data.iban}</span></p>
                  <hr />
                </div>
              ))}
            </>
          ) : (
            <p className='fs-5 fw-bold'>No Project To Show</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

PaymentModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
  projectInfo: PropTypes.bool.isRequired,
};

export default PaymentModal;
