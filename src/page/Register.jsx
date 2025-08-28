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
    });

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const validateForm = () => {
        let newErrors = {}

        // Name validation
        if (!formData.name || formData.name.length < 3) {
            newErrors.name = "Name must be at least 3 characters long"
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid email address"
        }

        // Password validation
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long"
        }

        // Phone validation (only if filled, allow 10 digits)
        const phoneRegex = /^\d{10}$/
        if (!formData.phonenumber || !phoneRegex.test(formData.phonenumber)) {
            newErrors.phonenumber = "Enter a valid 10-digit phone number"
        }

        // Agency-specific validation
        if (formData.role === "Agency") {
            if (!formData.companyName) {
                newErrors.companyName = "Company Name is required for Agency"
            }
            if (!formData.licenseNumber) {
                newErrors.licenseNumber = "License Number is required for Agency"
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; 
        }

        localStorage.setItem("userData", JSON.stringify(formData))
        alert("Registration successful!")
        console.log(formData);
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
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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

                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Phone No:</label>
                        <input
                            type="tel"
                            name="phonenumber"
                            placeholder="Enter your Phone Number"
                            value={formData.phonenumber}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                        {errors.phonenumber && (
                            <p className="text-red-500 text-sm">{errors.phonenumber}</p>
                        )}
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
                                {errors.companyName && (
                                    <p className="text-red-500 text-sm">{errors.companyName}</p>
                                )}
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
                                {errors.licenseNumber && (
                                    <p className="text-red-500 text-sm">{errors.licenseNumber}</p>
                                )}
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
