import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import PasswordInput from "../components/shared/PasswordInput";
import TextInput from "../components/shared/TextInput";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useCookies } from "react-cookie";

const SignupComponent = () => {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cookie, setCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const signUp = async () => {
        if (email !== confirmEmail) {
            alert(
                "Email and confirm email fields must match. Please check again"
            );
            return;
        }
        const data = {email, password, username, firstName, lastName};
        const response = await makeUnauthenticatedPOSTRequest(
            "/auth/register",
            data
        );
        if (response && !response.err) {
            const token = response.token;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            setCookie("token", token, {path: "/", expires: date});
            alert("Success");
            navigate("/home");
        } else {
            alert("Failure");
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div class="w-full bg-yellow-500 flex justify-center items-center">
                <img class="h-28 items-center" src="/flare-logo.png"></img>
            </div>
            <div className="inputRegion w-1/3 py-2 items-center justify-center flex flex-col">
                <div className="font-bold flex flex-col justify-center items-center my-9 mt-15">Sign Up for free to start Listening.</div>
                <TextInput 
                    label="Email address" 
                    placeholder="Enter your Email address" 
                    value = {email}
                    setValue = {setEmail}
                />
                <TextInput 
                    label="Confirm Email address" 
                    placeholder="Enter your Email address again" 
                    value = {confirmEmail}
                    setValue = {setConfirmEmail}
                />
                <TextInput 
                    label="Username" 
                    placeholder="Enter a username" 
                    value = {username}
                    setValue = {setUsername}
                />
                <PasswordInput 
                    label="Create Password" 
                    placeholder="Enter a strong password here" 
                    value = {password}
                    setValue = {setPassword}
                />
                <div className="w-full flex justify-between items-center space-x-4">
                    <TextInput 
                        label="First Name" 
                        placeholder="Enter first name" 
                        value = {firstName}
                        setValue = {setFirstName}
                    />
                    <TextInput 
                        label="LastName" 
                        placeholder="Enter last name" 
                        value = {lastName}
                        setValue = {setLastName}
                    />
                </div>
    
                <div className="flex w-full items-center justify-center">
                    <button className="bg-flare-light-blue p-3 px-10 mt-6 rounded-full font-semibold" onClick={(e) => {
                        e.preventDefault();
                        signUp();
                    }}>SIGN UP</button>
                </div>
                <div className="text-xl focus-within:font-bold flex flex-col justify-center items-center mt-6">Have an account?</div>
                <div className="flex w-full items-center justify-center">
                    <button className="bg-flare-dark-blue w-full p-4 px-10 my-3 rounded-full font-semibold text-white">
                        <Link to="/login">LOGIN TO FLARE </Link>
                    </button>
                </div>
            </div>

        </div>
    );
}

export default SignupComponent;