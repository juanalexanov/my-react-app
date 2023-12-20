// TournamentDetailsModal.js
import React from 'react';

const TournamentDetailsModal = ({ show, onClose, tournament }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Tournament Details</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {/* Display additional tournament details */}
            <p>
              <strong>Name:</strong> {tournament.name}<br />
              <strong>Date:</strong> {tournament.date}<br />
              <strong>Times:</strong> {tournament.times}<br />
              <strong>Venue:</strong> {tournament.venue}<br />
              <strong>Rules:</strong> {tournament.rules}<br />
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetailsModal;
