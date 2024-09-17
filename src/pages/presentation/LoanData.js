import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Button from '../../components/bootstrap/Button';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
	CardActions,
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

const LoanData = () => {
	const authToken = localStorage.getItem('token');
	const ErishLoginCheck = localStorage.getItem('ErishLogin');

	const [userData, setUserData] = useState(null);
	const [sortColumn, setSortColumn] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');
	// const [searchQuery, setSearchQuery] = useState('');
	const [modalStatus1, setModalStatus1] = useState(false);
	const [modalStatus2, setModalStatus2] = useState(false);

	const [reason, setReason] = useState(''); // Renamed to reason for consistency
	const [errorMessage, setErrorMessage] = useState({ reason: '' });
	const [rejectLoanId, setRejectLoanId] = useState(null);
	const [ApproveLoanId, setApproveLoanId] = useState(null);

	const [rejectLoanDoc, setRejectLoanDoc] = useState(null);
	const [rejectLoanDocStatus, setRejectLoanDocStatus] = useState(null);
	const [CustomerAttachData, setCustomerAttachData] = useState(null);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [isChecked, setIsChecked] = useState(false); // State for checkbox

	const navigate = useNavigate();


	console.log(rejectLoanId, 'rejectLoanId');
	const fetchUserData = useCallback(async () => {
		try {
			const response = await fetch(
				'https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/loan-application',
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${authToken}`,
					},
				},
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			setUserData(data);
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	}, [authToken]);

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);
	console.log(userData, 'userData 1500');

	const fetchApproveLoanAPI = async (id) => {
		try {
			const response = await fetch(
				'https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/approve-loan',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${authToken}`,
					},
					body: JSON.stringify({ id }),
				},
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
			rejectLoanDocStatus: !rejectLoanDocStatus ? 'Please Enter Document ID' : '',
		};

		setErrorMessage(errors);

		if (Object.values(errors).some((error) => error)) {
			return;
		}

		const url = 'https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/reject-loan';
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
					id,
					id,
					reason: reason,
					isDocErr: rejectLoanDocStatus,
					custAttachId: rejectLoanDoc,
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

	const handleSort = (column) => {
		const order = sortOrder === 'asc' ? 'desc' : 'asc';
		setSortOrder(order);
		setSortColumn(column);

		const sortedData = [...(userData?.message?.loanApplications?.loanApplications || [])].sort(
			(a, b) => {
				if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
				if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
				return 0;
			},
		);

		setUserData((prevData) => ({
			...prevData,
			message: {
				...prevData.message,
				loanApplications: {
					...prevData.message.loanApplications,
					loanApplications: sortedData,
				},
			},
		}));
	};
	console.log(rejectLoanDoc, 'rejectLoanDoc');

	// const handleSearch = (e) => {
	//   setSearchQuery(e.target.value);
	// };

	// const filterData = (data) => {
	//   if (!searchQuery) return data;
	//   return data.filter((item) => {
	//     return (
	//       (item.cust_id && item.cust_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
	//       (item.aadhar_number && item.aadhar_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
	//       (item.pan_number && item.pan_number.toLowerCase().includes(searchQuery.toLowerCase())) ||
	//       (item.loan_amount && item.loan_amount.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
	//       (item.monthly_income && item.monthly_income.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
	//       (item.occupation && item.occupation.toLowerCase().includes(searchQuery.toLowerCase())) ||
	//       (item.purpose && item.purpose.toLowerCase().includes(searchQuery.toLowerCase())) ||
	//       (item.cibil_score && item.cibil_score.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
	//       (item.status && item.status.toLowerCase().includes(searchQuery.toLowerCase()))
	//     );
	//   });
	// };
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
	const currentItems = filteredData;

	const renderSortIcon = (column) => {
		if (sortColumn === column) {
			return sortOrder === 'asc' ? (
				<i className='fas fa-arrow-up' />
			) : (
				<i className='fas fa-arrow-down' />
			);
		}
		return null;
	};
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

	const [distributeData, setDistributeData] = useState(null);
	const [alertMessage, setAlertMessage] = useState('');
	const [showAlert, setShowAlert] = useState(false);

	const fetchDistributeData = async () => {
		try {
			const response = await fetch(
				'https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/distribute-application',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${authToken}`,
					},
				},
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			setDistributeData(data);

			if (data && data.length > 0) {
				window.confirm('Are you sure you send this record?');
				// setAlertMessage('There are send loans, please check.');
			} else {
				setAlertMessage('No Data available.');
			}

			fetchUserData();
			setShowAlert(true);
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
			setAlertMessage('No Data available.');
			setShowAlert(true);
		}
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
	const handleSubmitApproveLoans = () => {
		if (isChecked) {
			// Proceed with approving the loan if checkbox is checked
			fetchApproveLoanAPI(ApproveLoanId);
		} else {
			// Show error or prevent action if checkbox is not checked
			alert("You must check the box to approve the loan.");
		}
	};
	const isErishLoggedIn = ErishLoginCheck !== 'false' && ErishLoginCheck !== null;
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
				<Card stretch data-tour='list'>
					<CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h5'>
								All Loans
							</CardTitle>
						</CardLabel>
						<CardActions>
							{isErishLoggedIn && (
      							<Link to='' onClick={fetchDistributeData}>
      							  <Button color='info'>Distribute Loan Applications</Button>
      						</Link>
   						 )}
							<Link to=''>
								<Button
									icon='FilterList'
									className='filter-icon-2 btn-icon-22'
									onClick={() => setOffcanvasStatus(true)}></Button>
							</Link>
							{showAlert && (
								<div className=''>
									<p style={{ textAlign: 'left' }}>{alertMessage}</p>
								</div>
							)}
						</CardActions>
					</CardHeader>

					<CardBody className='table-responsive table-2' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col'>Sr.</th>
									{/* <th scope='col' onClick={() => handleSort('id')}>
                    ID {renderSortIcon('id')}
                  </th> */}
									{/* <th scope='col' onClick={() => handleSort('cust_id')}>
                    Cust Id {renderSortIcon('cust_id')}
                  </th> */}
									<th scope='col' onClick={() => handleSort('loan_scheme_id')}>
										Loan Scheme Id {renderSortIcon('loan_scheme_id')}
									</th>
									<th scope='col' onClick={() => handleSort('name')}>
										Customer Name {renderSortIcon('name')}
									</th>
									<th scope='col' onClick={() => handleSort('aadhar_number')}>
										Aadhar No. {renderSortIcon('aadhar_number')}
									</th>
									<th scope='col' onClick={() => handleSort('pan_number')}>
										Pan No. {renderSortIcon('pan_number')}
									</th>
									<th scope='col' onClick={() => handleSort('loan_amount')}>
										Loan Amount {renderSortIcon('loan_amount')}
									</th>
									<th scope='col' onClick={() => handleSort('monthly_income')}>
										Monthly Income {renderSortIcon('monthly_income')}
									</th>
									<th scope='col' onClick={() => handleSort('occupation')}>
										Occupation {renderSortIcon('occupation')}
									</th>
									<th scope='col' onClick={() => handleSort('purpose')}>
										Purpose {renderSortIcon('purpose')}
									</th>
									<th scope='col' onClick={() => handleSort('cibil_score')}>
										Cibil Score {renderSortIcon('cibil_score')}
									</th>
									<th scope='col' onClick={() => handleSort('status')}>
										Status {renderSortIcon('status')}
									</th>
									<th scope='col'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{currentItems?.map((item, index) => (
									<tr key={item.id}>
										<td>{index + 1}</td>
										{/* <td>{item.id}</td> */}
										{/* <td>{item.cust_id}</td> */}
										<td>{item.loan_scheme_id}</td>
										<td>
											<Link to={`/loanprofile/${item.id}`}>
												{item?.customer?.fname}
											</Link>
										</td>
										<td>{item?.aadhar_number}</td>
										<td>{item?.pan_number}</td>
										<td>{item.loan_amount}</td>
										<td>{item.monthly_income}</td>
										<td>{item.occupation}</td>
										<td>{item.purpose}</td>
										<td>{item.cibil_score}</td>
										<td className={getStatusClass(item.status)}>
											{item.status}
										</td>
										{item.status === 'CRE' || item.status === 'REJ' ? (
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
														<DropdownItem>
															<Button
																onClick={() => { setApproveLoanId(item.id); 
																	setModalStatus2(true);}
																	// handleApproveClick(item.id)
																}>
																Approve
															</Button>
														</DropdownItem>
														<DropdownItem>
															<Button
																onClick={() => {
																	setRejectLoanId(item.id);
																	setModalStatus1(true);
																}}>
																Reject
															</Button>
														</DropdownItem>
													</DropdownMenu>
												</Dropdown>
											</td>
										) : (
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
														<DropdownItem>
															<Link
																to={`../loan-installments/${item.id}`}>
																<Button>
																	Check Loan Installments
																</Button>
															</Link>
														</DropdownItem>
													</DropdownMenu>
												</Dropdown>
											</td>
										)}
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
						<label htmlFor='PanCard' className='form-label'>
							Document Issue
						</label>

						<FormGroup id='PanCard'>
							<select
								value={rejectLoanDocStatus}
								onChange={(e) => setRejectLoanDocStatus(e.target.value)}
								className='selectvalue'>
								<option value=''>Document Issue</option>
								<option value='true'>Yes</option>
								<option value='false'>No</option>
							</select>
							{errorMessage.rejectLoanDocStatus && (
								<div className='text-danger'>
									{errorMessage.rejectLoanDocStatus}
								</div>
							)}
						</FormGroup><br />

						<Label htmlFor='reason'>Reject Reason*</Label>

						<FormGroup>
							<Input
								type='text'
								id='reason'
								name='reason' // Changed to 'reason'
								placeholder='Reject Reason'
								autoComplete='off'
								value={reason} // Changed to 'reason'
								onChange={(e) => setReason(e.target.value)}
							/>
							{errorMessage.reason && (
								<div className='text-danger'>{errorMessage.reason}</div>
							)}
						</FormGroup><br />
{/* {rejectLoanDocStatus === 'true' && (
  <> */}
						<Label htmlFor='reason'>Reject Document Id*</Label>

						<FormGroup>
							<select
								value={rejectLoanDoc}
								onChange={(e) => setRejectLoanDoc(e.target.value)}
								className='selectvalue'>
								<option value='' disabled>
									Select Document ID
								</option>
								{CustomerAttachData?.message?.loanApplications?.loanApplications?.customer?.cust_attach?.map(
									(itemname11) => (
										<option key={itemname11?.id} value={itemname11?.id}>
											{itemname11?.id} | {itemname11?.file_type}
										</option>
									),
								)}
							</select>
						</FormGroup>
            {/* </>
)} */}
						

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

					<label> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

</label>
</div>
						

						<Button
							type='button'
							onClick={() => handleSubmitApproveLoans(ApproveLoanId)}
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

export default LoanData;
