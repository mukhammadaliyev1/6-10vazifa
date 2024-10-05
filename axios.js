import axios from "axios"


const  api = axios.create({
  baseURL:"https://trello.vimlc.uz/"
})
api.interceptors.request.use(
  config=>{
    const token = localStorage.getItem('token')
    if(token){
      config.headers.Authorizzation=`Bearer ${token}`
    }
    return config
  },
  error =>{
    return Promise.reject(error)
  }
)




export default api;