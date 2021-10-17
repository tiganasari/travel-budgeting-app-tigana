import React from 'react'

export const DeleteModal = ({closeDeleteModal}) => {
    return (
        <div className="modal-background">
            <div className="modal-container delete-modal">
                <div className="close-modal" >
                <button onClick={() => closeDeleteModal(false)}> x </button>
                </div>
                <div className="modal-content delete-content">
                <p>Wallet deleted!</p>
                </div>
            </div>
            
        </div>
    )
}

export default DeleteModal;