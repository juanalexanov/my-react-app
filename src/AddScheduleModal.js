// AddScheduleModal.js
import React from 'react';

const AddScheduleModal = ({ showModal, onClose, onSaveSchedule }) => {
  return (
    <div className={showModal ? "modal" : "d-none"} tabIndex="-1" role="dialog">
      {/* ... (existing code) */}
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={onClose}
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onSaveSchedule}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddScheduleModal;
