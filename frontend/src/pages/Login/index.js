import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";

import api from "../../services/api";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

export default function Login() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", res.data.name);

      history.push("/profile");
    } catch (error) {
      alert("Falha no login, tente novamente");
    }
  }

  return (
    <div className="loginContainer">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu Login</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="backLink" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
