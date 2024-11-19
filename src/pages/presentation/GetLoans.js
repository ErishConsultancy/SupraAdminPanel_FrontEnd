import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, {
	CardActions,
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
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';

const GetLoans = () => {
	const authToken = localStorage.getItem('token');
	const navigate = useNavigate();
	const { themeStatus } = useDarkMode();
	const ErishLoginCheck = localStorage.getItem('ErishLogin');

	const [userData, setUserData] = useState(null);
	const baseUrl = process.env.REACT_APP_BASE_URL;
	const isErishLoggedIn = ErishLoginCheck !== 'false' && ErishLoginCheck !== null;
	const timeout = useRef(null);
    const timeoutDuration = 60 * 60 * 1000;
	const fetchUserData = useCallback(async () => {
		try {
			const response = await fetch(`${baseUrl}/loans`, {
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

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);
console.log(userData, "userData15555")
	const fetchDeleteAPI = async (id) => {
		try {
			const response = await fetch(`${baseUrl}/loans/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			fetchUserData();
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	};

	const handleDeleteClick = (id) => {
		if (window.confirm('Are you sure you want to delete this record?')) {
			fetchDeleteAPI(id);
		}
	};
	// console.log(userData, "userData158520")
	// const formatDate = (dateString) => {
	// 	const date = new Date(dateString);
	// 	return date.toISOString().split('T')[0]; // This will give you YYYY-MM-DD format
	// };

	
	// const getStatusClass = (status) => {
	// 	switch (status) {
	// 		case 'false':
	// 			return 'No';
	// 		case 'true':
	// 			return 'Yes';
	// 		default:
	// 			return '';
	// 	}
	// };

	const fetchApproveLoanAPI = async (id) => {
		try {
			const response = await fetch(
				`https://suprafinleaselimitedbe-production.up.railway.app/api/loans/accept/${id}`,
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

			fetchUserData();
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	};

	const handleApproveClick = (id) => {
		if (window.confirm('Are you sure you want to Approve this record?')) {
			fetchApproveLoanAPI(id);
		}
	};

	const fetchWithdrawLoanAPI = async (id) => {
		try {
			const response = await fetch(
				`https://suprafinleaselimitedbe-production.up.railway.app/api/loans/withdraw/${id}`,
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

			fetchUserData();
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	};

	const handleWithdrawClick = (id) => {
		if (window.confirm('Are you sure you want to Withdraw this record?')) {
			fetchWithdrawLoanAPI(id);
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
				<Card stretch data-tour='list'>
					<CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h5'>
								Loan Scheme
							</CardTitle>
						</CardLabel>
						<CardActions>
							<Link to='../../create-loans'>
								<Button color='info'>Create Loan</Button>
							</Link>
						</CardActions>
					</CardHeader>
					<CardBody>
						<table className='table table-modern table-hover table_td_style'>
							<thead>
								<tr>
									<th scope='col'>Sr.</th>
									<th scope='col'>ID</th>
									<th scope='col'>Loan Name</th>
									<th scope='col'>Loan Amount</th>
									<th scope='col'>Interest Rate</th>
									<th scope='col'>Min. Age</th>
									<th scope='col'>Family Income</th>
									<th scope='col'>Tenure(in months)</th>
									<th scope='col'>Process Fee</th>
									<th scope='col'>Pre Approve</th>
									{/* <th scope='col'>Accepted</th> */}
									<th scope='col'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{userData?.message?.getAllLoanScheme?.map((user, index) => (
									<>
									{/* <tr key={user.id}>
										<td>{index + 1}</td>
										<td>{user.id}</td>
										<td>{user?.loan_sch_nme?.name}</td>
										<td>{user.loan_amount}</td>
										<td>{user.interest_rate}</td>
										<td>{user.age_start}</td>
										<td>{user.min_month_family_income}</td>
										<td>{user.loan_term_months}</td>
										<td>{user.process_fee}</td>
										<td>{user.is_pre_approve ? 'true' : 'false'}</td>
										<td>{user.isAccepted ? 'true' : 'false'}</td>
										{isErishLoggedIn === true ? (
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
															className='link_button'
															to={{
																pathname: `/editloans/${user.id}`,
																state: {
																	id: user?.id,
																	name: user?.name,
																},
															}}>
															<Button>Edit</Button>
														</Link>
													</DropdownItem>
													<DropdownItem>
														<Link className='link_button' to=''>
															<Button
																onClick={() =>
																	handleDeleteClick(user.id)
																}>
																Delete
															</Button>
														</Link>
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
															className='link_button'
															to="">
															<Button onClick={() => { handleApproveClick(user?.id)}}>Approve</Button>
														</Link>
													</DropdownItem>
													<DropdownItem>
														<Link className='link_button' to=''>
															<Button
																onClick={() =>
																	handleWithdrawClick(user?.id)
																}>
																Withdraw
															</Button>
														</Link>
													</DropdownItem>
												</DropdownMenu>
											</Dropdown>
										</td>
										)}
									</tr> */}
									<tr
  key={user.id}
  className={user?.isAccepted ? 'white_color_1' : 'black_color_1'}
>
  <td>{index + 1}</td>
  <td>{user.id}</td>
  <td>{user?.loan_sch_nme?.name}</td>
  <td>{user.loan_amount}</td>
  <td>{user.interest_rate}</td>
  <td>{user.age_start}</td>
  <td>{user.min_month_family_income}</td>
  <td>{user.loan_term_months}</td>
  <td>{user.process_fee}</td>
  <td>{user.is_pre_approve ? 'true' : 'false'}</td>
  {/* <td>{user.isAccepted ? 'true' : 'false'}</td> */}
  {isErishLoggedIn === true ? (
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
            className='link_button'
            to={{
              pathname: `/editloans/${user.id}`,
              state: {
                id: user?.id,
                name: user?.name,
              },
            }}
          >
            <Button>Edit</Button>
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link className='link_button' to=''>
            <Button
              onClick={() =>
                handleDeleteClick(user.id)
              }
            >
              Delete
            </Button>
          </Link>
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
		<Link className='link_button' to="">
            <Button onClick={() => { handleApproveClick(user?.id)}}>Approve</Button>
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link className='link_button' to=''>
            <Button
              onClick={() =>
                handleWithdrawClick(user.id)
              }
            >
              Withdraw
            </Button>
          </Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </td>
  
  
  
)}

</tr>

									
									</>
								))}
							</tbody>
						</table>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};
export default GetLoans;
