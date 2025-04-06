import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const handleBack = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            displayName: displayName
          }
        }
      });

      if (authError) {
        throw authError;
      }
      const uuid = authData.user.id;

      const { data: userData, error: userError } = await supabase
        .from("Users")
        .insert({
          uuid,
          displayName
        });
      if (userError) {
        throw userError;
      }
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  return (
    <div>
      <form className="formContainer" onSubmit={handleRegister}>
        <div className="formInputs">
          <div className="eachInput">
            <label htmlFor="displayName">Display Name</label>
            <input
              type="displayName"
              value={displayName}
              required
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
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
            Register{" "}
          </button>
          <button className="styleButton" onClick={handleBack}>
            {" "}
            Back{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
