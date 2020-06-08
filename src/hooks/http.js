import { useReducer,useCallback } from 'react'

const initialState = { loading: false, error: null, data: null, extra: null, identifier: null };

const httpReducer = (httpState, action) => {
    switch (action.type) {
      case 'SENDING': return {loading:true, error:null, data: null, extra: null,identifier: action.identifier}
      
      case 'SUCCESS': return {...httpState, loading:false, data: action.responseData, extra: action.extra, }
        
      case 'FAILURE': return { ...httpState, loading: false, error: action.error,};
      
      case 'CLEAR': return initialState
      default: throw Error('This should not happen')
    }
}
  
const useHttp = () => {

    const [httpState, httpDispatch] = useReducer(httpReducer, initialState);

    const clearError = useCallback(()=>{httpDispatch({type:'CLEAR'})},[])
    
    const sendRequest = useCallback((url, method, body, reqExtra, reqId) => {
        httpDispatch({
            type: 'SENDING',
            identifier: reqId
        });
        fetch(url,
            {
                method: method,
                body: body,
                headers: {
                    'Content-type': 'application/json'
                }
            })

            .then(response => {
                return response.json()
            })
            .then(responseData => {
                httpDispatch({
                    type: 'SUCCESS',
                    responseData: responseData,
                    extra: reqExtra,
                  
                })
            })
            .catch(error => {
                httpDispatch({
                    type: 'FAILURE',
                    error: error.message
                });
         
            })
    },[]);
    return {
        isLoading: httpState.loading,
        hasError: httpState.error,
        data: httpState.data,
        extra: httpState.extra,
        identifier: httpState.identifier,
        sendRequest: sendRequest,
        clearError: clearError,
    }
    
}

export default useHttp