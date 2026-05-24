import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { RegisterForm } from "../components/RegisterForm";
import { OtpForm } from "../components/OtpForm";
import fondoImg from "../../../assets/img/fondo.jpg";

export const AuthPage = () => {
    const [currentView, setCurrentView] = useState("login");
    const [otpPayload, setOtpPayload] = useState(null);

    const navigate = (view, payload = null) => {
        setCurrentView(view);
        setOtpPayload(payload);
    };

    return (
        <div className="auth-body" style={{ backgroundImage: `url(${fondoImg})` }}>
            {currentView === "login" && <LoginForm onNavigate={navigate} />}
            {currentView === "register" && <RegisterForm onNavigate={navigate} />}
            {currentView === "recover" && <ForgotPasswordForm onNavigate={navigate} />}
            {currentView === "otp" && <OtpForm onNavigate={navigate} otpPayload={otpPayload} />}
        </div>
    );
};
