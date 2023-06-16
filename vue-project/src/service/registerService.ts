import axios from 'axios'

export async function registerUser(username: string, password: string): Promise<any> {
  const url = 'http://localhost:3000/auth/register'
  const data = {
    username,
    password
  }

  try {
    const response = await axios.post(url, data)
    return response.data
  } catch (error) {
    throw new Error('Register error: ' + error.message)
  }
}