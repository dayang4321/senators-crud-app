import React, { useEffect, useCallback, useReducer, useMemo, useState } from 'react';

import SenatorForm from './SenatorForm/SenatorForm2';
import SenatorsList from './SenatorsList/SenatorsList'
import Search from './Search/Search';
import ErrorModal from '../UI/ErrorModal'
import useHttp from '../../hooks/http'

import { Row, Col } from 'antd';
import Axios from '../../Axios-base'
import { Update } from '@material-ui/icons';



const senateReducer = (currentSenators, action) => {
  switch (action.type) {
    case 'SET': return action.senators
    
    case 'EDIT': {
      let senatorsCpy = [...currentSenators];
      senatorsCpy[action.index] = action.update;
      return  senatorsCpy
}
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
  const { isAddLoading, isDeleteLoading,isEditLoading, hasError, data, extra, identifier, sendRequest, clearError } = useHttp();
  const [fetchLoading, setFetchLoading] = useState(isAddLoading);
  const [options, setOptions] = useState({});
 

  useEffect(() =>

  {
   
    if (!isDeleteLoading && !isAddLoading && !isEditLoading && !hasError && (identifier === 'REMOVING')) {
      senDispatch({ type: 'DELETE', id: extra })
    }
    if(!isDeleteLoading && !isAddLoading &&!isEditLoading &&  !hasError && (identifier === 'ADDING')){
      senDispatch({type: 'ADD', senator: extra, id:data.name  })
    }
    if(!isDeleteLoading && !isAddLoading && !isEditLoading && !hasError && (identifier === 'EDITING')){
      senDispatch({type: 'EDIT', update: extra.update, id: extra.update.id , index: extra.index}, )
    }
  }
      , [isAddLoading,isDeleteLoading,isEditLoading,hasError, extra,identifier,data]);

  const fetchLoader = useCallback((isAddLoading)=> {
    setFetchLoading(isAddLoading)
    
  },[])

  const filteredSenHandler = useCallback( filteredSenator => {

    senDispatch({type: 'SET', senators: filteredSenator, })
  }
    , [])

  const addSenHandler = useCallback((senator) => {
    sendRequest('https://senators-crud-app.firebaseio.com/senators.json','POST',JSON.stringify(senator),senator,'ADDING')
    
  }, [sendRequest])
  
  const editSenatorHandler = useCallback((update, senatorId,index )=> {

    sendRequest(`https://senators-crud-app.firebaseio.com/senators/${senatorId}.json`, 'PUT', JSON.stringify(update), { update: { ...update, id: senatorId }, index:index },'EDITING')
  
  },[sendRequest]);
  
  const removeSenatorHandler = useCallback(senatorId => {

    sendRequest(`https://senators-crud-app.firebaseio.com/senators/${senatorId}.json`,'DELETE',null, senatorId,'REMOVING')
  
  },[sendRequest]);

  const clear = useCallback(() => {
    clearError();
  
  },[clearError])
  console.log(isAddLoading);
  
  const returner = useCallback((a,b) => {
    setOptions({ states:  a , constituencies:  b })
  },[setOptions])
 

  const senatorsList = useMemo(() => {
    return (<SenatorsList senators={userSenators} onRemoveItem={removeSenatorHandler} onEditItem={editSenatorHandler}
      //load={(isAddLoading || isDeleteLoading)}
      load={isAddLoading || isEditLoading || isDeleteLoading}
      fetchLoad={fetchLoading}
      //  deleteLoading={isDeleteLoading}
      stateMenu={options.states}
      constituencyMenu = {options.constituencies}
    />)
  },[userSenators,removeSenatorHandler,editSenatorHandler,options,isAddLoading,isDeleteLoading,isEditLoading])

  


  return (
    <div className="App">
      <Row >
      {hasError && <ErrorModal onClose={clear}>{hasError}</ErrorModal>}
        <Col xs={24} sm={10} md={8}>
          <SenatorForm addSenHandler={addSenHandler} loading={isAddLoading}
            returner={returner} />
          
        </Col>
       
        <Col xs={24} sm={14} md={16}>
        <section>
            <Search
              onLoadSenators={filteredSenHandler} 
              searchLoading={fetchLoader}
            />
            {senatorsList}
      </section>
        </Col>

    
      </Row>
      
    </div>
  );
}

export default Senators;
