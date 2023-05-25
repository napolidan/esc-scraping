import axios from 'axios';
const resultURL = process.env.URL;

const getAll = async () => {

    await delay(3000);
    const request = await axios.get(resultURL);
    return request.data;

};

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default { getAll };