import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Login() {
  const navigateTo = useNavigate();
  const [regno, setRegno] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(e) {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:9000/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          regno,
          password,
        }),
      },
      console.log(123)
    );
    const data = await response.json();
    if (data.user) {
      // localStorage.setItem('token', data.user)
      alert(`welcome in competition`);
      navigateTo("/applications");
    } else {
      alert("check your username and password");
    }
    console.log(data);
  }

  return (
    <>
      <Header />
      <div
        className="w3-border w3-round-large w3-white"
        style={{ marginTop: "13%", marginLeft: "35%", marginRight: "35%" }}
      >
        <h5 className="w3-padding" style={{ fontWeight: 500 }}>
          Login and get to compete.
        </h5>
        <hr />
        <form className="w3-container" onSubmit={loginUser}>
          <p className="w3-padding">
            <input
              className="w3-input w3-border w3-block w3-round"
              type="text"
              placeholder="🆔 Reg No"
              value={regno}
              onChange={(e) => setRegno(e.target.value)}
            />
          </p>
          <p className="w3-padding">
            <input
              className="w3-input w3-border w3-block w3-round"
              type="password"
              placeholder="🔑 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <button
            type="submit"
            className="w3-button w3-block w3-blue w3-hover-blue w3-margin-bottom"
          >
            Sign in
          </button>
          <p className="w3-row" style={{ paddingBottom: "25px" }}>
            <span className="w3-half">
              Or &nbsp;
              <a href="/register">sign up now!</a>
            </span>
            <a href="#" className="w3-half">
              Forgot password?
            </a>
          </p>
        </form>
      </div>
      <Footer />
    </>
  );
}
