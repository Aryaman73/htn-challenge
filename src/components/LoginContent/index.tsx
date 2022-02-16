import { useState } from "react";
import logo from "../../assets/logo.svg";

import './index.css';

type Props = {
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
}

const username = "username";
const password = "password";

function LoginContent({ setIsLoggedIn, setModal }: Props) {
    // In an actual app, I would use <form> and a form library like ReactHookForms, Formik or Informed
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [wrongPassword, setWrongPassword] = useState<boolean>(false);

    return (
        <div className="login-main">
            <img className="login-logo" src={logo} alt="Logo" />

            <label className="login-label" htmlFor="login"> Username: </label>
            <input
                className="login-input"
                type="text"
                id="login"
                name="login"
                onBlur={event => setUsernameInput(event.target.value)}
            />
            <label className="login-label" htmlFor="password"> Password: </label>
            <input
                className="login-input"
                type="password"
                id="password"
                name="password"
                onBlur={event => setPasswordInput(event.target.value)}
            />
            <div>
                <button
                    type="submit"
                    className="login-button"
                    onClick={() => {
                        if (usernameInput === username && passwordInput === password) {
                            setIsLoggedIn(true);
                            setWrongPassword(false);
                            setModal(false);
                        } else {
                            setWrongPassword(true);
                        }
                    }}
                >
                    Log In
                </button>
            </div>
            {wrongPassword && <p className="login-invalid-credentials"> Invalid Credentials. <br /> Hint: It's 'username' and 'password' 😉 </p>}
        </div>
    )
}

export default LoginContent;