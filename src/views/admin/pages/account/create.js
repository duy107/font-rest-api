import { useState, useEffect } from 'react';
import {roles as role} from "../../../../services/admin/role.services";
import { message } from 'antd';
import { accountCreate } from '../../../../services/admin/company.services';
function CreateAccount() {
    const [messageApi, contextHolder] = message.useMessage();
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await role();
            if(res.code === 200){
                setRoles(res.roles);
            }
        }
        fetchApi();
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            "name": formData.get("name"),
            "phone": formData.get("phone"),
            "email": formData.get("email"),
            "password": formData.get("password"),
            "role_id": formData.get("role_id"),
        }
        const res = await accountCreate(data);
        if(res.code === 200){
            messageApi.success(res.message);
            e.target.reset();
        }else{
            messageApi.error(res.message)
        }
    }
    return (
        <>
            {contextHolder}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mx-auto">
                        <div className="card mt-2 mx-auto p-4 bg-light">
                            <div className="card-body bg-light">
                                <div className="container">
                                    <form id="contact-form" role="form" onSubmit={handleSubmit}>
                                        <div className="controls">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="form_name">Họ tên</label>
                                                        <input
                                                            id="form_name"
                                                            type="text"
                                                            name="name"
                                                            className="form-control"
                                                            placeholder="Please enter your name"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="form_lastname">Số điện thoại</label>
                                                        <input
                                                            id="form_lastname"
                                                            type="text"
                                                            name="phone"
                                                            className="form-control"
                                                            placeholder="Please enter your phone"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="form_email">Email</label>
                                                        <input
                                                            id="form_email"
                                                            type="email"
                                                            name="email"
                                                            className="form-control"
                                                            placeholder="Please enter your email"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="form_need">Mật khẩu</label>
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            className='form-control'
                                                            placeholder='Please enter password'
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="permission">Phân quyền</label>
                                                        <select id="permission" name="role_id" className='form-control' defaultValue="">
                                                            <option disabled selected value="">--Chọn quyền--</option>
                                                            {roles.length > 0 && roles.map(item => (
                                                                <option value={item._id} key={item._id}>{item.title}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mt-3">
                                                    <input
                                                        type="submit"
                                                        className="btn btn-success btn-send pt-2 w-100 btn-sm"
                                                        value="Tạo tài khoản"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateAccount;
