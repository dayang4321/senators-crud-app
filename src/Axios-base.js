import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://senators-crud-app.firebaseio.com/'
});


export default instance