import { FaReact } from "react-icons/fa";
import { useState } from "react";
import { login } from "../services/auth";
import Button from "../components/Button";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = await login(email, password);
        if (data) {
            window.location.href = "/home";
        }
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="w-1/4 shadow-lg/10 p-10 rounded-lg bg-white">
                    <div className="flex flex-row items-center justify-center mb-10 space-x-4">
                        <FaReact className="text-5xl text-center" />
                        <h1 className="text-2xl font-bold text-center">CSM</h1>
                    </div>

                    <form action="" className="flex flex-col justify-center m-auto mb-10 mt-10">
                        <label htmlFor="email" className="text-2xl mb-1">Email</label>
                        <input type="text" id="email" placeholder="Email" className="mb-6 p-2 border border-gray-300 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="password" className="text-2xl mb-1">Password</label>
                        <input type="password" id="password" placeholder="Password" className="mb-6 p-2 border border-gray-300 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button title="Login" func={handleLogin} />
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginPage;