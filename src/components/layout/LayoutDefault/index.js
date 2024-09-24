import Main from "./Main";
import Footer from "./Footer";
import "./style.scss";
import Header from "./Header";
function LayoutDefault() {
    return (
        <>
            <div className="layout__default">
                <Header/>
                <Main />
                <Footer />
            </div>
        </>
    );
}

export default LayoutDefault;