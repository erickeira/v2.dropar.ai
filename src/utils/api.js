import axios from 'axios';
const dropar_language = localStorage.getItem('dropar_language');

let url = "http://api-v2.dropar.ai"; 
// let url = "http://api-dev.dropar.ai"; 

if (window.location.hostname === 'localhost') {
  // url = 'http://localhost:8000';
}
var api = axios.create({
  baseURL: url,
  headers: {
    'Content-Type' : 'application/json',
    'Accept-Language' : dropar_language || 'pt_BR'
  }
});

api?.interceptors?.response.use(function (response) {
  let { data , headers }  = response
  return response;
}, function (error) {
  let data  = error?.response?.data
  let status = error?.response?.status
  if(status == "401"){
    localStorage.removeItem('dropar_authtoken');
    if(!window.location.href.includes("/entrar")) {
      window.location.href = "/entrar"
    }
    setApiToken()
  }
  return Promise.reject(error);
});

api?.interceptors?.request.use(async function (config) {
  const dropar_authtoken = localStorage.getItem('dropar_authtoken');
  const dropar_language = localStorage.getItem('dropar_language');
  config.headers['Authorization'] = `Bearer ${dropar_authtoken || ''}`;
  config.headers['Accept-Language'] = dropar_language || 'pt_BR';
  return config;
}, function (error) {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

async function setApiToken(token = null){
  localStorage.setItem('dropar_authtoken' , token || '')
  return null;
}

export {
  api,
  setApiToken
};