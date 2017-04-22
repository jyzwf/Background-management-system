import axios from 'axios';
var axiosInstance = axios.create({
	baseUrl: "http://120.55.168.36:2008/"
})

export default axiosInstance;