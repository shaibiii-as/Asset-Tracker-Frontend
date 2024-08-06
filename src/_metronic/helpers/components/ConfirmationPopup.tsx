import React from 'react';
import { Modal } from 'react-bootstrap';

const ConfirmationPopup = (props: any) => {

	return (
		<div >

			<Modal className='confirmation-modal' size="lg" show={props.deleteModal} onHide={props.cancel} backdrop='static' keyboard={false}>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>Delete the Site</h5>
						<div className='btn-close ms-2 cursor-pointer' data-bs-dismiss='modal' aria-label='Close' onClick={() => props.cancel()}></div>
					</div>
					<div className='modal-body'>
						<p className="mb-5">Are you sure you want to delete {props?.setupName}?</p>
						<div className="mb-9 text-danger">
							This action is irreversible
						</div>
						{props.deleteCascade &&
							<div className="mb-9 text-danger">
								Warning: This record has related records in another table do you want to delete all related records?
							</div>
						}
					</div>
					<div className="d-flex justify-content-end flex-wrap modal-footer">
						<button onClick={() => props.cancel()} className="btn btn-light-secondary main-btn-style me-2">Cancel</button>
						<button onClick={() => { props.confirm(); }} className="btn btn-danger">Delete</button>
					</div>
				</div>
			</Modal>

		</div>
	);
};

export default ConfirmationPopup;