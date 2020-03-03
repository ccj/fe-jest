import axios from 'axios';

export const fetchData = (fn) => {
    axios.get('http://www.dell-lee.com/react/api/demo.json').then((response) => {
        fn(response.data);
    }) 
}

export const fetchData1= () => {
    return axios.get('http://www.dell-lee.com/react/api/demo.json');
}

export const fetchDataSuccess= () => {
    return axios.get('http://www.dell-lee.com/react/api/demo.json');
}

export const fetchDataThrow= () => {
    return axios.get('http://www.dell-lee.com/react/api/demo1.json');
}