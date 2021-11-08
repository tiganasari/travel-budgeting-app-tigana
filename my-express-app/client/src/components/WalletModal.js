import React from 'react'

export const WalletModal = ({closeModal}) => {
    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="close-modal" >
                <button onClick={() => closeModal(false)}> x </button>
                </div>
                <div className="modal-content">
                <p>New wallet created!</p>
                </div>
            </div>
            
        </div>
    )
}

export default WalletModal;