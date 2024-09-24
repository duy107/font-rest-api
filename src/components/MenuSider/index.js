import { Menu } from "antd"
import { useEffect } from "react";
import { AiOutlineDashboard, AiOutlineLayout } from "react-icons/ai";
import { GrAppsRounded } from "react-icons/gr";
import { HiOutlineChartPie } from "react-icons/hi2";

import { Link, useNavigate } from "react-router-dom";

function MenuSider() {

    const navigate = useNavigate();

    // handle when reload page
    useEffect(() => {
        // Detect reload and navigate to /admin/infor-company
        const handleReload = (event) => {
            if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
                navigate("/admin/overview");
            }
        };

        window.addEventListener('load', handleReload);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('load', handleReload);
        };
    }, [navigate]);
    

    const items = [
        {
            label: "Tổng quan",
            key: "1",
            icon: <Link to={"/admin/overview"}><AiOutlineDashboard /></Link>,
        },
        {
            label: "Thông tin công ty",
            key: "2",
            icon: <Link to={"/admin/infor-company"}><GrAppsRounded /></Link>,
        },
        {
            label: "Quản lý công việc",
            key: "3",
            icon: <Link to={"/admin/job-management"}><AiOutlineLayout /></Link>
        },
        {
            label: "Quản lý CV",
            key: "4",
            icon: <Link to={"/admin/cv-management"}><HiOutlineChartPie /></Link>
        }
    ]
    return (
        <>
            <Menu
                mode="inline"
                items={items}
                defaultSelectedKeys={['1']}
                theme="light"
            />
        </>
    );
}

export default MenuSider;