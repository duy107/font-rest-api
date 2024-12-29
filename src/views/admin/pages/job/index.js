import { Button } from "antd";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ListJob from "./ListJob";
import { useSelector } from "react-redux";
function JobManagement() {
    const permission = useSelector(state => state.permission);
    return (
        <>
            <h1>Quản lý công việc</h1>
            {permission.includes("job_add") &&
                <Link to={"create"}><Button type="primary" icon={<FaPlus/>}>Tạo mới công việc</Button></Link>
            }
            <div className="mt-[15px]"><ListJob /></div>
        </>
    );
}

export default JobManagement;