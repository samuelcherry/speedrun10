import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password
        });
      const uuid = authData.user.id;
      if (authError) {
        throw authError;
      }

      const { data: userData, error: userError } = await supabase
        .from("Users")
        .select("*")
        .eq("uuid", uuid)
        .single();

      if (userError) {
        throw userError;
      }

      localStorage.setItem("uuid", uuid);
      const displayName = localStorage.setItem(
        "displayName",
        userData.displayName
      );
      navigate("/main");
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    navigate("/register");
  };
  return (
    <div>
      <form className="formContainer" onSubmit={handleLogin}>
        <div className="formInputs">
          <div className="eachInput">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="eachInput">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="formButtons">
          <button className="styleButton" type="submit">
            {" "}
            Login{" "}
          </button>
          <button className="styleButton" onClick={handleRegister}>
            {" "}
            Register{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
