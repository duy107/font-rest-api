import { useEffect, useState } from "react";
import { account } from "../../../../services/admin/company.services"
import UpdateAccount from "./update";
import DeleteAccount from "./delete";
import CreateAccount from "./create";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
function Account() {
    const permission = useSelector(state => state.permission);
    const fetchApi = async () => {
        const res = await account();
        if (res.code === 200) {
            setAccounts(res.data);
        }
    }

    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        fetchApi();
    }, [])
    const handleReload = () => {
        fetchApi();
    }
    return (
        <>
            {accounts.length > 0 &&
                <div className="card">
                    <div className="card-header d-flex w-100 align-items-center">
                        <div className="w-50">Danh sách tài khoản</div>
                        {permission.includes("account_add") &&
                            <Link to={"create"}>
                                <button icon={<FaPlus />} className="btn btn-sm btn-success">Tạo tài khoản mới</button>
                            </Link>}
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12">
                                <table className="table table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Họ tên</th>
                                            <th>Email</th>
                                            <th>Phân quyền</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accounts.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role.title}</td>
                                                <td>
                                                    <div className="d-flex gap-2">
                                                        {permission.includes("account_edit") &&
                                                            <UpdateAccount item={item} reload={handleReload} />
                                                        }
                                                        {permission.includes("account_delete") &&
                                                            <DeleteAccount item={item} reload={handleReload} />
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Account;