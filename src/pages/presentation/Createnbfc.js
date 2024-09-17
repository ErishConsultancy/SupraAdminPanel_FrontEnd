import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import Card, {
    CardBody,
    CardFooter,
    CardFooterRight,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';

const Createnbfc = () => {
    const navigate = useNavigate();
    const [NBFCName, setNBFCName] = useState('');
    const [NBFCMobileNo, setNBFCMobileNo] = useState('');
    const [NBFCEmail, setNBFCEmail] = useState('');
    const [NBFCWebsite, setNBFCWebsite] = useState('');
    const [Name, setName] = useState('');
    const [MobileNo, setMobileNo] = useState('');
    const [Email, setEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [password, setpassword] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        nbfcname:'',
        nbfcemail:'',
        nbfcphone:'',
        nbfcwebsite:'',
        name: '',
        email: '',
        phone: '',
        designation: '',
        password:''
    });
    // const authToken = localStorage.getItem("token");

    const UpdateFormAPI = async () => {
        const errors = {
            nbfcname: !NBFCName ? 'Please Enter NBFC Name' : '',
            nbfcemail: !NBFCEmail ? 'Please Enter NBFC Email' : '',
            nbfcphone: !NBFCMobileNo ? 'Please Enter NBFC Mobile No.' : '',
            nbfcwebsite: !NBFCWebsite ? 'Please Enter NBFC  Website' : '',
            name: !Name ? 'Please Enter User Name' : '',
            email: !Email ? 'Please Enter User Email' : '',
            phone: !MobileNo ? 'Please Enter User Mobile No.' : '',
            designation: !designation ? 'Please Enter User Designation' : '',
            password: !password ? 'Please Enter User Password' : ''
        };

        setErrorMessage(errors);

        if (Object.values(errors).some(error => error)) {
            return;
        }

        const url = 'https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc';
        const token = Cookies.get('token');
        const data = {
            nbfcName: NBFCName,
            nbfcEmail: NBFCEmail,
            nbfcWebsite: NBFCWebsite,
            nbfcContact1: NBFCMobileNo,
            name: Name,
            email: Email,
            password,
            role: 3,
            phone: MobileNo,
            designation,
        };

        if (!token) {
            console.error('Authentication token is missing');
            return;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // const json = await response.json();
            alert('Thank you! Your record has been successfully submitted.');
            window.location.href = '/nbfclist';

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const timeoutDuration = 60 * 60 * 1000; // 1 Hour
  let timeout;
  useEffect(() => {
    if (!authToken) {
      navigate('/auth-pages/login');
    }
  }, [authToken, navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth-pages/login');
  };
  const resetTimeout = () => {
    clearTimeout(timeout);
    timeout = setTimeout(logout, timeoutDuration);
  };

  useEffect(() => {
    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keypress', resetTimeout);
    timeout = setTimeout(logout, timeoutDuration);
    return () => {
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keypress', resetTimeout);
      clearTimeout(timeout);
    };
  }, []);

    return (
        <PageWrapper>
            <Page>
                <div className='row h-100 pb-3'>
                    <div className='col-lg-12 col-md-12'>
                        <Card>
                            <div className='row'>
                                <h4 className='heading-h4'>NBFC Details</h4>
                                <div className='col-lg-12 col-md-12'>
                                    <CardBody className='pb-0'>
                                        <div className='row g-4'>
                                            <div className='col-6'>
                                                <label htmlFor="NBFCName" className="form-label">NBFC Name</label>
                                                <FormGroup id='NBFCName'>
                                                    <Input
                                                        type='text'
                                                        name='name'
                                                        placeholder='NBFC Name'
                                                        autoComplete='NBFC Name'
                                                        value={NBFCName}
                                                        onChange={(e) => setNBFCName(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.nbfcname && <div className="text-danger">{errorMessage.nbfcname}</div>}
                                            </div>
                                            <div className='col-6'>
                                                <label htmlFor="NBFCEmail" className="form-label">NBFC Email</label>
                                                <FormGroup id='NBFCEmail'>
                                                    <Input
                                                        type='text'
                                                        name='email'
                                                        placeholder='NBFC Email'
                                                        autoComplete='email'
                                                        value={NBFCEmail}
                                                        onChange={(e) => setNBFCEmail(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.nbfcemail && <div className="text-danger">{errorMessage.nbfcemail}</div>}
                                            </div>
                                            <div className='col-6'>
                                                <label htmlFor="NBFCPhone" className="form-label">NBFC Mobile Number</label>
                                                <FormGroup id='NBFCPhone'>
                                                    <Input
                                                        type='text'
                                                        name='phone'
                                                        placeholder='NBFC Mobile Number'
                                                        autoComplete='phone'
                                                        value={NBFCMobileNo}
                                                        onChange={(e) => setNBFCMobileNo(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.nbfcphone && <div className="text-danger">{errorMessage.nbfcphone}</div>}
                                        </div>
                                        <div className='col-6'>
                                            <label htmlFor="NBFCWebsite" className="form-label">NBFC Website</label>
                                            <FormGroup id='NBFCWebsite'>
                                                <Input
                                                    type='text'
                                                    name='website'
                                                    placeholder='NBFC Website'
                                                    autoComplete='website'
                                                    value={NBFCWebsite}
                                                    onChange={(e) => setNBFCWebsite(e.target.value)}
                                                />
                                            </FormGroup>
                                            {errorMessage.nbfcwebsite && <div className="text-danger">{errorMessage.nbfcwebsite}</div>}
                                        </div>

                                        <h4 className='heading-h4_2'>User Details</h4>
                                        <div className='col-6'>
                                            <label htmlFor="Name" className="form-label">User Name</label>
                                            <FormGroup id='Name'>
                                                <Input
                                                    type='text'
                                                    name='name'
                                                    placeholder='User Name'
                                                    autoComplete='name'
                                                    value={Name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </FormGroup>
                                            {errorMessage.name && <div className="text-danger">{errorMessage.name}</div>}
                                        </div>
                                        <div className='col-6'>
                                            <label htmlFor="Email" className="form-label">User Email</label>
                                            <FormGroup id='Email'>
                                                <Input
                                                    type='text'
                                                    name='email'
                                                    placeholder='User Email'
                                                    autoComplete='email'
                                                    value={Email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </FormGroup>
                                            {errorMessage.email && <div className="text-danger">{errorMessage.email}</div>}
                                        </div>
                                        <div className='col-6'>
                                            <label htmlFor="MobileNo" className="form-label">User Mobile Number</label>
                                            <FormGroup id='MobileNo'>
                                                <Input
                                                    type='text'
                                                    name='phone'
                                                    placeholder='User Mobile Number'
                                                    autoComplete='phone'
                                                    value={MobileNo}
                                                    onChange={(e) => setMobileNo(e.target.value)}
                                                />
                                            </FormGroup>
                                            {errorMessage.phone && <div className="text-danger">{errorMessage.phone}</div>}
                                        </div>
                                        <div className='col-6'>
                                            <label htmlFor="Designation" className="form-label">Designation</label>
                                            <FormGroup id='Designation'>
                                                <select
                                                    value={designation}
                                                    onChange={(e) => setDesignation(e.target.value)}
                                                    className='selectvalue'>
                                                    <option value="" disabled>Select your Designation</option>
                                                    <option value='Chief Executive Officer (CEO)'>Chief Executive Officer (CEO)</option>
                                                    <option value='Chief Operating Officer (COO)'>Chief Operating Officer (COO)</option>
                                                    <option value='Chief Financial Officer (CFO)'>Chief Financial Officer (CFO)</option>
                                                    <option value='Chief Technology Officer (CTO)'>Chief Technology Officer (CTO)</option>
                                                    <option value='Chief Marketing Officer (CMO)'>Chief Marketing Officer (CMO)</option>
                                                    <option value='Chief Human Resources Officer (CHRO)'>Chief Human Resources Officer (CHRO)</option>
                                                    <option value='Vice President'>Vice President</option>
                                                    <option value='Director'>Director</option>
                                                    <option value='Manager'>Manager</option>
                                                    <option value='Team Leader'>Team Leader</option>
                                                    <option value='Senior Software Engineer'>Senior Software Engineer</option>
                                                    <option value='Software Engineer'>Software Engineer</option>
                                                    <option value='Junior Software Engineer'>Junior Software Engineer</option>
                                                    <option value='Intern'>Intern</option>
                                                    <option value='Human Resources Specialist'>Human Resources Specialist</option>
                                                    <option value='Accountant'>Accountant</option>
                                                    <option value='Sales Executive'>Sales Executive</option>
                                                    <option value='Marketing Specialist'>Marketing Specialist</option>
                                                    <option value='Administrative Assistant'>Administrative Assistant</option>
                                                    <option value='Customer Support Representative'>Customer Support Representative</option>
                                                </select>
                                            </FormGroup>
                                            {errorMessage.designation && <div className="text-danger">{errorMessage.designation}</div>}
                                        </div>
                                        <div className='col-6'>
                                            <label htmlFor="Password" className="form-label">Password</label>
                                            <FormGroup id='Password'>
                                                <Input
                                                    type='text'
                                                    name='Password'
                                                    placeholder='Password'
                                                    autoComplete='Password'
                                                    value={password}
                                                    onChange={(e) => setpassword(e.target.value)}
                                                />
                                            </FormGroup>
                                            {errorMessage.password && (
                                                <div className='text-danger'>
                                                    {errorMessage.password}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <CardFooterRight>
                                        <Button
                                            type='button'
                                            icon='Save'
                                            color='info'
                                            isOutline
                                            onClick={UpdateFormAPI}>
                                            Submit
                                        </Button>
                                    </CardFooterRight>
                                </CardFooter>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    </PageWrapper>
);
}

export default Createnbfc
