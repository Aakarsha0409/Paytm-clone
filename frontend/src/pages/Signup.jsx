import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { Bottomwarning } from "../components/Bottomwarning";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const Signup = () => {
    const [Firstname, setFirstName] = useState("");
    const [Lastname, setLastName] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <Subheading label={"Enter your details to create an account"} />
                <Inputbox onChange={e => {
                setFirstName(e.target.value);
                }} placeholder="Aakarsha" label={"First Name"} />
                <Inputbox onChange={(e) => {
                setLastName(e.target.value);
                }} placeholder="Singla" label={"Last Name"} />
                <Inputbox onChange={e => {
                setUsername(e.target.value);
                }} placeholder="aakarsha@gmail.com" label={"Email"} />
                <Inputbox onChange={(e) => {
                setPassword(e.target.value)
                }} placeholder="123456" label={"Password"} />
                <div className="pt-4">
                <Button onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    Username,
                    Firstname,
                    Lastname,
                    Password
                    });
                    localStorage.setItem("token", response.data.token)
                    navigate("/dashboard")
                }} label={"Sign up"} />
                </div>
                <Bottomwarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
};
