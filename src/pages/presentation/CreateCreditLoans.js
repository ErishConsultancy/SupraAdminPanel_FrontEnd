import React, { useState, useEffect, useCallback } from 'react';
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
    const [Name, setName] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [pan, setPan] = useState('');
    const [ageStart, setAgeStart] = useState('');
    const [ageEnd, setAgeEnd] = useState('');
    const [minMonthFamilyIncome, setMinMonthFamilyIncome] = useState('');
    const [loanAmtStart, setLoanAmtStart] = useState('');
    const [loanAmtEnd, setLoanAmtEnd] = useState('');
    const [errorMessage, setErrorMessage] = useState({});
    const authToken = localStorage.getItem("token");
    const [modalStatus1, setModalStatus1] = useState(false);
    const [Cibilescore, setCibileScore] = useState('');

    
	const [userData, setUserData] = useState(null);
console.log(setName, "setName");
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
console.log(userData, "Check Response")

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
        setAadhar(data?.message.getLoanAttachments[0].doc_no || '');
        setPan(data?.message.getLoanAttachments[1].doc_no || '');
        setAgeEnd(data?.message.customerdetail.monthly_income || '');
        setMinMonthFamilyIncome(data?.message.customerdetail.occupation || '');
        setLoanAmtStart(data?.message.customerdetail.purpose || '');
        setLoanAmtEnd(data?.message.customerdetail.addrs || '');
        setCibileScore(data?.message.customerdetail.cibil_score || '');
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

        const url = `${baseUrl}/credit`;
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
                        purpose: loanAmtStart,
                        name:Name,
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
            window.location.href = '/credit-loans';

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    // const { setIsOpen } = useTour();
// console.log(attachData, "attachData 1500")
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
                                            {/* <div className='col-4'>
                                                <label htmlFor="Name" className="form-label">Name</label>
                                                <FormGroup id='Name'>
                                                <Input
                                                        type='text'
                                                        name='Name'
                                                        placeholder='Name'
                                                        autoComplete='Name'
                                                        value={Name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.Name && <div className="text-danger">{errorMessage.Name}</div>}
                                            </div> */}
                                            
                                            <div className='col-4'>
                                                <label htmlFor="AadharCard" className="form-label">Aadhar Card
                                                    {/* <span className='view_document' onClick={() => setModalStatus1(!modalStatus1)} >
                                                        (View Document)</span> */}
                                                        </label>
                                                <FormGroup id='AadharCard'>
                                                <Input
                                                        type='text'
                                                        name='AadharCard'
                                                        placeholder='Aadhar Card'
                                                        autoComplete='Aadhar Card'
                                                        value={aadhar}
                                                        onChange={(e) => setAadhar(e.target.value)}
                                                        // disabled={true}
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="PanCard" className="form-label">Pan Card
                                                {/* <span className='view_document' onClick={() => setModalStatus1(!modalStatus1)} >
                                                (View Document)</span> */}
                                                </label>
                                                <FormGroup id='PanCard'>
                                                <Input
                                                        type='text'
                                                        name='PanCard'
                                                        placeholder='Pan Card'
                                                        autoComplete='Pan Card'
                                                        value={pan}
                                                        onChange={(e) => setPan(e.target.value)}
                                                        disabled
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
                                                {errorMessage.ageStart && <div className="text-danger">{errorMessage.ageStart}</div>}
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
                                                        disabled
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
                                                        disabled
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
                                                        disabled
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="CibileScore" className="form-label">Cibile Score</label>
                                                <FormGroup id='CibileScore'>
                                                    <Input
                                                        type='text'
                                                        name='CibileScore'
                                                        placeholder='Cibile Score'
                                                        autoComplete='CibileScore'
                                                        value={Cibilescore}
                                                        onChange={(e) => setCibileScore(e.target.value)}
                                                        disabled
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
                                                        disabled
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
