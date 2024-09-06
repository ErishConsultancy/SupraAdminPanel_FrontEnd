import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
import AuthContext from '../../../contexts/authContext';
import Spinner from '../../../components/bootstrap/Spinner';
import Alert from '../../../components/bootstrap/Alert';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const { darkModeStatus } = useDarkMode();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1);
  // const [CurrentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const authToken = localStorage.getItem("token");
  const [forgotdata, setForgotData] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setLoading(false);
      setError('Both email and password are required.');
      return;
    }

    try {
      const response = await fetch('https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data?.message?.token);
        localStorage.setItem('fname', data?.message?.fname);
        localStorage.setItem('lname', data?.message?.lname);

        document.cookie = `token=${data?.message?.token}; path=/;`;

        console.log('Token saved:', document.cookie);
        
        setStep(2);
      } else {
        setError(data?.message?.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://suprafinleaselimitedbe-production.up.railway.app/api/otp/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        // navigate('/');
        if (forgotdata.success === true) {
          setStep(3);
        } else {
          navigate('/');
        }

      } else {
        setError(data?.message?.message || 'OTP verification failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('A password reset link has been sent to your email.');
        setStep(1);
        setForgotData(data);
      } else {
        setError(data.message || 'Failed to send reset link.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ 
        password,
        newpassword: newPassword,
        reenterpassword: confirmNewPassword
         }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        navigate('/');
       } else {
        setError(data?.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
console.log(forgotdata, "forgotdata");
  return (
    <PageWrapper isProtected={false} className="bg-dark">
      <Page className="p-0">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-xl-4 col-lg-6 col-md-8 shadow-3d-container">
            <Card className="shadow-3d-dark" data-tour="login-page">
              <CardBody>
                <div className='text-center h1 fw-bold mt-5'>Welcome,</div>
                <div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
                {success && (
                        <Alert color="success">{success}</Alert>
                      )}

                {step === 1 && (
                  <form className="row g-1" onSubmit={handleLogin}>
                    <div className="col-12">
                      <FormGroup id="loginUsername" className="input_space" isFloating label="Enter Your email">
                        <Input
                          autoComplete="username"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup id="loginPassword" isFloating label="Enter Your Password">
                        <Input
                          type="password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FormGroup><br />
                    </div>
                    {error && (
                      <div className="col-12">
                        <Alert color="danger">{error}</Alert>
                      </div>
                    )}
                    <div className="col-12">
                      {/* <Button color="warning" className="w-100 py-3" type="submit" disabled={loading}>
                        {loading ? <Spinner /> : 'Login'}
                      </Button> */}
                      <Button color="warning" className="w-100 py-3" type="submit" disabled={loading}>
  {loading ? <Spinner /> : 'Login'}
</Button>

                    </div>
                    <div className='col-12'>
                      {/* <p style={{ textAlign: 'right', cursor: 'pointer' }} onClick={handleForgotPassword}>
                        Forgot Password?
                      </p> */}
                      <Button
  style={{ textAlign: 'right', cursor: 'pointer', background: 'none', border: 'none' }}
  onClick={handleForgotPassword}
>
  Forgot Password?
</Button>

                    </div>
                    <div className='col-12 orspace text-center text-muted'>
                      OR
                    </div>
                    <div className='col-12'>
                      <Button
                        isOutline
                        color={darkModeStatus ? 'light' : 'dark'}
                        className={classNames('w-100 py-3', {
                          'border-light': !darkModeStatus,
                          'border-dark': darkModeStatus,
                        })}
                        icon='CustomGoogle'>
                        Continue with Google
                      </Button>
                    </div>
                  </form>
                )}
                {step === 2 && (
                  <form className="row g-4" onSubmit={handleOtpVerification}>
                    <div className="col-12">
                      <FormGroup id="otp" isFloating label="Enter Your OTP">
                        <Input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </FormGroup>
                    </div>
                    {error && (
                      <div className="col-12">
                        <Alert color="danger">{error}</Alert>
                      </div>
                    )}
                    <div className="col-12">
                      <Button color="warning" className="w-100 py-3" type="submit" disabled={loading}>
                        {loading ? <Spinner /> : 'Verify OTP'}
                      </Button>
                    </div>
                  </form>
                )}
                {step === 3 && (
                  <div className="row g-4">
                    <div className="col-12">
                    <form className="row g-1" onSubmit={handleChangePassword}>
                    <div className="col-12">
                      <FormGroup id="CurrentPassword" className="input_space" isFloating label="Enter Your Current Password">
                        <Input
                          autoComplete="CurrentPassword"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled
                        />
                      </FormGroup>
                      <FormGroup id="Password" className="input_space" isFloating label="Enter Your New Password">
                        <Input
                          autoComplete="New Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup id="CurrentPassword" className="input_space" isFloating label="Enter Your Confirm Password">
                        <Input
                          autoComplete="Confirm Password"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                      </FormGroup>
                     
                    </div>
                    {error && (
                      <div className="col-12">
                        <Alert color="danger">{error}</Alert>
                      </div>
                    )}
                    <div className="col-12">
                      <Button color="warning" className="w-100 py-3" type="submit" disabled={loading}>
                        {loading ? <Spinner /> : 'Save'}
                      </Button>

                    </div>
                    
                  
                  </form>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </Page>
    </PageWrapper>
  );
}

export default Login;
