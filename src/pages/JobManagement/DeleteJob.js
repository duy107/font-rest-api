import { Button, Popconfirm } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteJob } from "../../services/jobService";
function DeleteJob({item, reload}) {
    const handleDelete = async () => {
        const res = await deleteJob(item.id);
        if(res){
            reload();
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