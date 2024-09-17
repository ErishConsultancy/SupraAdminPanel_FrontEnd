import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
// import DatePicker from 'react-datepicker';
import Card, { CardBody, CardFooter, CardFooterRight } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '../../components/bootstrap/forms/Input';

const EditCreditLoans = () => {
    const { id } = useParams();
	const navigate = useNavigate();

    const [loanAmount, setLoanAmount] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [pan, setPan] = useState('');
    const [ageStart, setAgeStart] = useState('');
    const [ageEnd, setAgeEnd] = useState('');
    const [minMonthFamilyIncome, setMinMonthFamilyIncome] = useState('');
    const [loanAmtStart, setLoanAmtStart] = useState('');
    const [loanAmtEnd, setLoanAmtEnd] = useState('');
    const authToken = localStorage.getItem("token");

    const [userData, setUserData] = useState(null);

    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch(`https://suprafinleaselimitedbe-production.up.railway.app/api/credit/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUserData(data);
            setLoanAmount(data?.message?.credit?.aadhar_number || '');
            setAadhar(data?.message?.credit?.aadhar_number || '');
            setPan(data?.message?.credit?.pan_number || '');
            setAgeStart(data?.message?.credit?.credit_amount || '');
            setAgeEnd(data?.message?.credit?.monthly_income || '');
            setMinMonthFamilyIncome(data?.message?.credit?.occupation || '');
            setLoanAmtStart(data?.message?.credit?.purpose || '');
            setLoanAmtEnd(data?.message?.credit?.addrs || '');

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }, [id, authToken]);
	useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);
    console.log(userData?.message?.credit?.aadhar_number,"userData 1500")
	
    const UpdateFormAPI = async () => {

        const url = `https://suprafinleaselimitedbe-production.up.railway.app/api/credit/${id}`;
        const token = Cookies.get('token');

        if (!token) {
            console.error('Authentication token is missing');
            return;
        }

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                body: JSON.stringify({
                        purpose: loanAmtStart,
                        addrs: loanAmtEnd,
                        occupation: minMonthFamilyIncome,
                        monthly_income: ageEnd,
                        aadhar_number: aadhar,
                        pan_number: pan,
                        credit_amount: ageStart,
                        cust_id: loanAmount,
                        ctgry_id: "",
                        status: "",
                        rmk: "",
                        act: true,
                        loan_scheme_id: "",
                        cre_by: "",
                        cre_by_role: ""
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await response.json();
            alert('Thank you! Your record has been successfully submitted.');
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
                                <h4 className='heading-h4'>Create Credit Loan </h4>
                                <div className='col-lg-12 col-md-12'>
                                    <CardBody className='pb-0'>
                                        <div className='row g-4'>
                                            
                                        <div className='col-4'>
                                                <label htmlFor="CustomerID" className="form-label">Customer ID</label>
                                                <FormGroup id='CustomerID'>
                                                    <select
                                                        value={loanAmount}
                                                        onChange={(e) => setLoanAmount(e.target.value)}
                                                        className='selectvalue'
                                                    >
                                                        {/* {userData?.message?.loanSchemeName?.map((user) => ( */}
                                                            {/* <option key={user.id} value={user.id}>{user.name}</option> */}
                                                            <option value="01">01</option>
                                                            <option value="02">02</option>
                                                            <option value="03">03</option>
                                                            <option value="04">04</option>
                                                            <option value="05">05</option>

                                                        {/* ))} */}
                                                    </select>
                                                </FormGroup>
                                            </div>
                                            
                                            <div className='col-4'>
                                                <label htmlFor="AadharCard" className="form-label">Aadhar Card</label>
                                                <FormGroup id='AadharCard'>
                                                <Input
                                                        type='text'
                                                        name='AadharCard'
                                                        placeholder='Aadhar Card'
                                                        autoComplete='Aadhar Card'
                                                        value={aadhar}
                                                        onChange={(e) => setAadhar(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="PanCard" className="form-label">Pan Card</label>
                                                <FormGroup id='PanCard'>
                                                <Input
                                                        type='text'
                                                        name='PanCard'
                                                        placeholder='Pan Card'
                                                        autoComplete='Pan Card'
                                                        value={pan}
                                                        onChange={(e) => setPan(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="CreditAmount" className="form-label">Credit Amount</label>
                                                <FormGroup id='CreditAmount'>
                                                    <Input
                                                        type='text'
                                                        name='CreditAmount'
                                                        placeholder='Credit Amount'
                                                        autoComplete='AgeStart'
                                                        value={ageStart}
                                                        onChange={(e) => setAgeStart(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="MonthlyIncome" className="form-label">Monthly Income</label>
                                                <FormGroup id='MonthlyIncome'>
                                                    <Input
                                                        type='text'
                                                        name='MonthlyIncome'
                                                        placeholder='Monthly Income'
                                                        autoComplete='MonthlyIncome'
                                                        value={ageEnd}
                                                        onChange={(e) => setAgeEnd(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="Occupation" className="form-label">Occupation</label>
                                                <FormGroup id='Occupation'>
                                                    <Input
                                                        type='text'
                                                        name='Occupation'
                                                        placeholder='Occupation'
                                                        autoComplete='Occupation'
                                                        value={minMonthFamilyIncome}
                                                        onChange={(e) => setMinMonthFamilyIncome(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="Purpose" className="form-label">Purpose</label>
                                                <FormGroup id='Purpose'>
                                                    <Input
                                                        type='text'
                                                        name='Purpose'
                                                        placeholder='Purpose'
                                                        autoComplete='Purpose'
                                                        value={loanAmtStart}
                                                        onChange={(e) => setLoanAmtStart(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="Address" className="form-label">Address</label>
                                                <FormGroup id='Address'>
                                                    <Input
                                                        type='text'
                                                        name='Address'
                                                        placeholder='Address'
                                                        autoComplete='Address'
                                                        value={loanAmtEnd}
                                                        onChange={(e) => setLoanAmtEnd(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </div>
                                            
                                        </div>
                                    </CardBody>
                                    <CardFooter>
                                        <CardFooterRight>
                                            <Button color="info" onClick={UpdateFormAPI}>Submit</Button>
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
export default EditCreditLoans
