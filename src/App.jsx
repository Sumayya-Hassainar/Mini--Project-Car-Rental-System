import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import Booking from "./page/Booking";
import Register from "./page/Register";
import Contact from "./page/Contact";
import Layout from "./components/Layout";
import Cars from "./page/Cars";
import ReportIssue from "./page/ReportIssue";
import AgencyDashboard from "./agency/AgencyDashboard";
import ProtectedRoute from "./router/ProtectedRoute";
import IssueManagement from "./agency/IssueManagement";
import { useTheme } from "./context/ThemeContext";
import ErrorPage from "./page/ErrorPage";
import BookingStatus from "./agency/BookingStatus";

// 👉 Import new pages
import PaymentPage from "./page/PaymentPage";
import ConfirmationPage from "./page/ConfirmationPage";
import CarTracking from "./page/CarTracking";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const { theme } = useTheme(); // get theme value

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout setSearchTerm={setSearchTerm} />,
            errorElement: <ErrorPage />,
            children: [
                { path: "/", element: <Home /> },
                { path: "register", element: <Register /> },
                { path: "contact", element: <Contact /> },
                { path: "cars", element: <Cars searchTerm={searchTerm} /> },

                // User Routes
                {
                    path: "booking",
                    element: (
                        <ProtectedRoute allowedRoles={["individual"]}>
                            <Booking />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "payment",
                    element: (
                        <ProtectedRoute allowedRoles={["individual"]}>
                            <PaymentPage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "confirmation",
                    element: (
                        <ProtectedRoute allowedRoles={["individual"]}>
                            <ConfirmationPage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "report-issue",
                    element: (
                        <ProtectedRoute allowedRoles={["individual"]}>
                            <ReportIssue />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "car-tracking",
                    element: (
                        <ProtectedRoute allowedRoles={["individual"]}>
                            <CarTracking/>
                        </ProtectedRoute>
                    ),
                },


                // Agency Routes
                {
                    path: "agencydashboard",
                    element: (
                        <ProtectedRoute allowedRoles={["agency"]}>
                            <AgencyDashboard />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "issuemanagement",
                    element: (
                        <ProtectedRoute allowedRoles={["agency"]}>
                            <IssueManagement />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "booking-status",
                    element: (
                        <ProtectedRoute allowedRoles={["agency"]}>
                            <BookingStatus />
                        </ProtectedRoute>
                    ),
                },
            ],
        },
    ]);

    return (
        <div
            className={
                theme === "dark"
                    ? "bg-gray-900 text-white min-h-screen"
                    : "bg-white text-black min-h-screen"
            }
        >
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
