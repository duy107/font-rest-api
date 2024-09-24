import { Button, Popconfirm } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteCv } from "../../services/cvService";
function DeleteCV({item ,reload}) {
    const handleDelete = async () =>{
        const res = await deleteCv(item.id);
        if(res){
            reload();
        }
    }
    return (
        <>
            <Popconfirm
                title="Xóa CV"
                description="Bạn chắc chắn muốn xóa?"
                onConfirm={handleDelete}
            >
                <Button icon={<AiOutlineDelete />} danger></Button>
            </Popconfirm>
        </>
    );
}

export default DeleteCV;