
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundWrapper from "../components/BackgroundWrapper";
import ButtonLarge from "../components/ButtonLarge";

const HomePage = ({ user }) => {
  const navigate = useNavigate();

  // Eğer user varsa otomatik yönlendir
  useEffect(() => {
    if (user) {
      if (user.role === "student") navigate("/student");
      else if (user.role === "club") navigate("/club");
    }
  }, [user, navigate]);

  return (
    <BackgroundWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <ButtonLarge text="Sign In" onClick={() => navigate("/login")} />
        <ButtonLarge text="Sign Up" onClick={() => navigate("/signup")} />
      </div>
    </BackgroundWrapper>
  );
};

export default HomePage;
