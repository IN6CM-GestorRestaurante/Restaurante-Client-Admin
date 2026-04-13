import { AppRoutes } from "./router/AppRoutes";
import { Toaster } from "react-hot-toast";


function App() {
  return(
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "inherit",
            fontWeight: 600,
            fontSize: "0.95rem",
            borderRadius: "14px",
            background: "rgba(255, 255, 255, 0.86)",
            color: "#292524",
            border: "1px solid rgba(214, 211, 209, 0.85)",
            backdropFilter: "blur(8px)",
            boxShadow: "0 18px 40px -30px rgba(68, 54, 38, 0.9)",
          },
          success: {
            iconTheme: {
              primary: "#7c2d12",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#9f1239",
              secondary: "#fff",
            },
          },
        }}
      />

      <AppRoutes />
    </>
  );
}

export default App;