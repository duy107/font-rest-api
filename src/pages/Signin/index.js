import { Outlet, useNavigate } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import "./style.scss";
import { loginGet } from "../../services/admin/company.services";

function Signin() {
    const isLogin = async () => {
        const res = await loginGet();
        if (res.code === 400) {
            navigate("/admin/overview");
            return;
        }
    }
    isLogin();
    const navigate = useNavigate();
    const handleSelect = (key) => {
        navigate(key === "user" ? "/login" : "/admin/login");
    };
    return (
        <>
            <div className="login">
                <div className="login__main">
                    <Tabs
                        id="uncontrolled-tab-example"
                        className="mb-3 justify-content-between"
                        onSelect={handleSelect}
                    >
                        <Tab eventKey="user" title="User" className="w-100">
                        </Tab>
                        <Tab eventKey="company" title="Company" className="w-100">
                        </Tab>
                    </Tabs>
                    <div className="login__form">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signin;
