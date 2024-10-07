import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Card, { CardBody, CardFooter, CardFooterRight, CardHeader, CardLabel, CardTitle, CardActions } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import 'react-datepicker/dist/react-datepicker.css';

import Input from '../../components/bootstrap/forms/Input';

const CreateLoans = () => {
    const navigate = useNavigate();

    const [loanAmount, setLoanAmount] = useState('');
    const [LoanId, setLoanId] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [interestRateEnd, setinterestRateEnd] = useState('');
    const [passport, setPassport] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [pan, setPan] = useState('');

    const [ProfilePhoto, setProfilePhoto] = useState('');
    const [SalarySlip, setSalarySlip] = useState('');
    const [BankStatement, setBankStatement] = useState('');
    const [ageStart, setAgeStart] = useState('');
    const [ageEnd, setAgeEnd] = useState('');
    const [minMonthFamilyIncome, setMinMonthFamilyIncome] = useState('');
    const [loanAmtStart, setLoanAmtStart] = useState('');
    const [loanAmtEnd, setLoanAmtEnd] = useState('');
    const [monthTenureStart, setMonthTenureStart] = useState('');
    const [monthTenureEnd, setMonthTenureEnd] = useState('');
    const [processFeeStart, setProcessFeeStart] = useState('');
    const [processFeeEnd, setProcessFeeEnd] = useState('');
    const [Description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState({});
    const [userData, setUserData] = useState(null);
    const authToken = localStorage.getItem("token");
    const [PreApproveData, setPreApproveData] = useState('');
    
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://suprafinleaselimitedbe-production.up.railway.app/api/setting/loan-scheme-name/', {
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
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchUserData();
    }, [authToken]);

    const UpdateFormAPI = async () => {
        const errors = {
            LoanId: !LoanId ? 'Please Select Loan Name' : '',
            loanAmtStart: !loanAmtStart ? 'Please Enter Loan Min Amount' : '',
            interestRate: !interestRate ? 'Please Enter Interest Rate' : '',
            monthTenureStart: !monthTenureStart ? 'Please Enter Tenure' : '',
            minMonthFamilyIncome: !minMonthFamilyIncome ? 'Please Enter Minimum Monthly Family Income' : '',
            ageStart: !ageStart ? 'Please Enter Start Age' : '',
            processFeeStart: !processFeeStart ? 'Please Enter Process Fee' : '',
            Description: !Description ? 'Please Enter Description' : '',

            // interestRateEnd: !interestRateEnd ? 'Please Enter Loan Term in Months' : '',
            // ageEnd: !ageEnd ? 'Please Enter End Age' : '',
            // loanAmtEnd: !loanAmtEnd ? 'Please Enter Loan Amount End' : '',
            // monthTenureEnd: !monthTenureEnd ? 'Please Enter Month Tenure End' : '',
            // processFeeEnd: !processFeeEnd ? 'Please Enter Process Fee End' : ''
        };

        setErrorMessage(errors);

        if (Object.values(errors).some(error => error)) {
            return;
        }

        const url = 'https://suprafinleaselimitedbe-production.up.railway.app/api/loans';
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
                    is_deleted: false,
                    loan_amount: loanAmtStart,
                    interest_rate: interestRate,
                    // interest_rate_end: interestRateEnd,
                    loan_ctgry: "1",
                    loan_sch_nme_id:LoanId,
                    loan_term_months:monthTenureStart ,
                    pan,
                    aadhar,
                    passport,
                    photo:ProfilePhoto,
                    bank_statement:BankStatement,
                    salary_slip:SalarySlip,
                    age_start: ageStart,
                    desc:Description,
                    // age_end: ageEnd,
                    min_month_family_income: minMonthFamilyIncome,
                    // loan_amt_start: loanAmtStart,
                    // loan_amt_end: loanAmtEnd,
                    // month_tenure_start: monthTenureStart,
                    // month_tenure_end: monthTenureEnd,
                    process_fee: processFeeStart,
                    is_pre_approve:PreApproveData,
                    // process_fee_end: processFeeEnd,
                    is_act: true
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await response.json();
            alert('Thank you! Your record has been successfully submitted.');
            window.location.href = '/get-loans';

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    // const [distributeData, setDistributeData] = useState(null);
    // const [alertMessage, setAlertMessage] = useState('');
    // const [showAlert, setShowAlert] = useState(false);

    // const fetchDistributeData = async () => {
    //     try {
    //         const response = await fetch('https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/distribute-application', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${authToken}`
    //             }
    //         });

    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         const data = await response.json();
    //         setDistributeData(data);

    //         if (data && data.length > 0) {
    //             window.confirm("Are you sure you send this record?");
    //             // setAlertMessage('There are send loans, please check.');
    //         } else {
    //             setAlertMessage('No Data available.');
    //         }
    //         setShowAlert(true);
    //     } catch (error) {
    //         console.error('There was a problem with the fetch operation:', error);
    //         setAlertMessage('No Data available.');
    //         setShowAlert(true);
    //     }
    // };

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
                        <CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h5'>
                            Loan Details
							</CardTitle>
						</CardLabel>
						{/* <CardActions>
                            <Button
                                color='info'
                                onClick={fetchDistributeData}
                            >
                                Distribute Loan Application
                            </Button>
                            {showAlert && (
                            <div className="">
                                <p style={{textAlign:'center'}}>{alertMessage}</p>
                            </div>
                        )}
						</CardActions> */}
					</CardHeader>
                            <div className='row'>
                                <div className='col-lg-12 col-md-12'>
                                    <CardBody className='pb-0'>
                                        <div className='row g-4'>
                                            <div className='col-4'>
                                                <label htmlFor="LoanSchemeName" className="form-label">Loan Scheme Name</label>
                                                <FormGroup id='loan_amount'>
                                                    <select
                                                        value={LoanId}
                                                        onChange={(e) => setLoanId(e.target.value)}
                                                        className='selectvalue'
                                                    >
                                                            <option value="" disabled>Select Loan Name</option>

                                                        {userData?.message?.loanSchemeName?.map((user) => (
                                                        
                                                            <option key={user.id} value={user.id}>{user.name}</option>
                                                        
                                                        ))}
                                                    </select>
                                                </FormGroup>
                                                {errorMessage.LoanId && <div className="text-danger">{errorMessage.LoanId}</div>}
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="LoanAmountStart" className="form-label">Loan Amount</label>
                                                <FormGroup id='LoanAmountStart'>
                                                    <Input
                                                        type='text'
                                                        name='LoanAmountStart'
                                                        placeholder='Loan Amount'
                                                        autoComplete='LoanAmountStart'
                                                        value={loanAmtStart}
                                                        onChange={(e) => setLoanAmtStart(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.loanAmtStart && <div className="text-danger">{errorMessage.loanAmtStart}</div>}
                                            </div>
                                            
                                            <div className='col-4'>
                                                <label htmlFor="InterestRateStart" className="form-label">Interest Rate</label>
                                                <FormGroup id='InterestRateStart'>
                                                    <Input
                                                        type='text'
                                                        name='InterestRateStart'
                                                        placeholder='Interest Rate'
                                                        autoComplete='Interest Rate'
                                                        value={interestRate}
                                                        onChange={(e) => setInterestRate(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.interestRate && <div className="text-danger">{errorMessage.interestRate}</div>}
                                            </div>
                                            
                                            <div className='col-4'>
                                                <label htmlFor="MonthTenureStart" className="form-label">Tenure(in months)</label>
                                                <FormGroup id='MonthTenureStart'>
                                                    <Input
                                                        type='text'
                                                        name='MonthTenureStart'
                                                        placeholder='Tenure'
                                                        autoComplete='MonthTenureStart'
                                                        value={monthTenureStart}
                                                        onChange={(e) => setMonthTenureStart(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.monthTenureStart && <div className="text-danger">{errorMessage.monthTenureStart}</div>}
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="MinMonthlyFamilyIncome" className="form-label">Minimum Monthly Family Income</label>
                                                <FormGroup id='MinMonthlyFamilyIncome'>
                                                    <Input
                                                        type='text'
                                                        name='MinMonthlyFamilyIncome'
                                                        placeholder='Minimum Monthly Family Income'
                                                        autoComplete='MinMonthlyFamilyIncome'
                                                        value={minMonthFamilyIncome}
                                                        onChange={(e) => setMinMonthFamilyIncome(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.minMonthFamilyIncome && <div className="text-danger">{errorMessage.minMonthFamilyIncome}</div>}
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="AgeStart" className="form-label">Min Age</label>
                                                <FormGroup id='AgeStart'>
                                                    <Input
                                                        type='text'
                                                        name='AgeStart'
                                                        placeholder='Min Age'
                                                        autoComplete='AgeStart'
                                                        value={ageStart}
                                                        onChange={(e) => setAgeStart(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.ageStart && <div className="text-danger">{errorMessage.ageStart}</div>}
                                            </div>
                                            {/* <div className='col-4'>
                                                <label htmlFor="InterestRateEnd" className="form-label">Interest Rate End</label>
                                                <FormGroup id='InterestRateEnd'>
                                                    <Input
                                                        type='text'
                                                        name='InterestRateEnd'
                                                        placeholder='Interest Rate End'
                                                        autoComplete='Loan Term Months'
                                                        value={interestRateEnd}
                                                        onChange={(e) => setinterestRateEnd(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.interestRateEnd && <div className="text-danger">{errorMessage.interestRateEnd}</div>}
                                            </div> */}
                                            <div className='col-4'>
                                                <label htmlFor="PanCard" className="form-label">Pan Card</label>
                                                <FormGroup id='PanCard'>
                                                    <select
                                                        value={pan}
                                                        onChange={(e) => setPan(e.target.value)}
                                                        className='selectvalue'
                                                    >
                                                        <option value=''>Pan Card</option>
                                                        <option value='true'>Yes</option>
                                                        <option value='false'>No</option>
                                                    </select>
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="AadharCard" className="form-label">Aadhar Card</label>
                                                <FormGroup id='AadharCard'>
                                                    <select
                                                        value={aadhar}
                                                        onChange={(e) => setAadhar(e.target.value)}
                                                        className='selectvalue'
                                                    >
                                                        <option value=''>Aadhar Card</option>
                                                        <option value='true'>Yes</option>
                                                        <option value='false'>No</option>
                                                    </select>
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="Paasport" className="form-label">Paasport</label>
                                                <FormGroup id='Paasport'>
                                                    <select
                                                        value={passport}
                                                        onChange={(e) => setPassport(e.target.value)}
                                                        className='selectvalue'
                                                    >
                                                        <option value=''>Paasport</option>
                                                        <option value='true'>Yes</option>
                                                        <option value='false'>No</option>
                                                    </select>
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="ProfilePhoto" className="form-label">Profile Photo</label>
                                                <FormGroup id='ProfilePhoto'>
                                                    <select
                                                        value={ProfilePhoto}
                                                        onChange={(e) => setProfilePhoto(e.target.value)}
                                                        className='selectvalue'
                                                    >
                                                        <option value=''>Profile Photo</option>
                                                        <option value='true'>Yes</option>
                                                        <option value='false'>No</option>
                                                    </select>
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="SalarySlip" className="form-label">Salary Slip</label>
                                                <FormGroup id='SalarySlip'>
                                                    <select
                                                        value={SalarySlip}
                                                        onChange={(e) => setSalarySlip(e.target.value)}
                                                        className='selectvalue'
                                                    >
                                                        <option value=''>Salary Slip</option>
                                                        <option value='true'>Yes</option>
                                                        <option value='false'>No</option>
                                                    </select>
                                                </FormGroup>
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="BankStatement" className="form-label">BankStatement</label>
                                                <FormGroup id='BankStatement'>
                                                    <select
                                                        value={BankStatement}
                                                        onChange={(e) => setBankStatement(e.target.value)}
                                                        className='selectvalue'
                                                    >
                                                        <option value=''>Bank Statement</option>
                                                        <option value='true'>Yes</option>
                                                        <option value='false'>No</option>
                                                    </select>
                                                </FormGroup>
                                            </div>
                                            
                                            
                                            {/* <div className='col-4'>
                                                <label htmlFor="AgeEnd" className="form-label">Age End</label>
                                                <FormGroup id='AgeEnd'>
                                                    <Input
                                                        type='text'
                                                        name='AgeEnd'
                                                        placeholder='Age End'
                                                        autoComplete='AgeEnd'
                                                        value={ageEnd}
                                                        onChange={(e) => setAgeEnd(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.ageEnd && <div className="text-danger">{errorMessage.ageEnd}</div>}
                                            </div> */}
                                            
                                            
                                            {/* <div className='col-4'>
                                                <label htmlFor="LoanAmountEnd" className="form-label">Loan Amount End</label>
                                                <FormGroup id='LoanAmountEnd'>
                                                    <Input
                                                        type='text'
                                                        name='LoanAmountEnd'
                                                        placeholder='Loan Amount End'
                                                        autoComplete='LoanAmountEnd'
                                                        value={loanAmtEnd}
                                                        onChange={(e) => setLoanAmtEnd(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.loanAmtEnd && <div className="text-danger">{errorMessage.loanAmtEnd}</div>}
                                            </div> */}
                                           
                                            {/* <div className='col-4'>
                                                <label htmlFor="MonthTenureEnd" className="form-label">Month Tenure End</label>
                                                <FormGroup id='MonthTenureEnd'>
                                                    
                                                    <DatePicker
                    selected={monthTenureEnd}
                    onChange={(date) => setMonthTenureEnd(date)}
                    placeholderText="Month Tenure End"
                    className='selectvalue'
                /> 
                                                </FormGroup>
                                                {errorMessage.monthTenureEnd && <div className="text-danger">{errorMessage.monthTenureEnd}</div>}
                                            </div> */}
                                            <div className='col-4'>
                                                <label htmlFor="ProcessFeeStart" className="form-label">Process Fee</label>
                                                <FormGroup id='ProcessFeeStart'>
                                                    <Input
                                                        type='text'
                                                        name='ProcessFeeStart'
                                                        placeholder='Process Fee'
                                                        autoComplete='ProcessFeeStart'
                                                        value={processFeeStart}
                                                        onChange={(e) => setProcessFeeStart(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.processFeeStart && <div className="text-danger">{errorMessage.processFeeStart}</div>}
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="Description" className="form-label">Description</label>
                                                <FormGroup id='Description'>
                                                    <Input
                                                        type='text'
                                                        name='Description'
                                                        placeholder='Description'
                                                        autoComplete='Description'
                                                        value={Description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.Description && <div className="text-danger">{errorMessage.Description}</div>}
                                            </div>
                                            <div className='col-4'>
                                                <label htmlFor="PreApprove" className="form-label">Pre Approve</label>
                                                <FormGroup id='PreApprove'>
                                                    <select
                                                        value={PreApproveData}
                                                        onChange={(e) => setPreApproveData(e.target.value)}
                                                        className='selectvalue'
                                                    >
                                                        <option value=''>Pre Approve</option>
                                                        <option value='true'>Yes</option>
                                                        <option value='false'>No</option>
                                                    </select>
                                                </FormGroup>
                                            </div>
                                            {/* <div className='col-4'>
                                                <label htmlFor="ProcessFeeEnd" className="form-label">Process Fee End</label>
                                                <FormGroup id='ProcessFeeEnd'>
                                                    <Input
                                                        type='text'
                                                        name='ProcessFeeEnd'
                                                        placeholder='Process Fee End'
                                                        autoComplete='ProcessFeeEnd'
                                                        value={processFeeEnd}
                                                        onChange={(e) => setProcessFeeEnd(e.target.value)}
                                                    />
                                                </FormGroup>
                                                {errorMessage.processFeeEnd && <div className="text-danger">{errorMessage.processFeeEnd}</div>}
                                            </div> */}
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

export default CreateLoans;
