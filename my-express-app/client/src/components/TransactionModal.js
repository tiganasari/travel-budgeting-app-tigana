import React from 'react'

export const TransactionModal = ({closeTransModal}) => {
    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="close-modal" >
                <button onClick={() => closeTransModal(false)}> x </button>
                </div>
                <div className="modal-content">
                <p>New expense created!</p>
                </div>
            </div>
            
        </div>
    )
}

export default TransactionModal;