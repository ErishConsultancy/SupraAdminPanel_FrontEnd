import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Button from '../../components/bootstrap/Button';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
// import InputGroup from '../../components/bootstrap/forms/InputGroup';
import Input from '../../components/bootstrap/forms/Input';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Label from '../../components/bootstrap/forms/Label';
import useDarkMode from '../../hooks/useDarkMode';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
// import Alert from '../../components/bootstrap/Alert';
import Accordion, { AccordionItem } from '../../components/bootstrap/Accordion';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../components/bootstrap/OffCanvas';
import Checks from '../../components/bootstrap/forms/Checks';

const PreApproveApplication = () => {
	const authToken = localStorage.getItem('token');
	// const ErishLoginCheck = localStorage.getItem('ErishLogin');
	const baseUrl = process.env.REACT_APP_BASE_URL;

	const [userData, setUserData] = useState(null);
	// const [sortColumn, setSortColumn] = useState('');
	// const [sortOrder, setSortOrder] = useState('asc');
	// const [searchQuery, setSearchQuery] = useState('');
	const [modalStatus1, setModalStatus1] = useState(false);
	const [modalStatus2, setModalStatus2] = useState(false);

	const [reason, setReason] = useState(''); // Renamed to reason for consistency
	const [errorMessage, setErrorMessage] = useState({ reason: '' });
	const [rejectLoanId, setRejectLoanId] = useState(null);
	const [ApproveLoanId, setApproveLoanId] = useState(null);
	const [ApproveCustId, setApproveCustId] = useState(null);


	const [CustomerAttachData, setCustomerAttachData] = useState(null);
	const [isChecked, setIsChecked] = useState(false); // State for checkbox

	const navigate = useNavigate();
	const timeout = useRef(null);
    const timeoutDuration = 60 * 60 * 1000;


	console.log(rejectLoanId, 'rejectLoanId');

    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/pre-approve-app/`, {
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
    }, [authToken, baseUrl]);

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);
	console.log(userData, 'userData 1505');

	// const fetchApproveLoanAPI = async (ApproveLoanId, ApproveCustId) => {
	// 	try {
	// 		const response = await fetch(
	// 		`https://suprafinleaselimitedbe-production.up.railway.app/api/pre-approve-app/accept/${ApproveLoanId}`,
			
	// 			{
	// 				method: 'POST',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 					Authorization: `Bearer ${authToken}`,
	// 				},
	// 				body: JSON.stringify({cust_id : ApproveCustId}),
	// 			},
				
				
	// 		);

	// 		if (!response.ok) {
	// 			throw new Error('Network response was not ok');
	// 		}
	// 		setModalStatus2(false);

	// 		fetchUserData();
	// 	} catch (error) {
	// 		console.error('There was a problem with the fetch operation:', error);
	// 	}
	// };

	const fetchApproveLoanAPI = async (loanId, custId) => {
	try {
		const response = await fetch(
			`https://suprafinleaselimitedbe-production.up.railway.app/api/pre-approve-app/accept/${loanId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
				body: JSON.stringify({ cust_id: custId }),
			}
		);

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		setModalStatus2(false);
		fetchUserData();
	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
	}
};

	const fetchRejectLoanAPI = async (id) => {
		const errors = {
			reason: !reason ? 'Please Enter Reason' : '',
		};

		setErrorMessage(errors);

		if (Object.values(errors).some((error) => error)) {
			return;
		}

		const url = `https://suprafinleaselimitedbe-production.up.railway.app/api/pre-approve-app/reject/${id}`;
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
					rmk:reason,
				}),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			// const json = await response.json();
			alert('Thank you! Your record has been successfully Rejected.');
			fetchUserData();
			setModalStatus1(false);
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	};

	const { themeStatus } = useDarkMode();

	// const handleApproveClick = (id) => {
	// 	if (window.confirm('Are you sure you want to Approve this record?')) {
	// 		fetchApproveLoanAPI(id);
	// 	}
	// };

	const getStatusClass = (status) => {
		switch (status) {
			case 'CRE':
				return 'orange';
			case 'APR':
				return 'green';
			case 'REJ':
				return 'red';
			default:
				return '';
		}
	};


	const [filterCustomerId, setFilterCustomerId] = useState('');
	const [filterName, setFilterName] = useState('');
	const [filterAadhar, setFilterAadhar] = useState('');
	const [filterPan, setFilterPan] = useState('');
	const [filterOccupation, setFilterOccupation] = useState('');
	const [filterCibilScore, setFilterCibilScore] = useState('');
	const [filterStatus, setFilterStatus] = useState('');

	const filterData = (data) => {
		return data.filter((item) => {
			return (
				(!filterCustomerId ||
					(item.cust_id &&
						item.cust_id.toLowerCase().includes(filterCustomerId.toLowerCase()))) &&
				(!filterName ||
					(item.customer?.fname &&
						item.customer.fname.toLowerCase().includes(filterName.toLowerCase()))) &&
				(!filterAadhar ||
					(item.aadhar_number &&
						item.aadhar_number.toLowerCase().includes(filterAadhar.toLowerCase()))) &&
				(!filterPan ||
					(item.pan_number &&
						item.pan_number.toLowerCase().includes(filterPan.toLowerCase()))) &&
				(!filterOccupation ||
					(item.occupation &&
						item.occupation.toLowerCase().includes(filterOccupation.toLowerCase()))) &&
				(!filterCibilScore ||
					(item.cibil_score &&
						item.cibil_score
							.toString()
							.toLowerCase()
							.includes(filterCibilScore.toLowerCase()))) &&
				(!filterStatus ||
					(item.status && item.status.toLowerCase().includes(filterStatus.toLowerCase())))
			);
		});
	};

	const filteredData = filterData(userData?.message?.loanApplications?.loanApplications || []);
	// const currentItems = filteredData;

	// const renderSortIcon = (column) => {
	// 	if (sortColumn === column) {
	// 		return sortOrder === 'asc' ? (
	// 			<i className='fas fa-arrow-up' />
	// 		) : (
	// 			<i className='fas fa-arrow-down' />
	// 		);
	// 	}
	// 	return null;
	// };
	const [offcanvasStatus, setOffcanvasStatus] = useState(false);
	console.log(filteredData, 'filteredData Check New data');

	const handleSearchAndClose = () => {
		// You can perform any additional search/filter logic here if needed
		// const filteredData = filterData(userData?.message?.loanApplications?.loanApplications || []);
		setUserData((prevData) => ({
			...prevData,
			message: {
				...prevData.message,
				loanApplications: {
					...prevData.message.loanApplications,
					loanApplications: filteredData,
				},
			},
		}));
		// Close the offcanvas
		setOffcanvasStatus(false);
	};

	const handleClearFilters = () => {
		setFilterCustomerId('');
		setFilterName('');
		setFilterAadhar('');
		setFilterPan('');
		setFilterOccupation('');
		setFilterCibilScore('');
		setFilterStatus('');
		fetchUserData();
	};


	const fetchCustomerAttachment = useCallback(async () => {
		try {
			const response = await fetch(
				`https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/loan-application/${rejectLoanId}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				},
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			console.log(data, "data")
			setCustomerAttachData(data);
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	}, [rejectLoanId]);
	useEffect(() => {
		fetchCustomerAttachment();
	}, [fetchCustomerAttachment]);
	console.log(rejectLoanId, 'rejectLoanId');
	console.log(CustomerAttachData, 'setCustomerAttachData');

	const handleCheckboxChange = (e) => {
		setIsChecked(e.target.checked);
	};

	// Function to handle loan approval
	const handleSubmitApproveLoans = ( loanId, custId) => {
		if (isChecked) {
			fetchApproveLoanAPI(loanId, custId);
		} else {
			alert("You must check the box to approve the loan.");
		}
	};


	// const isErishLoggedIn = ErishLoginCheck !== 'false' && ErishLoginCheck !== null;
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


	const RefreshCibilScoreAPI = async (MyLoanId, CustId, AssignNBFCId) => {
		const data = {
			loan_app: MyLoanId,
			assigned_nbfc: AssignNBFCId,
			cust_id: String(CustId),
			is_pre_approve: true,
		};
		try {
			const response = await fetch(
				`https://suprafinleaselimitedbe-production.up.railway.app/api/credit-score/refresh`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${authToken}`,
					},
					body: JSON.stringify(data),
				},
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			fetchUserData();
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	};

	const handleAssignNBFCClick = (MyLoanId, CustId, AssignNBFCId) => {
		if (window.confirm('Are you sure you want to Referesh Cibil Score?')) {
			RefreshCibilScoreAPI(MyLoanId, CustId, AssignNBFCId);
		}
	};

	
	return (
		<PageWrapper>
			<Page>
				<Card stretch data-tour='list'>
					<CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h5'>
								All Pre Approve Loans
							</CardTitle>
						</CardLabel>
						
					</CardHeader>

					<CardBody className='table-responsive table-2' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
                            <tr>
								<th scope='col'>Sr.</th>
                                <th scope='col'>Cust ID</th>
                                <th scope='col'>Occupation</th>
                                <th scope='col'>Monthly Income</th>
								<th scope='col'>Aadhar Number</th>
                                <th scope='col'>Pan Number</th>
                                <th scope='col'>Cibil Score</th>
                                <th scope='col'>Status</th>
									<th scope='col'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
							{userData?.message?.getAllPreApprove?.preApprove?.map((user, index) => (
									<tr key={user.id}>
										<td>{index + 1}</td>
										{/* <td>{item.id}</td> */}
										{/* <td>{item.cust_id}</td> */}
                                        <td>{user.cust_id}</td>
										<td>{user.occupation}</td>
                                        <td>{user.monthly_income}</td>
                                        <td>{user.aadhar_number}</td>
										<td>{user.pan_number}</td>
                                        <td>{user.cibil_score}</td>
										<td className={getStatusClass(user.status)}>
											{user.status}
										</td>
											<td>
												<Dropdown>
													<DropdownToggle hasIcon={false}>
														<Button
															color={themeStatus}
															icon='MoreHoriz'
															aria-label='More options'
														/>
													</DropdownToggle>
													<DropdownMenu isAlignmentEnd>

															{user?.cibil_score ? (
															<p>.</p>
													     	) : (
																<DropdownItem>
																	<Button
																		onClick={() => {
																			handleAssignNBFCClick(
																				user.id,
																				user.cust_id,
																				user.assigned_nbfc,
																			);
																		}}>
																		Cibil Score
																	</Button>
															</DropdownItem>
															)}

															

														<DropdownItem>
															<Button
																onClick={() => { setApproveLoanId(user?.id);
																	setApproveCustId(user?.cust_id); 
																	setModalStatus2(true);}
																	// handleApproveClick(item.id)
																}>
																Approve
															</Button>
														</DropdownItem>
														<DropdownItem>
															<Button
																onClick={() => {
																	setRejectLoanId(user.id);
																	setModalStatus1(true);
																}}>
																Reject
															</Button>
														</DropdownItem>
													</DropdownMenu>
												</Dropdown>
											</td>
										
									</tr>
								))}
							</tbody>
						</table>
					</CardBody>
				</Card>

				<Modal
					isOpen={modalStatus1}
					onClose={() => setModalStatus1(false)}
					setIsOpen={setModalStatus1}>
					<ModalHeader setIsOpen={setModalStatus1}>
						<ModalTitle id='new-todo-modal'>Reject Loan</ModalTitle>
					</ModalHeader>
					<ModalBody>
						

						<Label htmlFor='reason'>Reject Reason*</Label>

						<FormGroup>
							<Input
								type='text'
								id='reason'
								name='reason'
								placeholder='Reject Reason'
								autoComplete='off'
								value={reason}
								onChange={(e) => setReason(e.target.value)}
							/>
							{errorMessage.reason && (
								<div className='text-danger'>{errorMessage.reason}</div>
							)}
						</FormGroup><br />
						

						<Button
							type='button'
							onClick={() => fetchRejectLoanAPI(rejectLoanId)}
							className='reject-button'>
							Submit
						</Button>
					</ModalBody>
				</Modal>

				<Modal
					isOpen={modalStatus2}
					onClose={() => setModalStatus2(false)}
					setIsOpen={setModalStatus2}>
					<ModalHeader setIsOpen={setModalStatus2}>
						<ModalTitle id='new-todo-modal'>Approve Loan</ModalTitle>
					</ModalHeader>
					<ModalBody className='Approve-loan-body'>
					<h2>Are you sure you want to approve this loan?</h2>
<div className='check-div'>
						<Checks
						type="checkbox"
						checked={isChecked}
						onChange={handleCheckboxChange}
						className="check-css"
					/>

					<p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

</p>
</div>
						

						<Button
							type='button'
							onClick={() => handleSubmitApproveLoans(ApproveLoanId, ApproveCustId)}
							className='reject-button'>
							Submit
						</Button>
					</ModalBody>
				</Modal>


				<OffCanvas
					id='notificationCanvas'
					titleId='offcanvasExampleLabel'
					placement='end'
					isOpen={offcanvasStatus}
					setOpen={setOffcanvasStatus}>
					<OffCanvasHeader setOpen={setOffcanvasStatus}>
						<OffCanvasTitle id='offcanvasExampleLabel'>Filter</OffCanvasTitle>
					</OffCanvasHeader>

					<OffCanvasBody>
						<div className='filter-div'>
							<div className='filter-div-inner'>
								<Accordion
									id='searchAccordion'
									className='my-accordion'
									// shadow='default'
									isFlush={false}
									color='primary'>
									<AccordionItem
										id='searchByCustomerId'
										title='Search By Customer ID'
										icon='Identification'
										className='search-heading'>
										<input
											type='text'
											placeholder='Enter Customer ID'
											className='form-control'
											value={filterCustomerId}
											onChange={(e) => setFilterCustomerId(e.target.value)}
										/>
										<Button
											type='button'
											className='btn btn-basic mt-4 mb-3'
											onClick={handleClearFilters}>
											Clear
										</Button>
										<Button
											type='button'
											className='btn btn-primary mt-4 ml-3 mb-3'
											onClick={handleSearchAndClose}>
											Search
										</Button>
									</AccordionItem>

									<AccordionItem
										id='searchByName'
										title='Search By Name'
										className='search-heading'>
										<input
											type='text'
											placeholder='Enter Name'
											className='form-control'
											value={filterName}
											onChange={(e) => setFilterName(e.target.value)}
										/>
										<Button
											type='button'
											className='btn btn-basic mt-4 mb-3'
											onClick={handleClearFilters}>
											Clear
										</Button>
										<Button
											type='button'
											className='btn btn-primary mt-4 ml-3 mb-3'
											onClick={handleSearchAndClose}>
											Search
										</Button>
									</AccordionItem>

									<AccordionItem
										id='searchByAadhar'
										title='Search By Aadhar Card'
										className='search-heading'>
										<input
											type='text'
											placeholder='Enter Aadhar Card Number'
											className='form-control'
											value={filterAadhar}
											onChange={(e) => setFilterAadhar(e.target.value)}
										/>
										<Button
											type='button'
											className='btn btn-basic mt-4 mb-3'
											onClick={() => setFilterAadhar('')}>
											Clear
										</Button>
										<Button
											type='button'
											className='btn btn-primary mt-4 ml-3 mb-3'
											onClick={handleSearchAndClose}>
											Search
										</Button>
									</AccordionItem>

									<AccordionItem
										id='searchByPan'
										title='Search By Pan Card'
										className='search-heading'>
										<input
											type='text'
											placeholder='Enter PAN Card Number'
											className='form-control'
											value={filterPan}
											onChange={(e) => setFilterPan(e.target.value)}
										/>
										<Button
											type='button'
											className='btn btn-basic mt-4 mb-3'
											onClick={() => setFilterPan('')}>
											Clear
										</Button>
										<Button
											type='button'
											className='btn btn-primary mt-4 ml-3 mb-3'
											onClick={handleSearchAndClose}>
											Search
										</Button>
									</AccordionItem>
									<AccordionItem
										id='searchByOccupation'
										title='Search By Occupation'
										className='search-heading'>
										<input
											type='text'
											placeholder='Enter Occupation'
											className='form-control'
											value={filterOccupation}
											onChange={(e) => setFilterOccupation(e.target.value)}
										/>
										<Button
											type='button'
											className='btn btn-basic mt-4 mb-3'
											onClick={() => setFilterOccupation('')}>
											Clear
										</Button>
										<Button
											type='button'
											className='btn btn-primary mt-4 ml-3 mb-3'
											onClick={handleSearchAndClose}>
											Search
										</Button>
									</AccordionItem>
									<AccordionItem
										id='searchByCibil Score'
										title='Search By Cibil Score'
										className='search-heading'>
										<input
											type='text'
											placeholder='Enter Cibil Score'
											className='form-control'
											value={filterCibilScore}
											onChange={(e) => setFilterCibilScore(e.target.value)}
										/>
										<Button
											type='button'
											className='btn btn-basic mt-4 mb-3'
											onClick={() => setFilterCibilScore('')}>
											Clear
										</Button>
										<Button
											type='button'
											className='btn btn-primary mt-4 ml-3 mb-3'
											onClick={handleSearchAndClose}>
											Search
										</Button>
									</AccordionItem>

									<AccordionItem
										id='searchByStatus'
										title='Search By Status'
										className='search-heading'>
										<input
											type='text'
											placeholder='Enter Status'
											className='form-control'
											value={filterStatus}
											onChange={(e) => setFilterStatus(e.target.value)}
										/>
										<Button
											type='button'
											className='btn btn-basic mt-4 mb-3'
											onClick={handleClearFilters}>
											Clear
										</Button>
										<Button
											type='button'
											className='btn btn-primary mt-4 ml-3 mb-3'
											onClick={handleSearchAndClose}>
											Search
										</Button>
									</AccordionItem>
								</Accordion>
							</div>
						</div>
					</OffCanvasBody>
				</OffCanvas>
			</Page>
		</PageWrapper>
	);
};
export default PreApproveApplication
