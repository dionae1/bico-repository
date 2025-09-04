import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import { register, login } from "../services/auth";

function SignupPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await register(name, email, password);

            if (response["success"] === true) {
                const loginSuccess = await login(email, password);

                if (loginSuccess) {
                    navigate("/home");
                }
            }

        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="shadow-lg/10 p-10 rounded-lg bg-white w-2/5">
                    <form action="" className="flex flex-col justify-center m-auto mb-5 mt-10 w-3/4" onSubmit={handleSignup}>
                        <label htmlFor="name" className="text-2xl mb-1">Name</label>
                        <input type="text" id="name" placeholder="Name" className="mb-6 p-2 border border-gray-300 rounded" value={name} onChange={(e) => setName(e.target.value)} />

                        <label htmlFor="email" className="text-2xl mb-1">Email</label>
                        <input type="text" id="email" placeholder="Email" className="mb-6 p-2 border border-gray-300 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="password" className="text-2xl mb-1">Password</label>
                        <input type="password" id="password" placeholder="Password" className="mb-6 p-2 border border-gray-300 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Button title="Sign Up" func={handleSignup} variant="login" />
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignupPage;
