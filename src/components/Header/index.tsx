import logo from "../../assets/logo.svg";
import "./index.css";

function Header() {
    return (
        <div className="header">
            <img className="logo" src={logo} alt="Logo" />
            Hack the North Schedule
        </div>
    )
}

export default Header;