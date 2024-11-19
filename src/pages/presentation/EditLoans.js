import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Card, {
	CardBody,
	CardFooter,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import 'react-datepicker/dist/react-datepicker.css';

import Input from '../../components/bootstrap/forms/Input';

const EditLoans = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [LoanId, setLoanId] = useState('');
	const [interestRate, setInterestRate] = useState('');
	const [passport, setPassport] = useState('');
	const [aadhar, setAadhar] = useState('');
	const [pan, setPan] = useState('');

	const [ProfilePhoto, setProfilePhoto] = useState('');
	const [SalarySlip, setSalarySlip] = useState('');
	const [BankStatement, setBankStatement] = useState('');
	const [ageStart, setAgeStart] = useState('');
	const [minMonthFamilyIncome, setMinMonthFamilyIncome] = useState('');
	const [loanAmtStart, setLoanAmtStart] = useState('');
	const [monthTenureStart, setMonthTenureStart] = useState('');
	const [processFeeStart, setProcessFeeStart] = useState('');
	const [Description, setDescription] = useState('');
	const [userData, setUserData] = useState(null);
	const authToken = localStorage.getItem('token');
	const baseUrl = process.env.REACT_APP_BASE_URL;
	const timeout = useRef(null);
    const timeoutDuration = 60 * 60 * 1000;
	const fetchUserData = useCallback(async () => {
		try {
			const response = await fetch(`${baseUrl}/loans/${id}`, {
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
			setUserData(data);
			setLoanId(data?.message?.getAllLoanScheme?.loan_sch_nme_id || '');
			setLoanAmtStart(data?.message?.getAllLoanScheme?.loan_amount || '');
			setInterestRate(data?.message?.getAllLoanScheme?.interest_rate || '');
			setMonthTenureStart(data?.message?.getAllLoanScheme?.loan_term_months || '');
			setMinMonthFamilyIncome(data?.message?.getAllLoanScheme?.min_month_family_income || '');

			setAgeStart(JSON.stringify(data?.message?.getAllLoanScheme?.age_start) || '');
			setPan(JSON.stringify(data?.message?.getAllLoanScheme?.pan) || '');
			setAadhar(JSON.stringify(data?.message?.getAllLoanScheme?.aadhar) || '');
			setPassport(JSON.stringify(data?.message?.getAllLoanScheme?.passport) || '');
			setProfilePhoto(JSON.stringify(data?.message?.getAllLoanScheme?.photo) || '');
			setSalarySlip(JSON.stringify(data?.message?.getAllLoanScheme?.salary_slip) || '');
			setBankStatement(JSON.stringify(data?.message?.getAllLoanScheme?.bank_statement) || '');
			setProcessFeeStart(data?.message?.getAllLoanScheme?.process_fee || '');
			setDescription(data?.message?.getAllLoanScheme?.desc || '');
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	}, [id, authToken, baseUrl]);

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

    const UpdateFormAPI = async () => {
        const url = `${baseUrl}/loans/${id}`;
        const token = Cookies.get('token');
    
        if (!token) {
            console.error('Authentication token is missing');
            return;
        }
    
        const data = {
            is_deleted: false,
            loan_amount: loanAmtStart,
            interest_rate: interestRate,
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
            min_month_family_income: minMonthFamilyIncome,
            process_fee: processFeeStart,
            is_act: true
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
            // window.location.href = '/get-loans';
			navigate('/get-loans');

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('There was an error submitting your form. Please try again.');
        }
    };
	console.log(userData, 'userData Edit API');

	const [LoadIDData, setLoadIDData] = useState(null);

	const fetchLoadIDData = useCallback(async () => {
		try {
			const response = await fetch(`${baseUrl}/setting/loan-scheme-name/`, {
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
			setLoadIDData(data);
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	}, [authToken, baseUrl]);

	useEffect(() => {
		fetchUserData();
		fetchLoadIDData();
	}, [fetchUserData, fetchLoadIDData]);
	const [selectedUserId, setSelectedUserId] = useState(null);

	useEffect(() => {
		if (selectedUserId) {
			fetchUserData(selectedUserId);
		}
	}, [selectedUserId, fetchUserData]);

	useEffect(() => {
		if (selectedUserId) {
			fetchLoadIDData(selectedUserId);
		}
	}, [selectedUserId, fetchLoadIDData]);

	console.log(LoadIDData, 'LoadIDData Edit API');
	console.log(pan, 'pan');

	const handlePanChange = (e) => {
		const selectedPan = e.target.value;
		setPan(selectedPan);
		console.log(selectedPan, 'pan');
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
							<CardHeader>
								<CardLabel>
									<CardTitle tag='div' className='h5'>
										Update Loan Details
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<div className='row'>
								<div className='col-lg-12 col-md-12'>
									<CardBody className='pb-0'>
										<div className='row g-4'>
											<div className='col-4'>
												<label
													htmlFor='LoanSchemeName'
													className='form-label'>
													Loan Scheme Name
												</label>
												<FormGroup id='loan_amount'>
													<select
														value={LoanId}
														onChange={(e) => {
															setLoanId(e.target.value);
															setSelectedUserId(e.target.value);
														}}
														className='selectvalue'>
														<option value='' disabled>
															Select Loan Name
														</option>

														{LoadIDData?.message?.loanSchemeName?.map(
															(user) => (
																<option
																	key={user.id}
																	value={user.id}>
																	{user.name}
																</option>
															),
														)}
													</select>
												</FormGroup>
											</div>
											<div className='col-4'>
												<label
													htmlFor='LoanAmountStart'
													className='form-label'>
													Loan Amount
												</label>
												<FormGroup id='LoanAmountStart'>
													<Input
														type='text'
														name='LoanAmountStart'
														placeholder='Loan Amount'
														autoComplete='LoanAmountStart'
														value={loanAmtStart}
														onChange={(e) =>
															setLoanAmtStart(e.target.value)
														}
													/>
												</FormGroup>
											</div>

											<div className='col-4'>
												<label
													htmlFor='InterestRateStart'
													className='form-label'>
													Interest Rate
												</label>
												<FormGroup id='InterestRateStart'>
													<Input
														type='text'
														name='InterestRateStart'
														placeholder='Interest Rate'
														autoComplete='Interest Rate'
														value={interestRate}
														onChange={(e) =>
															setInterestRate(e.target.value)
														}
													/>
												</FormGroup>
											</div>

											<div className='col-4'>
												<label
													htmlFor='MonthTenureStart'
													className='form-label'>
													Tenure(in months)
												</label>
												<FormGroup id='MonthTenureStart'>
													<Input
														type='text'
														name='MonthTenureStart'
														placeholder='Tenure'
														autoComplete='MonthTenureStart'
														value={monthTenureStart}
														onChange={(e) =>
															setMonthTenureStart(e.target.value)
														}
													/>
												</FormGroup>
											</div>
											<div className='col-4'>
												<label
													htmlFor='MinMonthlyFamilyIncome'
													className='form-label'>
													Minimum Monthly Family Income
												</label>
												<FormGroup id='MinMonthlyFamilyIncome'>
													<Input
														type='text'
														name='MinMonthlyFamilyIncome'
														placeholder='Minimum Monthly Family Income'
														autoComplete='MinMonthlyFamilyIncome'
														value={minMonthFamilyIncome}
														onChange={(e) =>
															setMinMonthFamilyIncome(e.target.value)
														}
													/>
												</FormGroup>
											</div>
											<div className='col-4'>
												<label htmlFor='AgeStart' className='form-label'>
													Min Age
												</label>
												<FormGroup id='AgeStart'>
													<Input
														type='text'
														name='AgeStart'
														placeholder='Min Age'
														autoComplete='AgeStart'
														value={ageStart}
														onChange={(e) =>
															setAgeStart(e.target.value)
														}
													/>
												</FormGroup>
											</div>
											<div className='col-4'>
												<label htmlFor='PanCard' className='form-label'>
													Pan Card
												</label>
												<FormGroup id='PanCard'>
													<select
														value={pan}
														onChange={handlePanChange}
														className='selectvalue'>
														<option value=''>Pan Card</option>
														<option value='true'>Yes</option>
														<option value='false'>No</option>
													</select>
												</FormGroup>
											</div>
											<div className='col-4'>
												<label htmlFor='AadharCard' className='form-label'>
													Aadhar Card
												</label>
												<FormGroup id='AadharCard'>
													<select
														value={aadhar}
														onChange={(e) => setAadhar(e.target.value)}
														className='selectvalue'>
														<option value=''>Aadhar Card</option>
														<option value='true'>Yes</option>
														<option value='false'>No</option>
													</select>
												</FormGroup>
											</div>
											<div className='col-4'>
												<label htmlFor='Paasport' className='form-label'>
													Paasport
												</label>
												<FormGroup id='Paasport'>
													<select
														value={passport}
														onChange={(e) =>
															setPassport(e.target.value)
														}
														className='selectvalue'>
														<option value=''>Paasport</option>
														<option value='true'>Yes</option>
														<option value='false'>No</option>
													</select>
												</FormGroup>
											</div>
											<div className='col-4'>
												<label
													htmlFor='ProfilePhoto'
													className='form-label'>
													Profile Photo
												</label>
												<FormGroup id='ProfilePhoto'>
													<select
														value={ProfilePhoto}
														onChange={(e) =>
															setProfilePhoto(e.target.value)
														}
														className='selectvalue'>
														<option value=''>Profile Photo</option>
														<option value='true'>Yes</option>
														<option value='false'>No</option>
													</select>
												</FormGroup>
											</div>
											<div className='col-4'>
												<label htmlFor='SalarySlip' className='form-label'>
													Salary Slip
												</label>
												<FormGroup id='SalarySlip'>
													<select
														value={SalarySlip}
														onChange={(e) =>
															setSalarySlip(e.target.value)
														}
														className='selectvalue'>
														<option value=''>Salary Slip</option>
														<option value='true'>Yes</option>
														<option value='false'>No</option>
													</select>
												</FormGroup>
											</div>
											<div className='col-4'>
												<label
													htmlFor='BankStatement'
													className='form-label'>
													Bank Statement
												</label>
												<FormGroup id='BankStatement'>
													<select
														value={BankStatement}
														onChange={(e) =>
															setBankStatement(e.target.value)
														}
														className='selectvalue'>
														<option value=''>Bank Statement</option>
														<option value='true'>Yes</option>
														<option value='false'>No</option>
													</select>
												</FormGroup>
											</div>

											<div className='col-4'>
												<label
													htmlFor='ProcessFeeStart'
													className='form-label'>
													Process Fee
												</label>
												<FormGroup id='ProcessFeeStart'>
													<Input
														type='text'
														name='ProcessFeeStart'
														placeholder='Process Fee'
														autoComplete='ProcessFeeStart'
														value={processFeeStart}
														onChange={(e) =>
															setProcessFeeStart(e.target.value)
														}
													/>
												</FormGroup>
												
												
											</div>
											<div className='col-4'>
												<label htmlFor='Description' className='form-label'>
													Description
												</label>
												<FormGroup id='Description'>
													<Input
														type='text'
														name='Description'
														placeholder='Description'
														autoComplete='Description'
														value={Description}
														onChange={(e) =>
															setDescription(e.target.value)
														}
													/>
												</FormGroup>
												
											</div>
											
										</div>
									</CardBody>
									<CardFooter>
										<CardFooterRight>
											<Button color='info' onClick={UpdateFormAPI}>
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

export default EditLoans;
