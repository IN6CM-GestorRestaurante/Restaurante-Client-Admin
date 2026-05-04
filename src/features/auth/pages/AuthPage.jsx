import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { RegisterForm } from "../components/RegisterForm";
import fondoImg from "../../../assets/img/fondo.jpg";

export const AuthPage = () => {
    const [currentView, setCurrentView] = useState("login");

    return (
        <div className="auth-body" style={{ backgroundImage: `url(${fondoImg})` }}>
            {currentView === "login" && <LoginForm onNavigate={setCurrentView} />}
            {currentView === "register" && <RegisterForm onNavigate={setCurrentView} />}
            {currentView === "recover" && <ForgotPasswordForm onNavigate={setCurrentView} />}
        </div>
    );
};
