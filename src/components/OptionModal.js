import React from 'react'
import Modal from 'react-modal'

const OptionModal = (props) => (
    <div>
        <Modal
            isOpen={!!props.selectedOption}
            onRequestClose={props.handleClearSelectedOption}
            contentLabel="Selected Option"
            closeTimeoutMS={200}
            className="modal"
        >
            <h1 className = "modal__title" >We have decided:</h1>
            <h3>You should do...</h3>
            {props.selectedOption && <p className="modal__body">{ props.selectedOption }</p>}
            <button className="button" onClick={props.handleClearSelectedOption}>Close</button>
        </Modal>
    </div>
    )

export default OptionModal