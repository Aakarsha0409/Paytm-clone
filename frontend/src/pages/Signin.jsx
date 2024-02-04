import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { Inputbox } from "../components/Inputbox";
import { Button } from "../components/Button";
import { Bottomwarning } from "../components/Bottomwarning";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Signin = () => {
    const navigate = useNavigate();
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const Clickfunc = async() => {
        try {
            const requestBody = {
                Username,
                Password
            };
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", requestBody);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");  
        } catch (error){
            alert("Wrong username or Password");
        }
    };
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <Subheading label={"Enter your credentials to access your account"} />
        <Inputbox onChange={(e) => setUsername(e.target.value)} placeholder="aakarsha@gmail.com" label={"Email"} />
        <Inputbox onChange={(e) => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={Clickfunc} label={"Sign in"} />
        </div>
        <Bottomwarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
};
