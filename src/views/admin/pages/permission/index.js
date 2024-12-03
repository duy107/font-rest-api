import { useEffect, useState } from "react";
import { roles } from "../../../../services/admin/role.services";
import * as Per  from "../../../../components/Permission";
import {handleUpdate, handleChecked} from "../../../../helpers/permission";
function Permission() {
    const [role, setRole] = useState([]);
    const [value, setValue] = useState([["job_view", "job_add", "job_edit", "job_delete"],
                                        ["cv_view", "cv_accpet", "cv_delete"],
                                        ["role_view", "role_add", "role_edit", "role_delete", "role_permission"],
                                        ["account_view", "account_add", "account_edit", "account_delete"]]);
    const [title, setTitle] = useState([["Xem", "Thêm", "Sửa", "Xóa"],
                                        ["Xem", "Duyệt", "Xóa"],
                                        ["Xem","Thêm", "Sửa", "Xóa", "Phân quyền"]]);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await roles();
            if (res.roles.length > 0) {
                setRole(res.roles);
            }
        }
        fetchApi();
    }, []);
    useEffect(() => {
        if(role.length > 0){
            handleChecked();
        }
    }, [role]);
    return (
        <>
            {role.length > 0 &&
                <>
                    <button className="btn btn-sm btn-primary mb-2" onClick={handleUpdate}>Cập nhật</button>
                    <div data-records={JSON.stringify(role)}></div>
                    <table className="table table-hover table-sm" table-permission="">
                        <thead>
                            <th >Tính năng</th>
                            {role.map(item => (
                                <th className="text-center" key={item._id}>{item.title}</th>
                            ))}
                        </thead>
                        <tbody>
                            <tr data-name="id" className="d-none">
                                <td></td>
                                {role.map(item => (
                                    <td key={item._id} className="text-center">
                                        <input value={item._id}/>
                                    </td>
                                ))}
                            </tr>
                            {/* <tr data-name="all">
                                <td>Tất cả</td>
                                {role.map(item => (
                                    <td key={item._id} className="text-center">
                                        <input type="checkbox"/>
                                    </td>
                                ))}
                            </tr> */}
                            <Per.default role={role} title="Công việc" value={value[0]} name={title[0]}/>
                            <Per.default role={role} title="CV" value={value[1]} name={title[1]}/>
                            <Per.default role={role} title="Nhóm quyền" value={value[2]} name={title[2]}/>
                            <Per.default role={role} title="Tài khoản" value={value[3]} name={title[0]}/>
                        </tbody>
                    </table >
                </>
            }

        </>
    );
}

export default Permission;