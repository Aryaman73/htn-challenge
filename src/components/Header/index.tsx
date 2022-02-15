import logo from "../../assets/logo.svg";
import "./index.css";

function Header() {
    return (
        <div className="header">
            <img className="logo" src={logo} alt="Logo" />
            HackTheNorth Schedule
        </div>
    )
}

export default Header;