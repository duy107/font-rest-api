import { Outlet, useNavigate } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import "./style.scss";

function Signin() {
    const navigate = useNavigate();

    const handleSelect = (key) => {
        navigate(key === "user" ? "user_signin" : "company_signin");
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
