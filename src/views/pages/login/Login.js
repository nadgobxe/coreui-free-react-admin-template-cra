import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { useAuth } from './AuthProvider'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../store/actions/userActions'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { login } = useAuth() // Using the login function from AuthContext

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    console.log(':', username)
    console.log('password length:', password.length)
    try {
      const response = await axios.post(
        '/.netlify/functions/serverProxy/employees/login',
        {
          username,
          password,
        },
        {
          withCredentials: true, // This will allow the browser to include cookies in the request
        },
      )
      console.log('response:', response.data)
      if (response.data.token) {
        const userResponse = await axios.get('/.netlify/functions/getLoggedInUser', {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
          withCredentials: true, // Also include this option for the GET request
        })
        dispatch(setUser({ user: userResponse.data, token: response.data.token }))
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(userResponse.data))
        login()
        let path = ''
        if (userResponse.data.user.privilege === 'admin') {
          path = '/admin/dashboard/'
        } else if (userResponse.data.user.privilege === 'employee') {
          path = '/employee/dashboard/'
        }

        console.log('Navigating to:', path)
        await navigate(path) // Navigate to the computed path
      } else {
        console.error('Login failed:', response.data.message)
      }
    } catch (error) {
      console.error('Login error:', error.response.data)
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login1</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
