import { useReducer, useCallback } from 'react'
import { message } from 'antd';

const initialState = { deleteLoading : false, addLoading: false, editLoading: false, error: null, data: null, extra: null, identifier: null };

const httpReducer = (httpState, action) => {
    let loadstate = {};
    switch (action.type) {
      

        case 'SENDING': {
          if (action.identifier === "REMOVING" ){ loadstate = { deleteLoading: true } }
            if (action.identifier === "ADDING") { loadstate = { addLoading: true } }
            if (action.identifier === "EDITING") { loadstate = { editLoading: true }   }
         
            return { ...httpState,...loadstate, error: null, data: null, extra: null, identifier: action.identifier }
    }

      case 'SUCCESS': return {...httpState, deleteLoading:false,editLoading:false, addLoading: false , data: action.responseData, extra: action.extra, }
        
      case 'FAILURE': return { ...httpState,deleteLoading:false, addLoading: false,editLoading:false, error: action.error};
      
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
                  
                });
                message.info('ok') 
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
        isEditLoading: httpState.editLoading,
        hasError: httpState.error,
        data: httpState.data,
        extra: httpState.extra,
        identifier: httpState.identifier,
        sendRequest: sendRequest,
        clearError: clearError,
    }
    
}

export default useHttp