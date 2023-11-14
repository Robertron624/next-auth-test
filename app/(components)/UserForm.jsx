"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const UserForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const res = await fetch("/api/Users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({formData}),
        });
        if (!res.ok) {
            const response = await res.json();
            setError(response.message);
        } else {
            router.refresh();
            router.push("/");
        }
    };

    return (
        <>
            <form
                method="POST"
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 w-1/2"
            >
                <h1>Create a new user</h1>
                <label htmlFor="name">Fullname</label>
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    required
                    className="m-2 bg-slate-400 rounded"
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                    className="m-2 bg-slate-400 rounded"
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                    className="m-2 bg-slate-400 rounded"
                />
                <input type="submit" value="Create User" className="bg-blue-300 hover:bg-blue-100"/>
                <p className="text-red-500">
                    {error}
                </p>
            </form>
        </>
    );
};

export default UserForm;
