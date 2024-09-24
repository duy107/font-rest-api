import { Button } from "antd";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ListJob from "./ListJob";
function JobManagement() {
    return (
        <>
            <h1>Quản lý công việc</h1>
            <Link to={"/create-job"}><Button icon={<FaPlus/>}>Tạo mới công việc</Button></Link>
            <div><ListJob /></div>
        </>
    );
}

export default JobManagement;