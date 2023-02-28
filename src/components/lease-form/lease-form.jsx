import React, {useState} from 'react';
import './lease-form.scss';

const LeaseForm = () => {
  const [formData, setFormData] = useState({
    'cost': '3300000',
    'initialPayment': '420000',
    'duration': '60',
  });

  const monthlyPayment = Math.round((formData.cost - formData.initialPayment) * (0.05 * Math.pow((1 + 0.05), formData.duration) / (Math.pow((1 + 0.05), formData.duration) - 1)));  
  const total = Math.round(formData.duration * monthlyPayment);

  function handleInputBlur(evt) {
    const {name, value, min, max} = evt.target;

    const range = evt.target.parentNode.querySelector('input[type=range]');
    range.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%';  
    
    
    if (Number(value) < Number(min)) {
      setFormData({...formData, [name]: min})
      range.style.backgroundSize = '0% 100%';
    }

    if (Number(value) > Number(min)) {
      setFormData({...formData, [name]: max})
      range.style.backgroundSize = '100% 100%';
    }
  }

  function handleInputChange(evt) {
    const input = evt.target;
    const {name, value, min, max} = input;
    const range = evt.target.parentNode.querySelector('input[type=range]');

    if (Number(value) < Number(min)) {
      setFormData({...formData, [name]: min})
      range.style.backgroundSize = '0% 100%';
    }

    if (Number(value) > Number(min)) {
      setFormData({...formData, [name]: max})
      range.style.backgroundSize = '100% 100%';
    }

    setFormData({...formData, [name]: value.split(' ').join('')});    
    range.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%';  
  }

  function handleRangeChange(evt) {
    const range = evt.target;
    const {name, value, min, max} = range;
    range.style.backgroundSize = (value - min) * 100 / (max - min) + '% 100%';    
    setFormData({...formData, [name]: value});
  }

  function handlePercentage() {
    const persent = Math.round(100/formData.cost*formData.initialPayment);
    return persent > 100 ? '100%' : `${persent}%`;
  }

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
            value={formData.cost}
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
            onChange={handleRangeChange}
            style={{backgroundSize: `${(formData.cost - 1500000) * 100 / (10000000 - 1500000)}% 100%`}}
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
            value={formData.initialPayment}
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
            onChange={handleRangeChange}
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
            type='string'
            id='duration'
            name='duration'
            min='6'
            max='120'
            value={(formData.duration)}
            onChange={handleInputChange}
          />
 
          <input
            className='field__range'
            type='range'
            id='durationRange'
            name='duration'
            min='6'
            max='120'
            value={formData.duration}
            onChange={handleRangeChange}
            style={{backgroundSize: `${(formData.duration - 6) * 100 / (120 - 6)}% 100%`}}
          />
          <span className='field__marck'>мес.</span>
        </div>

        <div className='field aria-4'>
          <p className='field__label'>Сумма договора лизинга</p>
          <p className='field__value'>
            {total.toLocaleString('ru')}
            <span>&#8381;</span></p>
        </div>

        <div className='field aria-5'>
          <p className='field__label'>Ежемесячный платеж от</p>
          <p className='field__value'>
            {monthlyPayment.toLocaleString('ru')}
            <span>&#8381;</span></p>
        </div>

        <button className='lease__submit aria-6' type='submit'>Оставить заявку</button>
      </form>

    </section>
  )
}

export default LeaseForm;
