import { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { checkEmail, checkExits, resetPassword } from '../../services/userService';
import { notification } from 'antd';

function ForgetPassword() {
    const [api, contextHolder] = notification.useNotification();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleConfirm = async (e) => {
        e.preventDefault();
        const pattern = /(?=.*\d)(?=.*\W)(?=.*[A-Z]).{8,}/;
        const email = e.target[0].value;
        const newPass = e.target[1].value;
        const confirmNewPass = e.target[2].value;
        const isExist = await checkExits('email', email);
        if (isExist.length === 0) {
            api.error({
                message: `Email không tồn tại!`,
                duration: 1,
            });
        } else if (!pattern.test(newPass)) {
            api.error({
                message: `Mật khẩu tối thiểu 8 ký tự (ít nhất 1 số, 1 ký tự đặc biệt, 1 chữ hoa)!`,
                duration: 2,
            });
        } else if (newPass !== confirmNewPass) {
            api.error({
                message: `Mật khẩu không khớp!`,
                duration: 2,
            });
        } else {
            const id = isExist[0].id;
            const options = {
                "password": newPass
            }
            const res = await resetPassword(id, options);
            if (res) {
                api.success({
                    message: `Thay đổi mật khẩu thành công!`,
                    duration: 2,
                });
                setTimeout(() => {
                    setShow(false)
                }, 1000);
            }
        }

    }
    return (
        <>
            {contextHolder}

            <div className='login__form--forgetPass'>
                <Button variant="text" onClick={handleShow} className="p-0 border-0 text-decoration-underline">
                    Forgot Password?
                </Button>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Vui lòng nhập thông tin bên dưới
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleConfirm}>
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" >
                            <Form.Control type="email" placeholder='Email address' />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingNewPassword" label="New password" className='mb-3'>
                            <Form.Control type="password" placeholder='New password' />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingConfirmNewPassword" label="Confirm new password" className='mb-3'>
                            <Form.Control type="password" placeholder='Confirm new password' />
                        </FloatingLabel>

                        <Button variant="primary" type="submit" className="w-100">
                            Confirm
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default ForgetPassword;