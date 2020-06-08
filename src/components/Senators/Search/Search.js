import React,{useState,useEffect,useRef} from 'react';

import Card from '../../UI/Card';
import './Search.css';
import useHttp from '../../../hooks/http';
import ErrorModal from '../../UI/ErrorModal';

const Search = React.memo(props => {
  const [inputedFilter, setInputedFilter] = useState('');
  const { onLoadSenators } =  props ;
  const inputRef = useRef();
  const {isLoading,data,hasError,sendRequest,clearError } = useHttp();
  
  useEffect(() => {
   const timer = setTimeout(() => {
      if (inputedFilter === inputRef.current.value) {
        const queryParams = inputedFilter.length === 0 ? '' :`?orderBy="name"&startAt="${inputedFilter}"&endAt="${inputedFilter}\uf8ff"`;
        sendRequest('https://react-hooks-44804.firebaseio.com/senators.json' + queryParams,'GET')      
      }
   }, 1000);
    return (() => { clearTimeout(timer) });
  }, [inputedFilter, sendRequest,]);
  
  useEffect(()=>{ if (!isLoading && data && !hasError) {
    let loadedSenators = [];
    for (const key in data) {
      loadedSenators.push({
        id: key,
        title: data[key].title,
        amount: data[key].amount,
      } )  };
      onLoadSenators(loadedSenators);
  }},[data, hasError, isLoading, onLoadSenators])

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
