import React, { useState } from "react";

function Register() {
    const [formData, setFormData] = useState({
        role: "Individual",
        name: "",
        email: "",
        password: "",
        phonenumber: "",
        companyName: "",
        licenseNumber: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("userData", JSON.stringify(formData))
        alert("Registration successful!")
        console.log(formData)
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Registration Form
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Role Selection */}
                    <div>
                        <label className="block font-medium mb-1">Register As</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            <option value="Individual">Individual</option>
                            <option value="Agency">Agency</option>
                        </select>
                    </div>

                    {/* Common Fields */}
                    <div>
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Phone No:</label>
                        <input
                            type="tel"
                            name="number"
                            placeholder="Enter your Phone Number.."
                            value={formData.phonenumber}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                    </div>

                    {/* Extra fields for Agencies */}
                    {formData.role === "Agency" && (
                        <>
                            <div>
                                <label className="block font-medium mb-1">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="Enter company name"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-medium mb-1">License Number</label>
                                <input
                                    type="text"
                                    name="licenseNumber"
                                    placeholder="Enter license number"
                                    value={formData.licenseNumber}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register;
