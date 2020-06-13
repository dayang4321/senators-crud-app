import React,{useState,useEffect,useCallback} from 'react';

import {FormControl,InputLabel,Select,MenuItem,FormHelperText} from '@material-ui/core'
import Card from '../../UI/Card';
import LoadingIndicator from '../../UI/LoadingIndicator'
import './SenatorForm.css';
import Myxios from '../../../Axios-base'
import Axios from 'axios'


const SenatorForm = React.memo(props => {
 
  
  //Independent state mgt
  const [inputedName, setInputedName] = useState('');
  const [inputedPhone, setInputedPhone] = useState('');
  const [inputedEmail, setInputedEmail] = useState('');
  const [inputedState, setInputedState] = useState('');
  const [inputedConstituency, setInputedConstituency] = useState('');
  
  const [fetchedStates, setFetchedStates] = useState([]);
  
  const constituencies = ['North-West','North','North-East','East','South-East', 'South','South-West', 'West', 'Central' ]

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
    <MenuItem value={state} key={state}>{state}</MenuItem>
  ));

  const constituencyMenu = constituencies.map(constituency => (
    <MenuItem value={constituency} key={constituency}>{constituency}</MenuItem>
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
            <input type="text" id="name" required value={inputedName} onChange = {event=> setInputedName(event.target.value)}  />
          </div>
          <div className="form-control">
            <label htmlFor="phone">Phone No.</label>
            <input type="text" id="phone" required value={inputedPhone} onChange={event =>setInputedPhone(event.target.value)} />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required value={inputedEmail} onChange={event =>setInputedEmail(event.target.value)} />
          </div>




          <div className="form-control">
          <label id="state-label" htmlFor="state">State</label>
        <Select labelId="state-label" fullWidth id="state"
          value={inputedState}
              onChange={event => setInputedState(event.target.value)}  >
          <MenuItem >
            <em>None</em>
          </MenuItem>
         {stateMenu}
        </Select>
          </div>
       
          <FormControl required  fullWidth >
            <label htmlFor="constituency" id="constituency-label" >Constituency</label>
            <Select labelId="constituency-label" fullWidth id="constituency"
          value={inputedConstituency}
              onChange={event => setInputedConstituency(event.target.value)}  >
             
         {constituencyMenu}
        </Select>
      
          </FormControl>


          <FormControl required className="form-control">
        <InputLabel id="constituency">Age</InputLabel>
        <Select
          labelId="constituency"
          id="constituency"
          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>


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
