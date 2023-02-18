import React from "react";
import './app.scss';
import LeaseForm from "../lease-form/lease-form";

function App() {
  return (
    <main className="main">
      <h1 className='visually-hidden'>Калькулятор расчета стоимости автомобиля в лизинг</h1>
      <LeaseForm />
    </main>
  );
}

export default App;
