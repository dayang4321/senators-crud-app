import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import SenatorForm from './SenatorForm/SenatorForm';
import SenatorsList from './SenatorsList/SenatorsList'
import Search from './Search/Search';
import ErrorModal from '../UI/ErrorModal'
import useHttp from '../../hooks/http'

import { Grid } from '@material-ui/core'
import Axios from '../../Axios-base'


const senateReducer = (currentSenators, action) => {
  switch (action.type) {
    case 'SET': return action.senators
    
    case 'ADD': return [
      ...currentSenators,
      { ...action.senator, id: action.id },
    ]
      
    case 'DELETE': return currentSenators.filter(senator => senator.id !== action.id);
    default: throw Error('This should not happen')
  }
}


const Senators = () => {

  const [userSenators, senDispatch] = useReducer(senateReducer, []);
  const { isLoading, hasError, data,extra,identifier, sendRequest, clearError } = useHttp();
 

  useEffect(() =>
  {
    if (!isLoading && !hasError && (identifier === 'REMOVING')) {
      senDispatch({ type: 'DELETE', id: extra })
    }
    if(!isLoading && !hasError && (identifier === 'ADDING')){
      senDispatch({type: 'ADD', senator: extra, id:data.name  })
    }
  }
      , [isLoading,hasError, extra,identifier,data]);


  const filteredSenHandler = useCallback( filteredSenator => {

    senDispatch({type: 'SET', senators: filteredSenator, })
  },[])

  const addSenHandler = useCallback((senator) => {
    sendRequest('https://react-hooks-44804.firebaseio.com/senators.json','POST',JSON.stringify(senator),senator,'ADDING')


    
  },[sendRequest])
  
  const removeSenatorHandler = useCallback(SenatorId => {

    sendRequest(`https://react-hooks-44804.firebaseio.com/Senators/${SenatorId}.json`,'DELETE',null, SenatorId,'REMOVING')
  
  },[sendRequest]);

  const clear = useCallback(() => {
    clearError();
  
  },[clearError])

  const senatorsList = useMemo(() => {
    return(<SenatorsList senators={userSenators} onRemoveItem={removeSenatorHandler} />)
  },[userSenators,removeSenatorHandler])

  return (
    <div className="App">
      <Grid container>
      {hasError && <ErrorModal onClose={clear}>{hasError}</ErrorModal>}
        <Grid item xs={12} sm={5} md={4}>
        <SenatorForm addSenHandler={addSenHandler} loading={isLoading} />
        </Grid>
       
        <Grid item xs={12} sm={7} md={8}>
        <section>
        <Search onLoadSenators={filteredSenHandler}/>
        {senatorsList}
      </section>
        </Grid>

    
      </Grid>
      
    </div>
  );
}

export default Senators;
