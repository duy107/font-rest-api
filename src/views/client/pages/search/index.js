import CompanyList from "../../../../components/CompanyList";
import SearchForm from "./searchForm"
import SkillList from "../../../../components/SkillList";

function SearchJob() {
    return (
        <>
            <SearchForm />
            <SkillList />
            <CompanyList />
        </>
    );
}
export default SearchJob;