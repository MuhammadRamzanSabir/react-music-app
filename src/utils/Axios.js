import axios from "axios";
import {getAuthTokenFromLocalStorage} from "./auth";

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.headers.common = {'Authorization': `bearer ${getAuthTokenFromLocalStorage()}`}
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
