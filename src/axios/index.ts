import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/v1";

axios.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem("accessToken")
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

axios.interceptors.response.use(
  (response) => {
    // Xử lý phản hồi thành công
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Xử lý lỗi 401, có thể chuyển hướng đến trang login hoặc thông báo lỗi
      console.error('Unauthorized - Redirecting to login');
      // Chuyển hướng hoặc hiển thị thông báo mà không tải lại trang
      // window.location.href = '/login'; // Nếu muốn chuyển hướng
    }
    return Promise.reject(error);
  }
);