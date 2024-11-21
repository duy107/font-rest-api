// import { getCookie } from "../../../helpers/cookie";
// import { useState, useEffect } from "react";
// import { getListCv } from "../../../services/cvService";
// import { Col, Row } from "antd";
// import { Pie, Column } from '@ant-design/plots';
// import { getListJob } from "../../../services/jobService";

// function HomeAdmin() {
//     const idCompany = getCookie("id");
//     const [data, setData] = useState([]);
//     const [listJob, setListJob] = useState([]);
//     useEffect(() => {
//         const fetchApi = async () => {
//             const job = await getListJob(idCompany);
//             if (job) {
//                 const result = job.reduce((total, item) => {
//                     const name = (item.status) ? "Job bật" : "Job tắt";
//                     const time = item.createAt.slice(3, 10);
//                     const update = total.find(item => item.name === name && item.time === time);
//                     if (update) {
//                         update.quantity++;
//                     } else {
//                         total.push({
//                             name: name,
//                             time: time,
//                             quantity: 1
//                         })
//                     }
//                     return total;
//                 }, []);
//                 setListJob(
//                     result.sort((a, b) => {
//                         const monthA = a.time.split('-').map(Number)[0];
//                         const monthB = b.time.split('-').map(Number)[0];
//                         return monthA - monthB
//                     })
//                 );
//             }
//         }
//         fetchApi();
//     }, []);

//     console.log(listJob);
//     useEffect(() => {
//         const fetchApi = async () => {
//             const res = await getListCv(idCompany);
//             if (res) {
//                 const obj = res.reduce((total, item) => {
//                     if (item.accepted) {
//                         total.statusAccept++;
//                     } else if (item.statusRead) {
//                         total.statusTrue++;
//                     } else {
//                         total.statusFalse++;
//                     }
//                     return total;
//                 }, { statusTrue: 0, statusFalse: 0, statusAccept: 0 });
//                 const types = ['Số CV đã đọc', 'Số CV chưa đọc', 'Số CV đã chấp nhận'];
//                 const result = Object.values(obj).map((item, index) => {
//                     return {
//                         type: types[index],
//                         value: item
//                     }
//                 })
//                 setData(result);
//             }
//         }
//         fetchApi();
//     }, []);
//     const config = {
//         data,
//         angleField: "value",
//         colorField: "type",
//         label: {
//             text: 'type',
//             style: {
//                 fontWeight: 'bold',
//             },
//         },
//         legend: {
//             color: {
//                 title: true,
//                 position: 'right',
//                 rowPadding: 7
//             },
//         },
//     };
//     const config1 = {
//         data: listJob,
//         xField: 'time',
//         yField: 'quantity',
//         colorField: 'name',
//         group: true,
//         style: {
//             inset: 2,
//         },
//         legend: {
//             color: {
//                 title: false,
//                 position: 'right',
//             },
//         },
//     };
    

//     return (
//         <>
//             <Row gutter={[20, 20]}>
//                 <Col span={12}>
//                     {data && <Pie {...config} />}
//                 </Col>
//                 <Col span={12}>
//                     <Column {...config1} />
//                 </Col>
//             </Row>
//         </>
//     );
// }

// export default HomeAdmin;