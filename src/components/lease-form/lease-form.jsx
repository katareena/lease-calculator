import React from 'react';
import './lease-form.scss';

const LeaseForm = () => {
  return (
    <section className='lease'>
      <h2 className='lease__title'>Рассчитайте стоимость автомобиля в лизинг</h2>

      <form className='lease__form'>
        <div className='field aria-1'>
          <label className='field__label' htmlFor='cost'>Стоимость автомобиля</label>

          <input
            className='field__input'
            type='number'
            id='cost'
            name='cost'
            min='1500000'
            max='10000000'            
            value='3300000'
          />
 
          <input
            className='field__range'
            type='range'
            id='costRange'
            name='cost'
            min='1500000'
            max='10000000'
            value='3300000'
          />

          <span className='field__marck'>&#8381;</span>
        </div>

        <div className='field aria-2'> 
          <label className='field__label' htmlFor='initialPayment'>Первоначальный взнос</label>

          <input
            className='field__input'
            type='number'
            id='initialPayment'
            name='initialPayment'
            min='150000'
            max='6000000'            
            value='420000'
          />
 
          <input
            className='field__range'
            type='range'
            id='initialPaymentRange'
            name='initialPayment'
            min='150000'
            max='6000000'
            value='420000'
          />

          <output
            className='field__marck field__marck--changeable'
            id='initialPaymentRange'
          >
            13%
          </output>
        </div>

        <div className='field aria-3'>
          <label className='field__label' htmlFor='duration'>Срок лизинга</label>

          <input
            className='field__input'
            type='string'
            id='duration'
            name='duration'
            min='6'
            max='120'
            value='60'
          />
 
          <input
            className='field__range'
            type='range'
            id='durationRange'
            name='duration'
            min='6'
            max='120'
            value='60'            
          />
          <span className='field__marck'>мес.</span>
        </div>

        <div className='field aria-4'>
          <p className='field__label'>Сумма договора лизинга</p>
          <p className='field__value'>
            4467313
            <span>&#8381;</span></p>
        </div>

        <div className='field aria-5'>
          <p className='field__label'>Ежемесячный платеж от</p>
          <p className='field__value'>
            114455
            <span>&#8381;</span></p>
        </div>

        <button className='lease__submit aria-6' type='submit'>Оставить заявку</button>
      </form>

    </section>
  )
}

export default LeaseForm;
