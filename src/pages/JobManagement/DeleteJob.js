import { Button, Popconfirm } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { del } from "../../services/admin/job-management.services";
function DeleteJob({item, reload, displayNotification}) {
    const handleDelete = async () => {
        const id = item._id;
        const res = await del({id});
        if(res.status === 200){
            displayNotification({
                type: "success",
                infor: {
                    message: res.data.message,
                    duration: 2
                }
            })
            reload();
        }else{
            displayNotification({
                type: "error",
                infor: {
                    message: res.data.message,
                    duration: 2
                }
            })
        }
    }
    return (
        <>
            <Popconfirm
                title="Xóa job"
                description="Bạn chắc chắn muốn xóa?"
                onConfirm={handleDelete}
            >
                <Button icon={<AiOutlineDelete />} danger></Button>
            </Popconfirm>
        </>
    );
}

export default DeleteJob;