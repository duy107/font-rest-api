import { Button, Popconfirm } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import {del} from "../../../../services/admin/role.services";
function DeleteAccount({item, reload}) {
    const handleDelete = async () => {
        const res = await del({_id: item._id});
        if(res.status === 200){
            reload();
        }
    }
    return (
        <>
             <Popconfirm
                title="Xóa account"
                description="Bạn chắc chắn muốn xóa?"
                onConfirm={handleDelete}
            >
                <Button icon={<AiOutlineDelete />} danger></Button>
            </Popconfirm>
        </>
    );
}

export default DeleteAccount;