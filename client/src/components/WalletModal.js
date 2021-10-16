import React from 'react'

export const WalletModal = ({closeModal}) => {
    return (
        <div className="modal-background">
            <div className="modal-container">
                <button onClick={() => closeModal(false)}> x </button>
                <div className="modal-content"></div>
                <p>New Wallet is created!</p>
            </div>
            
        </div>
    )
}

export default WalletModal;