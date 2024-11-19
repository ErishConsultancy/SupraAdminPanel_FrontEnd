import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Card, { CardBody, CardFooter, CardFooterRight } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';

const EditPreApproveLoan = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const [CustomerID, setCustomerID] = useState('');
    const [preapproveloanamount, setPreapproveloanamount] = useState('');
    const [interestrate, setInterestrate] = useState('');
    const [loantermmonths, setLoantermmonths] = useState('');
    const [userData, setUserData] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
console.log(userData, "userData");
console.log(isSubmitted, "isSubmitted");
console.log(loading, "loading");
    const authToken = localStorage.getItem('token');
    const timeout = useRef(null);
    const timeoutDuration = 60 * 60 * 1000;
    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/pre-approve/${id}`, {
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
            setUserData(data);  // Save the whole response data for further use

            // Setting individual state values from the fetched data
            setCustomerID(data?.message?.PreApprove?.preApprove?.id || '');
            setPreapproveloanamount(data?.message?.PreApprove?.preApprove?.pre_approve_loan_amount || '');
            setInterestrate(data?.message?.PreApprove?.preApprove?.interest_rate || '');
            setLoantermmonths(data?.message?.PreApprove?.preApprove?.loan_term_months || '');

            console.log(data?.message?.PreApprove?.preApprove?.cust_id, "Customer ID"); // For debugging

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }, [id, authToken, baseUrl]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const UpdateFormAPI = async () => {
        setLoading(true);
        const url = `${baseUrl}/pre-approve/${id}`;
        const token = Cookies.get('token');
    
        if (!token) {
            console.error('Authentication token is missing');
            setLoading(false);
            return;
        }
    
        const data = {
            cust_id: CustomerID,
            pre_approve_loan_amount: preapproveloanamount,
            interest_rate: interestrate,
            loan_term_months: loantermmonths
        };
    
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            await response.json();
            alert('Thank you! Your record has been successfully submitted.');
            setIsSubmitted(true);
            // window.location.href = '/preapprove';
            navigate('/preapprove');

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('There was an error submitting your form. Please try again.');
        } finally {
            setLoading(false);
        }
    };
	const [CustometIDData, setCustometIDData] = useState(null);

    const fetchCustomerIDData = useCallback(async () => {
		try {
			const response = await fetch(`${baseUrl}/nbfc/customers`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			setCustometIDData(data);
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	}, [authToken, baseUrl]);

    useEffect(() => {
        fetchUserData();
        fetchCustomerIDData();
    }, [fetchUserData, fetchCustomerIDData]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
		if (selectedUserId) {
			fetchUserData(selectedUserId);
		}
	}, [selectedUserId, fetchUserData]);
// console.log(CustometIDData, "CustometIDData")

 
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
                                    <h4 className='heading-h4'>Update Pre APprove Loan</h4>
                                    <div className='col-lg-12 col-md-12'>
                                        <CardBody className='pb-0'>
                                            <div className='row g-4'>
                                                <div className='col-4'>
                                                    <label htmlFor="exampleAC--name" className="form-label">Customer ID</label>
                                                    <FormGroup id='CustomerID'>
                                                    
                                                          {/* <Input
                                                        type='text'
                                                        name='CustomerID'
                                                        placeholder='Customer ID'
                                                        value={CustomerID}
                onChange={(e) => setCustomerID(e.target.value)}
                                                    /> */}
                                                    <select
														value={CustomerID}
														onChange={(e) => {
															setCustomerID(e.target.value);
															setSelectedUserId(e.target.value);
														}}
														className='selectvalue'>
														<option value='' disabled>
															Customer ID
														</option>
														{CustometIDData?.message?.customers?.customers?.map(
															(user) => (
																<option
																	key={user.id}
																	value={user.id}>
																	{user.id} {user.fname}{' '}
																	{user.lname}
																</option>
															),
														)}
													</select>
                                                    </FormGroup>
                                                </div>
                                                <div className='col-4'>
                                                    <label htmlFor="exampleAC--name" className="form-label">Pre Approve Loan Amount</label>
                                                    <FormGroup id='PreApproveLoanAmount'>
                                                        <Input
                                                            type='text'
                                                            name='PreApproveLoanAmount'
                                                            placeholder='Pre Approve Loan Amount'
                                                            autoComplete='PreApproveLoanAmount'
                                                            value={preapproveloanamount}
                                                            onChange={(e) => setPreapproveloanamount(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </div>
                                                <div className='col-4'>
                                                    <label htmlFor="exampleAC--name" className="form-label">Interest Rate</label>
                                                    <FormGroup id='InterestRate'>
                                                        <Input
                                                            type='text'
                                                            name='InterestRate'
                                                            placeholder='Interest Rate'
                                                            autoComplete='InterestRate'
                                                            value={interestrate}
                                                            onChange={(e) => setInterestrate(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </div>
                                                <div className='col-4'>
                                                    <label htmlFor="exampleAC--name" className="form-label">Loan Term Months</label>
                                                    <FormGroup id='LoanTermMonths'>
                                                        <Input
                                                            type='text'
                                                            name='LoanTermMonths'
                                                            placeholder='Loan Term Months'
                                                            autoComplete='LoanTermMonths'
                                                            value={loantermmonths}
                                                            onChange={(e) => setLoantermmonths(e.target.value)}
                                                        />
                                                    </FormGroup>
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
}

export default EditPreApproveLoan
