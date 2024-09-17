import React, { useEffect, useState, useCallback } from 'react';
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
import Button from '../../components/bootstrap/Button';

const SMSGetTemplate = () => {
	const authToken = localStorage.getItem("token");
	const navigate = useNavigate();

	const [userData, setUserData] = useState(null);
	const baseUrl = process.env.REACT_APP_BASE_URL;

	const fetchUserData = useCallback(async () => {
		try {
			const response = await fetch(`${baseUrl}/template`, {
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
	const fetchDeleteAPI = async (id) => {
		try {
			const response = await fetch(`${baseUrl}/template/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${authToken}`
				}
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			// Optionally fetch the updated data
			fetchUserData();
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	};

	const handleDeleteClick = (id) => {
		if (window.confirm("Are you sure you want to delete this record?")) {
			fetchDeleteAPI(id);
		}
	};

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
								All SMS Template
							</CardTitle>
						</CardLabel>
						<CardActions>
						<Link to="../../sensmessage">
								<Button color='info'>
									Send SMS
								</Button>
							</Link>
							<Link to="../../createsmstemplate">
								<Button color='info'>
									Create Template
								</Button>
							</Link>
						</CardActions>
					</CardHeader>
					<CardBody>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col'>Sr.</th>
									<th scope='col'>Template</th>
									<th scope='col'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{userData?.message?.getAllTemplate?.map((user, index) => (
									<tr key={user.id}>
										<td>{index+1}</td>
										<td>{user.template}</td>
										<td>
											<Link
												to={{
													pathname: `/edit-sms/${user.id}`,
													state: { id: user?.id, template: user?.template }
												}}
											>
												Edit
											</Link>
											<span> | </span>
											<Link to="" onClick={() => handleDeleteClick(user.id)}>Delete</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	)
}


export default SMSGetTemplate
