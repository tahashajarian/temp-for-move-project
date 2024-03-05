import axios from "axios"
import getToken from "../utils/auth/getToken";


// It need the word 'api' to be written at the end of the url 
// like this http://192.168.57.107:8080/api/

// const getBaseUrl = () => {
//   return new Promise((resolve) => {
//     axios.get(`/data.json`).then((data) => {
//       resolve(data?.data?.serverAddress);
//     })
//   });
// };

export async function apiAddressCreator(url: string) {
  const apiUrl = process.env.REACT_APP_SERVER_ADDRESS

  return apiUrl + url
}

const axiosProvider = axios.create({
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
})

axiosProvider.interceptors.request.use(async (request: any) => {
  // request.headers["x-apikey"] = [process.env.apiKey];
  request.baseURL = process.env.REACT_APP_SERVER_ADDRESS

  request.headers["Access-Control-Allow-Origin"] = ["*"];

  const token = getToken();
  if (token) {
    request.headers["Authorization"] = [`Bearer ${token.accessToken}`];
  }
  return request;
});

// axiosProvider.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   return Promise.reject(error);
// });

axiosProvider.interceptors.response.use(
  response => response,
  err => {

    return Promise.reject(err)
  }
)

export {axiosProvider}