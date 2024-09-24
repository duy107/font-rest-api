import { Outlet } from "react-router-dom";
import "./style.scss";
function Main() {
    return (  
        <>
            <main className="main">
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </>
    );
}

export default Main;