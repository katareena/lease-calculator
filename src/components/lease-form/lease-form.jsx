import React from 'react';
import './lease-form.scss';

const LeaseForm = () => {
  return (
    <section className="lease">
      <h2>Рассчитайте стоимость автомобиля в лизинг</h2>

      <form className="lease__form">
        <div className='field aria-1'></div>
        <div className='field aria-2'></div>
        <div className='field aria-3'></div>
        <div className='field aria-4'></div>
        <div className='field aria-5'></div>

        <button className='field aria-6' type="submit">Отправить заявку</button>
      </form>

    </section>
  )
}

export default LeaseForm;
