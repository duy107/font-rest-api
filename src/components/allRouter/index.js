import { useRoutes } from "react-router-dom";
import { router } from "../router";
function AllRoute() {
    const element = useRoutes(router);
    return (
        <>
            {element}
        </>
    )
}
export default AllRoute;