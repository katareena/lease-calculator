import React, { useState, useEffect } from 'react';
import './lease-form.scss';
import { toRub } from '../../constants';
import { getMonthlyPayment, getTotal, getPercentages } from '../../utils/getAmounts';

const LeaseForm = () => {
  const [formData, setFormData] = useState({
    cost: 3300000,
    initialPayment: 420000,
    duration: 60,
    total: 0,
    monthlyPayment: 0,
  });

  const monthlyPayment = getMonthlyPayment(formData.cost, formData.initialPayment, formData.duration);
  const total = getTotal(formData.duration, monthlyPayment); 

  useEffect(() => {
    formData.monthlyPayment !== monthlyPayment
      && setFormData({...formData, monthlyPayment: monthlyPayment});
    formData.total !== total
      && setFormData({...formData, total: total});
  }, [monthlyPayment, total, formData]);

  function handleInputBlur(evt) {
    const {name, value} = evt.target; 
    const adaptValue = +value.replace(/\s/g,'');
    const min = +evt.target.dataset.min;
    const max = +evt.target.dataset.max;

    if (adaptValue < min) {
      setFormData({...formData, [name]: min})
    }

    if (adaptValue > max) {
      setFormData({...formData, [name]: max})
    }
  }

  function handleInputChange(evt) {
    let range = evt.target;
    const {name, value, min, max} = range;
    const adaptValue = +value.replace(/\s/g,'');

    // console.log(evt.target)

    if (evt.target.type !== 'range') {
      range = evt.target.parentNode.querySelector('input[type=range]');  

      if (isNaN(adaptValue)) {
        return;
      }

      if (adaptValue < +min) {
        range.style.backgroundSize = '0% 100%';
      }
  
      if (adaptValue > +max) {
        range.style.backgroundSize = '100% 100%';
      }
    } else {
      range.style.backgroundSize = (adaptValue - min) * 100 / (max - min) + '% 100%';
    }    
     
    setFormData({...formData, [name]: adaptValue}); 
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    alert(JSON.stringify(formData));   
  }  

  return (
    <section className='lease'>
      <h2 className='lease__title'>Рассчитайте стоимость автомобиля в лизинг</h2>

      <form className='lease__form' onSubmit={handleSubmit}>
        <div className='field lease__aria-1'>
          <label className='field__label' htmlFor='cost'>Стоимость автомобиля</label>

          <input
            className='field__input'
            type='text'
            id='cost'
            name='cost'
            data-min='1500000'
            data-max='10000000'            
            value={Number(formData.cost).toLocaleString('ru-RU')}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
 
          <input
            className='field__range'
            type='range'
            id='costRange'
            name='cost'
            min='1500000'
            max='10000000'
            value={formData.cost}
            onChange={handleInputChange}
            style={{backgroundSize: `${(formData.cost - 1500000) * 100 / (10000000 - 1500000)}% 100%`}}
          />

          <span className='field__marck'>&#8381;</span>
        </div>

        <div className='field lease__aria-2'> 
          <label className='field__label' htmlFor='initialPayment'>Первоначальный взнос</label>

          <input
            className='field__input'
            type='text'
            id='initialPayment'
            name='initialPayment'
            data-min='150000'
            data-max='6000000'            
            value={Number(formData.initialPayment).toLocaleString('ru-RU')}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />

          <input
            className='field__range'
            type='range'
            id='initialPaymentRange'
            name='initialPayment'
            min='150000'
            max='6000000'
            value={formData.initialPayment}
            onChange={handleInputChange}
            style={{backgroundSize: `${(formData.initialPayment - 150000) * 100 / (6000000 - 150000)}% 100%`}}
          />

          <output
            className='field__marck field__marck--changeable'
          >
            {getPercentages(formData.cost, formData.initialPayment)}
          </output>
        </div>

        <div className='field lease__aria-3'>
          <label className='field__label' htmlFor='duration'>Срок лизинга</label>

          <input
            className='field__input'
            type='text'
            id='duration'
            name='duration'
            data-min='6'
            data-max='120'
            value={formData.duration}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
 
          <input
            className='field__range'
            type='range'
            id='durationRange'
            name='duration'
            min='6'
            max='120'
            value={formData.duration}
            onChange={handleInputChange}
            style={{backgroundSize: `${(formData.duration - 6) * 100 / (120 - 6)}% 100%`}}
          />
          <span className='field__marck'>мес.</span>
        </div>

        <div className='field lease__aria-4'>
          <label
            className='field__label'
            htmlFor='total'
          >
            Сумма договора лизинга
          </label>
          <output
            className='field__value'
            id='total'         
          >
            {total > 0 ? toRub.format(total) : toRub.format(0)}
          </output>
        </div>

        <div className='field lease__aria-5'>
          <label
            className='field__label'
            htmlFor='monthlyPayment'
          >
            Ежемесячный платеж от
          </label>
          <output
            className='field__value'
            id='monthlyPayment'
          >
            {monthlyPayment > 0 ? toRub.format(monthlyPayment) : toRub.format(0)}
          </output>
        </div>

        <button className='lease__submit lease__aria-6' type='submit'>Оставить заявку</button>
      </form>

    </section>
  )
}

export default LeaseForm;
