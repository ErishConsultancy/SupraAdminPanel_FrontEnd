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

const CreatePreapproveLoans = () => {
	const baseUrl = process.env.REACT_APP_BASE_URL;
	const navigate = useNavigate();

	const [CustomerID, setCustomerID] = useState('');
	const [loanschemeid, setloanschemeid] = useState('');
	const [aadhar, setAadhar] = useState('');
	const [pan, setPan] = useState('');
	const [ageEnd, setAgeEnd] = useState('');
	const [minMonthFamilyIncome, setMinMonthFamilyIncome] = useState('');
	const [loanAmtStart, setLoanAmtStart] = useState('');
	const [loanAmtEnd, setLoanAmtEnd] = useState('');
	const [errorMessage, setErrorMessage] = useState({});
	const authToken = localStorage.getItem('token');
	const [modalStatus1, setModalStatus1] = useState(false);
	const [Cibilescore, setCibileScore] = useState('');

	const [userData, setUserData] = useState(null);
	const [LoansScreenData, setLoansScreenData] = useState(null);

	const timeout = useRef(null);
    const timeoutDuration = 60 * 60 * 1000;

	console.log(aadhar, "aadhar");
	console.log(pan, "pan");
	console.log(ageEnd, "ageEnd");

	console.log(minMonthFamilyIncome, "minMonthFamilyIncome");
	console.log(loanAmtStart, "loanAmtStart");
	console.log(loanAmtEnd, "loanAmtEnd");
	console.log(Cibilescore, "Cibilescore");
	const fetchUserData = useCallback(async () => {
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
			setUserData(data);
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	}, [authToken, baseUrl]);

	const fetchLoansScreenData = useCallback(async () => {
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
			setLoansScreenData(data);
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	}, [authToken, baseUrl]);

	const [attachData, setAttachData] = useState(null);
	const [selectedUserId, setSelectedUserId] = useState(null);
	console.log(userData, 'Check Response New 98');
	console.log(LoansScreenData, 'Check LoansScreenData New 98');

	const fetchAttachLoanAPI = useCallback(
		async (userId) => {
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
						Authorization: `Bearer ${token}`,
					},
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
		},
		[baseUrl, fetchUserData],
	); // Add necessary dependencies

	useEffect(() => {
		if (selectedUserId) {
			fetchAttachLoanAPI(selectedUserId);
		}
	}, [selectedUserId, fetchAttachLoanAPI]);

	useEffect(() => {
		fetchUserData();
		fetchLoansScreenData();
	}, [fetchUserData, fetchLoansScreenData]);

	const UpdateFormAPI = async () => {
		const errors = {
			CustomerID: !CustomerID ? 'Please Enter Customer ID' : '',
			loanschemeid: !loanschemeid ? 'Please Enter Loan Screen ID' : '',
		};

		setErrorMessage(errors);

		if (Object.values(errors).some((error) => error)) {
			return;
		}

		const url = `${baseUrl}/pre-approve`;
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
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					cust_id: CustomerID,
					loan_scheme_id: loanschemeid,
				}),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			await response.json();
			alert('Thank you! Your record has been successfully submitted.');
			// window.location.href = '/preapprove';
			navigate('preapprove');
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	};
	// const { setIsOpen } = useTour();
	// console.log(attachData, 'attachData 1500');

	 
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
								<h4 className='heading-h4'>Create Pre Approve Loan </h4>
								<div className='col-lg-12 col-md-12'>
									<CardBody className='pb-0'>
										<div className='row g-4'>
											<div className='col-4'>
												<label htmlFor='CustomerID' className='form-label'>
													Customer ID
												</label>
												<FormGroup id='CustomerID'>
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
														{userData?.message?.customers?.customers?.map(
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
												{errorMessage.CustomerID && (
													<div className='text-danger'>
														{errorMessage.CustomerID}
													</div>
												)}
											</div>

											<div className='col-4'>
												<label htmlFor='CustomerID' className='form-label'>
													Loan Scheme ID
												</label>
												<FormGroup id='CustomerID'>
													<select
														value={loanschemeid}
														onChange={(e) => {
															setloanschemeid(e.target.value);
															setSelectedUserId(e.target.value);
														}}
														className='selectvalue'>
														<option value='' disabled>
															Loan Scheme ID
														</option>
														message.loanSchemeName[0].id
														{LoansScreenData?.message?.loanSchemeName?.map(
															(user) => (
																<option
																	key={user.id}
																	value={user.id}>
																	{user.id} {user.name}
																</option>
															),
														)}
													</select>
												</FormGroup>
												{errorMessage.loanschemeid && (
													<div className='text-danger'>
														{errorMessage.loanschemeid}
													</div>
												)}
											</div>
										</div>
									</CardBody>
									<CardFooter>
										<CardFooterRight>
											<Button color='info' onClick={UpdateFormAPI}>
												Submit
											</Button>
										</CardFooterRight>
									</CardFooter>
								</div>
							</div>
						</Card>
					</div>
				</div>
				<Modal isOpen={modalStatus1} setIsOpen={setModalStatus1}>
					<ModalHeader setIsOpen={setModalStatus1}>
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

export default CreatePreapproveLoans;
