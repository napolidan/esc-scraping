import axios from 'axios';
const resultURL = "http://localhost:3001/api/escResults";

const getAll = async () => {

    const request = await axios.get(resultURL);
    return request.data;

};

export default { getAll };