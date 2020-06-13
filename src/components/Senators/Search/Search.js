import React,{useState,useEffect,useRef} from 'react';

import Card from '../../UI/Card';
import './Search.css';
import useHttp from '../../../hooks/http';
import ErrorModal from '../../UI/ErrorModal';


const Search = React.memo(props => {
  const [inputedFilter, setInputedFilter] = useState('');
  const { onLoadSenators, searchLoading } =  props ;
  const inputRef = useRef();
  const {isAddLoading,data,hasError,sendRequest,clearError } = useHttp();
  
  useEffect(() => {
   const timer = setTimeout(() => {
      if (inputedFilter === inputRef.current.value) {
        const queryParams = inputedFilter.length === 0 ? '' :`?orderBy="name"&startAt="${inputedFilter.toUpperCase()}"&endAt="${inputedFilter.toUpperCase()}\uf8ff"`;
        sendRequest('https://senators-crud-app.firebaseio.com/senators.json' + queryParams, 'GET')     
      
      }
   }, 1000);
    ;
    return (() => { clearTimeout(timer) });
  }, [inputedFilter, sendRequest]);
  
  useEffect(() => {
    
  
    if (!data) { searchLoading(true) };
    if (data){searchLoading(false)}
    
    if (!isAddLoading && data && !hasError) {
    let loadedSenators = [];
    for (const key in data) {
      loadedSenators.push({
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        state: data[key].state,
        email: data[key].email,
        phone: data[key].phone,
        constituency: data[key].constituency
      } )  };
      onLoadSenators(loadedSenators);
  }
  }, [data, hasError, isAddLoading, onLoadSenators,searchLoading])
  



  return (
    <section className="search">
      {hasError && <ErrorModal onClose={clearError}>{hasError}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Name</label>
          <input type="text" ref={inputRef} value={inputedFilter} onChange={event=>{setInputedFilter(event.target.value)}}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
