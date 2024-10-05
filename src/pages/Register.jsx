import React, { useRef } from "react";
import api from "../../axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const emailRef = useRef();
  const fnameRef = useRef();
  const lnameRef = useRef();
  const passwordRef = useRef();
  const repasswordRef = useRef();

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function Validate() {
    if (fnameRef.current.value.length < 3) {
      alert("username yaroqsiz");
      fnameRef.current.focus();
      fnameRef.current.style.outlineColor = "red";
    }
    if (lnameRef.current.value.length < 3) {
      alert("username yaroqsiz");
      lnameRef.current.focus();
      lnameRef.current.style.outlineColor = "red";
      return false;
    }
    if (!validateEmail(emailRef.current.value)) {
      alert("email yaroqsiz");
      emailRef.current.focus();
      emailRef.current.style.outlineColor = "red";
      return false;
    }

    if (passwordRef.current.value != repasswordRef.current.value) {
      alert("parolda muammo bor");
      repasswordRef.current.focus();
      repasswordRef.current.style.outlineColor = "red";
      return false;
    }
    return true;
  }

  function reg_btn(event) {
    event.preventDefault();

    const isValid = Validate();
    if (!isValid) {
      return;
    }

    const user = {
      email: emailRef.current.value,
      firstName: fnameRef.current.value,
      lastName: lnameRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: repasswordRef.current.value,
    };

    api
      .post("/api/auth/register", user, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((data) => {
        navigate("/login");
        if (
          data.data.message ===
          "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tkazildi"
        ) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form className="w-96 flex flex-col border border-solid border-blue-600 rounded-md p-4 mx-auto my-32 gap-3">
        <input
          ref={emailRef}
          className="py-2 px-3 rounded-md border border-solid border-blue-400"
          type="text"
          placeholder="Enter email..."
        />
        <input
          ref={fnameRef}
          className="py-2 px-3 rounded-md border border-solid border-blue-400"
          type="text"
          placeholder="Enter firstname..."
        />
        <input
          ref={lnameRef}
          className="py-2 px-3 rounded-md border border-solid border-blue-400"
          type="text"
          placeholder="Enter lastname..."
        />
        <input
          ref={passwordRef}
          className="py-2 px-3 rounded-md border border-solid border-blue-400"
          type="password"
          placeholder="Enter password..."
        />
        <input
          ref={repasswordRef}
          className="py-2 px-3 rounded-md border border-solid border-blue-400"
          type="password"
          placeholder="Enter replay password..."
        />
        <button
          onClick={reg_btn}
          className="py-2 px-3 border-none bg-slate-400 rounded-md text-white"
        >
          Register
        </button>
        <Link to="/login">loginga otish</Link>
      </form>
    </div>
  );
}

export default Register;
