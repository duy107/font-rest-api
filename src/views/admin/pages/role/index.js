import moment from "moment";
import { notification, Table, Tag } from "antd";
import { useState, useEffect } from "react";
import { roles as role } from "../../../../services/admin/role.services";
import UpdateRole from "./update";
import DeleteRole from "./delete";
import CreateRole from "./create";
import { useSelector } from "react-redux";
function Role() {
  // const [api, contextHolder] = notification.useNotification();
  const [roles, setRoles] = useState([]);
  const permission = useSelector(state => state.permission);
  const fetchApi = async () => {
    const res = await role();
    setRoles(res.roles);
  }
  useEffect(() => {
    fetchApi();
  }, [])
  const handleReload = () => {
    fetchApi();
  }
  // const displayNotification = (data) => {
  //     const {type, infor} = data;
  //     api[type](infor);
  // }
  const columns = [
    {
      title: 'Tên quyền',
      dataIndex: "idRole",
      key: 'idRole',
      render: (_, record) => (
        <span>{record.title}</span>
      )
    },
    {
      title: 'Mô tả',
      dataIndex: "description",
      key: 'description',
      render: (_, record) => (
        <span>{record.description}</span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <>
            <div className="d-flex gap-2">
              {permission.includes("role_edit") &&
                <UpdateRole item={record} reload={handleReload} />
              }
              {permission.includes("role_delete") &&
                <DeleteRole item={record} reload={handleReload} />
              }
            </div>
          </>
        )
      }
    }
  ];
  return (
    <>
      <div className="mb-1 d-flex justify-content-between align-items-center py-2">
        <h2 className="my-0">Quản lý nhóm quyền</h2>
        {permission.includes("role_add") &&
          <CreateRole reload={handleReload} />
        }
      </div>
      {/* {contextHolder} */}
      <Table columns={columns} dataSource={roles} rowKey={"id"} />
    </>
  );
}

export default Role;