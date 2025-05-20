import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
// import { useTour } from '@reactour/tour';
import Card, { CardBody, CardFooter, CardFooterRight } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import Input from '../../components/bootstrap/forms/Input';

const CreateCreditLoans = () => {
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [loanAmount, setLoanAmount] = useState('');
    const [ageStart, setAgeStart] = useState('');
    const [ageEnd, setAgeEnd] = useState('');
    const [minMonthFamilyIncome, setMinMonthFamilyIncome] = useState('');
    const [errorMessage, setErrorMessage] = useState({});
    const authToken = localStorage.getItem("token");
    const [modalStatus1, setModalStatus1] = useState(false);
    const timeout = useRef(null);
    const timeoutDuration = 60 * 60 * 1000;
    
	const [userData, setUserData] = useState(null);
const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}/nbfc/customers`, {
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
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }, [authToken, baseUrl]); // Add baseUrl here
  
    
	const [attachData, setAttachData] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
// console.log(userData, "Check Response")

const fetchAttachLoanAPI = useCallback(async (userId) => {
    const url = `${baseUrl}/credit/attach/${userId}`;
    const token = Cookies.get('token');
    if (!token) {
        console.error('Authentication token is missing');
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAttachData(data);
        fetchUserData();
        
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}, [baseUrl, fetchUserData]); // Add necessary dependencies

useEffect(() => {
    if (selectedUserId) {
        fetchAttachLoanAPI(selectedUserId);
    }
}, [selectedUserId, fetchAttachLoanAPI]);

  
  useEffect(() => {
    fetchUserData();
}, [fetchUserData]);
    

    const UpdateFormAPI = async () => {
        const errors = {
            loanAmount: !loanAmount ? 'Please Enter Customer ID' : '',
            ageStart: !ageStart ? 'Please Enter Credit Amount' : '',
        };

        setErrorMessage(errors);

        if (Object.values(errors).some(error => error)) {
            return;
        }

        const url = `${baseUrl}/credits`;
        const token = Cookies.get('token');

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
                body: JSON.stringify({
                        id: "",
                        cust_id: loanAmount,
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
            alert('Thank you! Your record has been successfully submitted.');
            navigate('/credit-loans');
            // window.location.href = '/credit-loans';

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    // const { setIsOpen } = useTour();
// console.log(attachData, "attachData 1500")
 
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
                                <h4 className='heading-h4'>Create Credit Loan 
                                    {selectedUserId?.length > 0 ? (
                                // <span className='view_document' onClick={() => setModalStatus1(!modalStatus1)} >
                                // View Document</span>
                                <span 
  className='view_document' 
  onClick={() => setModalStatus1(!modalStatus1)} 
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      setModalStatus1(!modalStatus1);
    }
  }} 
  role="button" 
  tabIndex={0}
>
  View Document
</span>

                                    ) : (
                                      null

                                    )
}

                                </h4>
                                <div className='col-lg-12 col-md-12'>
                                    <CardBody className='pb-0'>
                                        <div className='row g-4'>
                                            
                                        <div className='col-4'>
                                                <label htmlFor="CustomerID" className="form-label">Customer ID</label>
                                                <FormGroup id='CustomerID'>
                                                    {/* <select
                                                        value={loanAmount}
                                                        onChange={(e) => setLoanAmount(e.target.value)}
                                                        className='selectvalue'
                                                    >

                                                        {userData?.message?.customers?.customers?.map((user) => ( 
                                                            <option key={user.id} value={user.id}>{user.id} {user.fname} {user.lname}</option>

                                                         ))}
                                                    </select> */}
                                                    <select
                value={loanAmount}
                onChange={(e) => {
                    setLoanAmount(e.target.value);
                    setSelectedUserId(e.target.value);
                }}
                className='selectvalue'
            >
                 <option value="" disabled>Customer ID</option>
                {userData?.message?.customers?.customers?.map((user) => (
                    <option key={user.id} value={user.id}>{user.id} | {user.fname} {user.lname}</option>
                ))}
            </select>
                                                </FormGroup>
                                                {errorMessage.loanAmount && <div className="text-danger">{errorMessage.loanAmount}</div>}
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
                                                {errorMessage.ageStart && <div className="text-danger">{errorMessage.ageStart}</div>}
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="interestrate" className="form-label">Interest Rate</label>
                                                <FormGroup id='interestrate'>
                                                    <Input
                                                        type='text'
                                                        name='interestrate'
                                                        placeholder='Interest Rate'
                                                        autoComplete='interestrate'
                                                        value={ageEnd}
                                                        onChange={(e) => setAgeEnd(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="tenureinmonths" className="form-label">Tenure (Months)</label>
                                                <FormGroup id='tenureinmonths'>
                                                    <Input
                                                        type='text'
                                                        name='tenureinmonths'
                                                        placeholder='Tenure (Months)'
                                                        autoComplete='tenureinmonths'
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
                <Modal isOpen={modalStatus1} setIsOpen={setModalStatus1}>
          <ModalHeader  setIsOpen={setModalStatus1}>
            <ModalTitle id='new-todo-modal'>Documents</ModalTitle>
          </ModalHeader>
          <ModalBody>
         
          {attachData?.message?.getLoanAttachments?.map((user) => (
            <div className='document_1'>
            <h2 key={user.id}>{user.file_type}</h2>
            <img src={user.url} />
            </div>
))}
          </ModalBody>
        </Modal>
            </Page>
        </PageWrapper>
    );
};
export default CreateCreditLoans
