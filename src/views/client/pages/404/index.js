import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>404 - Trang không tồn tại</h1>
            <p>Rất tiếc, trang bạn tìm kiếm không tồn tại.</p>
            <Link to="/">Quay lại trang chủ</Link>
        </div>
    );
}

export default NotFound;
