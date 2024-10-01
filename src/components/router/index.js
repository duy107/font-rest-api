import LayoutDefault from "../layout/LayoutDefault";
import Search from "../../pages/Search";
import JobDetail from "../../pages/JobDetail";
import Company from "../../pages/Company";
import CompanyDetail from "../../pages/Company/CompanyDetail";
import Register from "../../pages/Register";
import Signin from "../../pages/Signin";
import Logout from "../../pages/Logout";
import LayoutAdmin from "../layout/LayoutAdmin/index";
import PrivateRouter from "../PrivateRouter"
import DashBoard from "../../pages/DashBoard";
import InforCompany from "../../pages/InforCompany";
import JobManagement from "../../pages/JobManagement";
import CreateJob from "../../pages/CreateJob";
import CvManagement from "../../pages/CvManagement";
import HomeUser from "../../pages/Home/HomeUser";
import HomeAdmin from "../../pages/Home/HomeAdmin";
import SearchJob from "../../pages/SearchJob";
import UserSignin from "../../pages/Signin/UserSignin";
import CompanySigin from "../../pages/Signin/CompanySignin";

export const router = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <HomeUser />
            },
            {
                path: "search-job",
                element: <SearchJob />
            },
            {
                path: "result",
                element: <Search />
            },
            {
                path: "jobs/:id",
                element: <JobDetail />
            }
            ,
            {
                path: "company",
                element: <Company />
            },
            {
                path: "company/:id",
                element: <CompanyDetail />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "signin",
                element: <Signin />,
                children: [
                    {
                        path: "user_signin",
                        element: <UserSignin />
                    },
                    {
                        path: "company_signin",
                        element: <CompanySigin />
                    }
                ]
            },
            {
                path: "logout",
                element: <Logout />
            },
            {
                path: "home-admin",
                element: <HomeAdmin />
            }
        ]
    },
    // private layout
    {
        element: <PrivateRouter />,
        children: [
            {
                element: <LayoutAdmin />,
                children: [
                    {
                        path: "admin",
                        children: [
                            {
                                path: "overview",
                                element: <DashBoard />
                            },
                            {
                                path: "infor-company",
                                element: <InforCompany />
                            },
                            {
                                path: "job-management",
                                element: <JobManagement />
                            },
                            {
                                path: "cv-management",
                                element: <CvManagement />
                            }
                        ]
                    },
                    {
                        path: "create-job",
                        element: <CreateJob />
                    },
                    {
                        path: "detail-job/:id",
                        element: <JobDetail />
                    }
                    // ,
                    // {
                    //     path: "detail-cv:id",
                    //     element: <CvDetail />
                    // }
                ]
            }
        ]
    }
]
