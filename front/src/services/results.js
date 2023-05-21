import axios from 'axios';
const resultURL = 'api/escResults';

const getAll = () => {

    const request = axios.get(resultURL);
    return request.then(response => response.data);

};

export default { getAll };