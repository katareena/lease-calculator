import React, {useState} from 'react';
import './lease-form.scss';
import { toRub } from '../../constants';

const LeaseForm = () => {
  const [formData, setFormData] = useState({
    'cost': '3300000',
    'initialPayment': '420000',
    'duration': '60',
  });

  function handleInputBlur(evt) {
    const {name, value, min, max} = evt.target; 
    const adaptValue = value.replace(/\s/g,'');    
    
    if (Number(adaptValue) < Number(min)) {
      setFormData({...formData, [name]: min})
    }

    if (Number(adaptValue) > Number(max)) {
      setFormData({...formData, [name]: max})
    }
  }

  function handleInputChange(evt) {
    let target = evt.target;
    const {name, value, min, max} = target;
    const adaptValue = value.replace(/\s/g,'');

    if (evt.target.type !== 'range') {
      target = evt.target.parentNode.querySelector('input[type=range]');  
      
      if (isNaN(Number(adaptValue))) {
        return;
      }

      if (Number(adaptValue) < Number(min)) {
        target.style.backgroundSize = '0% 100%';
      }
  
      if (Number(adaptValue) > Number(max)) {
        target.style.backgroundSize = '100% 100%';
      }
    } 
    
    target.style.backgroundSize = (adaptValue - min) * 100 / (max - min) + '% 100%'; 
    setFormData({...formData, [name]: adaptValue}); 
  }

  function handlePercentage() {
    const persent = Math.round(100/formData.cost*formData.initialPayment);
    return persent > 100 ? '100%' : `${persent}%`;
  }

  const monthlyPayment = Math.round((formData.cost - formData.initialPayment) * (0.05 * Math.pow((1 + 0.05), formData.duration) / (Math.pow((1 + 0.05), formData.duration) - 1)));
  const total = Math.round(formData.duration * monthlyPayment);

  return (
    <section className='lease'>
      <h2 className='lease__title'>Рассчитайте стоимость автомобиля в лизинг</h2>

      <form className='lease__form'>
        <div className='field aria-1'>
          <label className='field__label' htmlFor='cost'>Стоимость автомобиля</label>

          <input
            className='field__input'
            type='text'
            id='cost'
            name='cost'
            min='1500000'
            max='10000000'            
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

        <div className='field aria-2'> 
          <label className='field__label' htmlFor='initialPayment'>Первоначальный взнос</label>

          <input
            className='field__input'
            type='text'
            id='initialPayment'
            name='initialPayment'
            min='150000'
            max='6000000'            
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
            id='initialPaymentRange'
          >
            {handlePercentage()}
          </output>
        </div>

        <div className='field aria-3'>
          <label className='field__label' htmlFor='duration'>Срок лизинга</label>

          <input
            className='field__input'
            type='text'
            id='duration'
            name='duration'
            min='6'
            max='120'
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

        <div className='field aria-4'>
          <p className='field__label'>Сумма договора лизинга</p>
          <p className='field__value'>
            {total > 0 ? toRub.format(total) : toRub.format(0)}
          </p>
        </div>

        <div className='field aria-5'>
          <p className='field__label'>Ежемесячный платеж от</p>
          <p className='field__value'>
            {monthlyPayment > 0 ? toRub.format(monthlyPayment) : toRub.format(0)}
          </p>
        </div>

        <button className='lease__submit aria-6' type='submit'>Оставить заявку</button>
      </form>

    </section>
  )
}

export default LeaseForm;
