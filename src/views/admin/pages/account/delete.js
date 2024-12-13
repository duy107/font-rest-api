import { Button, Popconfirm } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { accountDelete } from "../../../../services/admin/company.services";
function DeleteAccount({item, reload}) {
    const handleDelete = async () => {
        const res = await accountDelete({id: item._id});
        if(res.status === 200){
            reload();
        }else {
            
        }
    }
    return (
        <>
             <Popconfirm
                title="Xóa tài khoản"
                description="Bạn chắc chắn muốn xóa?"
                onConfirm={handleDelete}
            >
                <Button icon={<AiOutlineDelete />} danger></Button>
            </Popconfirm>
        </>
    );
}

export default DeleteAccount;