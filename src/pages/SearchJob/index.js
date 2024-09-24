import CompanyList from "../../components/CompanyList";
import SearchForm from "../../components/layout/SearchForm";
import SkillList from "../../components/SkillList";

export function SearchJob() {
    return (
        <>
            <SearchForm />
            <SkillList />
            <CompanyList />
        </>
    );
}

export default SearchJob;