import { Button, Modal } from 'react-bootstrap'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useVerifyPhoneMutation } from 'app/modules/services/profile';


// Schema for yup
const otpSchema = Yup.object().shape({
    otp: Yup.string().trim().required("OTP is required.")
});

const VerifyModal = ({ showOTP, handleClose, phoneValue, setVerifyPhone }) => {

    const [updateVerifyPhone, { isLoading }] = useVerifyPhoneMutation()
    const formik = useFormik({
        initialValues: {
            otp: ''
        },
        validationSchema: otpSchema,
        onSubmit: async (values) => {
            const val = { ...values, ...phoneValue }
            const { data, error } = await updateVerifyPhone(val)
            if (data?.success) {
                handleClose()
                setVerifyPhone(true)
                toast.success(data?.message)
            } else {
                toast.error(data?.message)
            }

            if (!error?.data?.success) {
                toast.error(error?.data?.message)
            }
        },
    });

    return (
        <>
            <Modal show={showOTP} onHide={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <Modal.Header closeButton>
                        <h5 className="modal-title">Two-Step Verification</h5>
                    </Modal.Header>
                    <Modal.Body>

                        <p className='mb-4'>For added security, please enter the One Time Password (OTP) that has been sent to a phone number ending in United States.</p>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" htmlFor="OTP">Enter OTP</label>
                            <div className="col-sm-8">
                                <div>
                                    <input className="form-control" data-val="true" data-val-length="Maximum length is 50." data-val-length-max="50" data-val-required="OTP is required." id="OTP" name="otp" placeholder="" type="text" value={formik.values.otp} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik?.touched?.otp && formik?.errors?.otp ? (
                                        <span className={formik?.errors?.otp ? `` : `d-none`}>
                                            <label className="pl-1 text-danger">{formik?.errors?.otp}</label>
                                        </span>
                                    ) : null}
                                </div>
                                <span className="field-validation-valid material-validate" data-valmsg-for="OTP" data-valmsg-replace="true"></span>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-primary main-btn-style' type='submit' disabled={isLoading}>
                            {!isLoading && 'Submit'}
                            {isLoading && (
                                <span className='indicator-progress' style={{ display: 'block' }}>
                                    Please wait...{' '}
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                            )}
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default VerifyModal;