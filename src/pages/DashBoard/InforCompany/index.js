import { Card } from "antd";
function InforCompany({infor}) {
    return (
        <>
            {<Card title="Thông tin công ty" className="card__item">
                <div className="card__infor">
                    <div>Tên công ty:  <strong>{infor.name}</strong></div>
                    <div>Email: <strong>{infor.email}</strong></div>
                    <div>Số điện thoại: <strong>{infor.phone}</strong></div>
                    <div>Số nhân viên: <strong>{infor.quantityPeople}</strong></div>
                </div>
            </Card>}
        </>
    );
}

export default InforCompany;