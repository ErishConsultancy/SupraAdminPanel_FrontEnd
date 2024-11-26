import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    const [ageStart, setAgeStart] = useState('');
    const [ageEnd, setAgeEnd] = useState('');
    const [minMonthFamilyIncome, setMinMonthFamilyIncome] = useState('');
    const authToken = localStorage.getItem("token");
    const timeout = useRef(null);
    const timeoutDuration = 60 * 60 * 1000;
    const [userData, setUserData] = useState(null);

    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch(`https://suprafinleaselimitedbe-production.up.railway.app/api/credits/${id}`, {
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
            setLoanAmount(data?.message?.credit?.credit_score || '');
            setAgeStart(data?.message?.credit?.credit_amount || '');
            setAgeEnd(data?.message?.credit?.interest_rate || '');
            setMinMonthFamilyIncome(data?.message?.credit?.tenure_in_months || '');

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }, [id, authToken]);
	useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);
    console.log(userData,"userData 1500")
	
    const UpdateFormAPI = async () => {

        const url = `https://suprafinleaselimitedbe-production.up.railway.app/api/credits/${id}`;
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

            id: "",
            credit_score: loanAmount,
            credit_amount: ageStart,
            interest_rate: ageEnd,
            tenure_in_months: minMonthFamilyIncome,
            client_id: "",
            accepted_by_cust: false,
            accepted_at: null,
            createdAt: "",
            updatedAt: ""
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await response.json();
            navigate('/credit-loans');
            alert('Thank you! Your record has been successfully submitted.');
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
                                <h4 className='heading-h4'>Create Credit Loan </h4>
                                <div className='col-lg-12 col-md-12'>
                                    <CardBody className='pb-0'>
                                        <div className='row g-4'>
                                            
                                        <div className='col-4'>
                                                <label htmlFor="CreditScore" className="form-label">Credit Score</label>
                                                <FormGroup id='CreditScore'>
                                                <Input
                                                        type='text'
                                                        name='CreditScore'
                                                        placeholder='Credit Score'
                                                        autoComplete='loanAmount'
                                                        value={loanAmount}
                                                        onChange={(e) => setLoanAmount(e.target.value)}
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
                                                <label htmlFor="InterestRate" className="form-label">Interest Rate	</label>
                                                <FormGroup id='InterestRate'>
                                                    <Input
                                                        type='text'
                                                        name='InterestRate'
                                                        placeholder='Interest Rate'
                                                        autoComplete='InterestRate'
                                                        value={ageEnd}
                                                        onChange={(e) => setAgeEnd(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="TenureMonths" className="form-label">Tenure Months</label>
                                                <FormGroup id='TenureMonths'>
                                                    <Input
                                                        type='text'
                                                        name='Tenure Months'
                                                        placeholder='Tenure Months'
                                                        autoComplete='TenureMonths'
                                                        value={minMonthFamilyIncome}
                                                        onChange={(e) => setMinMonthFamilyIncome(e.target.value)}
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
