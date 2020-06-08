import React,{useState,useEffect,useCallback} from 'react';

import {FormControl,InputLabel,Select,MenuItem,FormHelperText} from '@material-ui/core'
import Card from '../../UI/Card';
import LoadingIndicator from '../../UI/LoadingIndicator'
import './SenatorForm.css';
import Myxios from '../../../Axios-base'
import Axios from 'axios'


const SenatorForm = React.memo(props => {
  // Object state-mgt
  // const [inputState, setInputState] = useState({ title: '', phone: '' });
  
  //Independent state mgt(recommended)
  const [inputedName, setInputedName] = useState('');
  const [inputedPhone, setInputedPhone] = useState('');
  const [inputedEmail, setInputedEmail] = useState('');
  const [inputedState, setInputedState] = useState('');
  const [inputedConstituency, setInputedConstituency] = useState('');
  
  const [fetchedStates, setFetchedStates] = useState([]);
  
  const constituencies = ['North','South','East', 'West','North-East','North-West','South-West', 'South-East', 'Central' ]

  useEffect(() => {
    let states = [];
    Axios.get("http://locationsng-api.herokuapp.com/api/v1/states")
      .then(
        res => {
          console.log(res.data);
          
          res.data.map(state => states.push(state.name))
          console.log(states);
          setFetchedStates(states);
        }
       
    )
    .catch(err=>console.log(err))
  },[setFetchedStates])
  

  const stateMenu = fetchedStates.map(state => (
    <MenuItem value={state}>{state}</MenuItem>
  ));
  

  const submitHandler = event => {
    event.preventDefault();
    props.addSenHandler({
      name: inputedName,
      phone: inputedPhone,
      email: inputedEmail,
      state: inputedState,
      constituency: inputedConstituency
    });
    ;
    // ...
  };

  return (
    <section className="senator-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required npmvalue={inputedName} onChange = {event=> setInputedName(event.target.value)}  />
          </div>
          <div className="form-control">
            <label htmlFor="phone">Phone No.</label>
            <input type="number" id="phone" value={inputedPhone} onChange={event =>setInputedPhone(event.target.value)} />
          </div>
          <div className="form-control">
            <label htmlFor="phone">Email</label>
            <input type="number" id="phone" value={inputedEmail} onChange={event =>setInputedEmail(event.target.value)} />
          </div>
          <div className="form-control">
          <label htmlFor="phone">State</label>
        <Select labelId="demo-simple-select-required-label" fullWidth required id="demo-simple-select-required"
          value={inputedState}
              onChange={event => setInputedState(event.target.value)} 
              // SelectDisplayProps={{
              //   'style': {{
              //    maxHeight: 'calc(100% - 600px)'}},
              //   }
              // }
             
         // className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
         {stateMenu}
        </Select>
      
          </div>
          

          <div className="form-control">
            <label htmlFor="phone">State</label>
            <input type="number" id="phone" value={inputedState} onChange={event =>setInputedState(event.target.value)} />
          </div>
          <div className="form-control">
            <label htmlFor="phone">Constituency</label>
            <input type="number" id="phone" value={inputedConstituency} onChange={event =>setInputedConstituency(event.target.value)} />
          </div>

          <div className="senator-form__actions">
            <button type="submit">Add Senator</button>
            {props.loading && <LoadingIndicator/>}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default SenatorForm;
