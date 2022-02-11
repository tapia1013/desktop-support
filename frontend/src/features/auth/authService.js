import axios from 'axios';

// we're dealing with AUTH stuff so this is the end ppoint for everything AUTH
const API_URL = '/api/users';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    //save data from user to localStorage
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}


// Logout User
const logout = () => localStorage.removeItem('user');


const authService = {
  register,
  logout
}


export default authService;