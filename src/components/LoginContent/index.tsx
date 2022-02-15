import logo from "../../assets/logo.svg";

import './index.css';

// TODO: Not Any 😡
function LoginContent({ setIsLoggedIn, setModal }: { setIsLoggedIn: any, setModal: any }) {
    return (
        <div className="login-main">
            <img className="login-logo" src={logo} alt="Logo" />

            <label className="login-label" htmlFor="login"> Username: </label>
            <input className="login-input" type="text" id="login" name="login" />
            <label className="login-label" htmlFor="password"> Password: </label>
            <input className="login-input" type="password" id="password" name="password" />
            <div>
                <button
                    className="login-button"
                    onClick={() => {
                        setIsLoggedIn(true);
                        setModal(false);
                    }}
                >
                    Log In
                </button>
            </div>
        </div>
    )
}

export default LoginContent;