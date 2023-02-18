import React from "react";
import './app.scss';
import LeaseForm from "../lease-form/lease-form";

function App() {
  return (
    <main className="main">
      <h1>Рассчитайте стоимость автомобиля в лизинг</h1>
      <LeaseForm />
    </main>
  );
}

export default App;
