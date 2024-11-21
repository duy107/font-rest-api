import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { otp as Otp } from "../../../../services/client/user.services";
import { message } from "antd";

function OTP() {
    const [messageApi, contextHolder] = message.useMessage();
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;
    useEffect(() => {
        if(!email){
            navigate("/forgot");
        }
    }, [navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const otp = e.target[1].value;
        const res = await Otp({email, otp});
        if (res.code === 200) {
            navigate("/forgot/reset", {state: {email: email}});
        } else {
            messageApi.error(res.message);
        }
    }
    return (
        <>
             {contextHolder}
            <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} readOnly style={{opacity: 0.5}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nhập mã OTP</Form.Label>
                        <Form.Control type="text" placeholder="Enter OTP" required/>
                    </Form.Group>
                    <Button
                        variant="primary" type="submit" >
                        Xác thực OTP
                    </Button>
                </Form>
        </>
    );
}

export default OTP;