import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const EditNBFC = () => {
    const { clientId } = useParams();
    const [NBFCName, setNBFCName] = useState('');
    const [NBFCMobileNo, setNBFCMobileNo] = useState('');
    const [NBFCEmail, setNBFCEmail] = useState('');
    const [NBFCWebsite, setNBFCWebsite] = useState('');
	const navigate = useNavigate();

    const [userData, setUserData] = useState(null);
    const authToken = localStorage.getItem('token');
    const timeout = useRef(null);
    const timeoutDuration = 60 * 60 * 1000;
    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch(`https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/nbfc/${clientId}`, {
                
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUserData(data);
            setNBFCName(data?.message?.nbfc?.nbfc?.name || '');
            setNBFCEmail(data?.message?.nbfc?.nbfc?.email || '');
            setNBFCMobileNo(data?.message?.nbfc?.nbfc?.contact1 || '');
            setNBFCWebsite(data?.message?.nbfc?.nbfc?.website || '');
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }, [clientId, authToken]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

	console.log(userData, "userData New 12");


    const UpdateFormAPI = async () => {

        const url = `https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/nbfc/${clientId}`;
        const token = Cookies.get('token');

        if (!token) {
            console.error('Authentication token is missing');
            return;
        }

        const data = {
            nbfcName: NBFCName,
            nbfcEmail: NBFCEmail,
            nbfcWebsite: NBFCWebsite,
            nbfcContact1: NBFCMobileNo,
            role: 3,
        };

        try {
            const apiResponse = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!apiResponse.ok) {
                throw new Error('Network response was not ok');
            }

            // const json = await apiResponse.json();
            alert('Thank you! Your record has been successfully submitted.');
            // window.location.href = '/nbfclist';
            navigate('/nbfclist');

            // setResponse(json);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    
useEffect(() => {
    if (!authToken) navigate('/auth-pages/login');
}, [authToken, navigate]);

const logout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/auth-pages/login');
}, [navigate]);

const resetTimeout = useCallback(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(logout, timeoutDuration);
}, [logout, timeoutDuration]);

useEffect(() => {
    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keypress', resetTimeout);

    timeout.current = setTimeout(logout, timeoutDuration);

    return () => {
        window.removeEventListener('mousemove', resetTimeout);
        window.removeEventListener('keypress', resetTimeout);
        clearTimeout(timeout.current);
    };
}, [resetTimeout, logout, timeoutDuration]);

    return (
        <PageWrapper>
            <Page>
                <div className='row h-100 pb-3'>
                    <div className='col-lg-12 col-md-12'>
                        <Card>
                           
                                <div className='row'>
                                    <h4 className='heading-h4'>Edit NBFC Details</h4>
                                    <div className='col-lg-12 col-md-12'>
                                        <CardBody className='pb-0'>
                                            <div className='row g-4'>
                                                <div className='col-6'>
                                                    <label htmlFor="exampleAC--nbfcname" className="form-label">NBFC Name</label>
                                                    <FormGroup id='NBFCName'>
                                                        <Input
                                                            type='text'
                                                            name='nbfcname'
                                                            placeholder='NBFC Name'
                                                            autoComplete='NBFC Name'
                                                            value={NBFCName}
                                                            onChange={(e) => setNBFCName(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </div>
                                                <div className='col-6'>
                                                    <label htmlFor="exampleAC--nbfcemail" className="form-label">NBFC Email</label>
                                                    <FormGroup id='NBFCEmail'>
                                                        <Input
                                                            type='text'
                                                            name='nbfcemail'
                                                            placeholder='NBFC Email'
                                                            autoComplete='email'
                                                            value={NBFCEmail}
                                                            onChange={(e) => setNBFCEmail(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </div>
                                                <div className='col-6'>
                                                    <label htmlFor="exampleAC--nbfcphone" className="form-label">NBFC Mobile Number</label>
                                                    <FormGroup id='NBFCMobileNo'>
                                                        <Input
                                                            type='text'
                                                            name='nbfcphone'
                                                            placeholder='NBFC Mobile Number'
                                                            autoComplete='phone'
                                                            value={NBFCMobileNo}
                                                            onChange={(e) => setNBFCMobileNo(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </div>
                                                <div className='col-6'>
                                                    <label htmlFor="exampleAC--nbfcwebsite" className="form-label">NBFC Website</label>
                                                    <FormGroup id='NBFCWebsite'>
                                                        <Input
                                                            type='text'
                                                            name='nbfcwebsite'
                                                            placeholder='NBFC Website'
                                                            autoComplete='Website'
                                                            value={NBFCWebsite}
                                                            onChange={(e) => setNBFCWebsite(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </div>
                                               
                                            </div>
                                        </CardBody>
                                        <CardFooter className='bg-gray-100'>
                                            <CardFooterRight>
                                                <Button color='primary' isLink onClick={UpdateFormAPI}>
                                                    Update
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
};

export default EditNBFC;
