import { Outlet } from "react-router-dom";
import {Container} from "react-bootstrap"
import "./style.scss";
function Main() {
    return (  
        <>
            <main className="main">
                {/* <div className="contaier">
                    <Outlet />
                </div> */}
                <Container>
                    <Outlet/>
                </Container>
            </main>
        </>
    );
}

export default Main;