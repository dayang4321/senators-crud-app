import { useReducer,useCallback } from 'react'

const initialState = { deleteLoading : false, addLoading: false, error: null, data: null, extra: null, identifier: null };

const httpReducer = (httpState, action) => {
    let loadstate = {};
    switch (action.type) {
      

        case 'SENDING': {
           loadstate = action.identifier === "REMOVING" ? { deleteLoading: true } : { addLoading: true } ;
            return { ...httpState,...loadstate, error: null, data: null, extra: null, identifier: action.identifier }
    }

      case 'SUCCESS': return {...httpState, deleteLoading:false, addLoading: false , data: action.responseData, extra: action.extra, }
        
      case 'FAILURE': return { ...httpState,deleteLoading:false, addLoading: false, error: action.error,};
      
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
        isAddLoading: httpState.addLoading,
        isDeleteLoading: httpState.deleteLoading,
        hasError: httpState.error,
        data: httpState.data,
        extra: httpState.extra,
        identifier: httpState.identifier,
        sendRequest: sendRequest,
        clearError: clearError,
    }
    
}

export default useHttp