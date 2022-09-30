import { useEffect, useState } from 'react';
import './App.css';
import { Form } from './Form';
import 'bootstrap/dist/css/bootstrap.min.css';


function isFieldInvalid(fieldValue) {
  if (/[^0-9]/.test(fieldValue)) {
      return true;     
  }

  try {
    const value = parseInt(fieldValue);
    if (value < 0 || value > 100)
      return true;
  } catch (error) {
    return true;
  }

  return false;
}

const LOW_RISK_VALUES = {
  'a': 60,
  'b': 20,
  'c': 15,
  'd': 5
}

const MEDIUM_RISK_VALUES = {
  'a': 25,
  'b': 25,
  'c': 25,
  'd': 25
}

const HIGH_RISK_VALUES = {
  'a': 5,
  'b': 15,
  'c': 35,
  'd': 40
}

function App() {

  const [choice, setChoice] = useState('myself')
  const [risk, setRisk] = useState('low')
  const [values, setValues] = useState({})
  const [remaining, setRemaining] = useState(100)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setChoice(choice);
    setRisk(risk);

    if (choice === 'myself') {
      setValues({});
      setRemaining(100);
    } else {
      setRemaining(0);
      if (risk === 'low') {
        setValues(LOW_RISK_VALUES);
      } else if (risk === 'medium') {
        setValues(MEDIUM_RISK_VALUES);
      } else {
        setValues(HIGH_RISK_VALUES);
      }
    }

  }, [choice, risk])

  // change event handler
  const handleChange = evt => {
    const { name, value: newValue } = evt.target;

    const value = +newValue
    const initialValue = values[name] ?? 0

    if (isFieldInvalid(value)) {
      setErrors({...errors,
        [name]: 'Enter a number from 0-100.'})
        return;
    } else {
      if (value - initialValue > remaining) {
        setErrors({...errors,
        [name]: `Can't be more than the remaining allocation.`});
        return;
      }
    }

    setErrors({});

    // save field values
    setValues({
      ...values,
      [name]: value,
    });

    setRemaining(remaining + initialValue - value);
  };

  const handleBlur = evt => {
    const { name, value } = evt.target;
    setErrors({});

    if (isFieldInvalid(value)) {
      setErrors({...errors,
        [name]: 'Enter a number from 0-100.'})
    }
  };

  // form submit handler
  const handleSubmit = evt => {
    setErrors({});
    setValues({});
    setRemaining(100);
  };

  return (
    <div className='App'>
      <h1>Ocho Wealth.</h1>

      <div>
         <label>Select your mode of investing.
           <br/>
           <select value={choice} onChange={(event) => {setChoice(event.target.value)}}>
             <option value="myself">Do it myself</option>
             <option value="automated">Recommended based on risk</option>
           </select>
         </label>
      </div>
      <div>
      {choice === 'automated' && <label> Select your risk tolerance.
        <div>
        <select value={risk} onChange={(event) => {setRisk(event.target.value)}}>
             <option value="low">Low risk</option>
             <option value="medium">Medium risk</option>
             <option value="high">High risk</option>
           </select>
        </div>
        </label>
        }
        </div>

      <div>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleBlur={handleBlur}
        errors={errors}
        choice={choice}
        values={values}
        remaining={remaining}
      />
      </div>
    </div>
  );
}

export default App;
