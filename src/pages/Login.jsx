import React, { useRef, useState } from "react";
import api from "../../axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function Validate() {
    setError(""); // Reset error state

    if (!validateEmail(emailRef.current.value)) {
      setError("Invalid email format.");
      emailRef.current.focus();
      emailRef.current.style.outlineColor = "red";
      return false;
    }

    if (passwordRef.current.value.length < 6) {
      setError("Password must be at least 6 characters.");
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = "red";
      return false;
    }

    return true; // Valid input
  }

  function handleLogin(event) {
    event.preventDefault();

    const isValid = Validate();
    if (!isValid) {
      return;
    }

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setLoading(true);

    api
      .post("/api/auth/login", user, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          setError("Login failed. Please check your credentials.");
        }
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  }

  return (
    <div>
      <form className="w-96 flex flex-col border border-solid border-blue-600 rounded-md p-4 mx-auto my-32 gap-3">
        {error && <p className="text-red-500">{error}</p>}
        <input
          ref={emailRef}
          className="py-2 px-3 rounded-md border border-solid border-blue-400"
          type="text"
          placeholder="Enter email..."
        />
        <input
          ref={passwordRef}
          className="py-2 px-3 rounded-md border border-solid border-blue-400"
          type="password"
          placeholder="Enter password..."
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="py-2 px-3 border-none bg-slate-400 rounded-md text-white"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
