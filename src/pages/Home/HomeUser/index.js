import { Button } from "antd";
import { Link } from "react-router-dom";
import { getCookie } from "../../../helpers/cookie";

function HomeUser() {
    const isUser = getCookie("isUser");
    return (
        <>
            <h1>Home user</h1>
            {!!isUser && <Link to={"/search-job"}><Button type="primary">Tìm kiếm job</Button></Link>}
        </>
    );
}

export default HomeUser;