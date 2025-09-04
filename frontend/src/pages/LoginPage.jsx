import { FaReact } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import Button from "../components/Button";
import welcome from "../assets/images/welcome.png";

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await login(email, password);

            if (data) {
                navigate("/home");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="grid grid-cols-2 place-items-center mx-auto h-auto rounded-lg gap-10">
                    <img src={welcome} alt="Welcome" className="w-full h-auto" />
                    <div className="shadow-lg/10 p-10 rounded-lg bg-white w-full">
                        <div className="flex flex-row items-center justify-center mt-10 space-x-4">
                            <FaReact className="text-5xl text-center" />
                            <h1 className="text-2xl font-bold text-center">CSM</h1>
                        </div>

                        <form action="" className="flex flex-col justify-center m-auto mb-5 mt-10 w-3/4" onSubmit={handleLogin}>
                            <label htmlFor="email" className="text-2xl mb-1">Email</label>
                            <input type="text" id="email" placeholder="Email" className="mb-6 p-2 border border-gray-300 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />

                            <label htmlFor="password" className="text-2xl mb-1">Password</label>
                            <input type="password" id="password" placeholder="Password" className="mb-6 p-2 border border-gray-300 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Button title="Login" func={handleLogin} variant="login" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;