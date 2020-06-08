import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://dave-s-burger-builder.firebaseio.com/'
});


export default instance