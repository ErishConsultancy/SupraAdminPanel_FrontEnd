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
import Avatar from '../../components/Avatar';

import User1Webp from '../../assets/img/wanna/wanna2.webp';
import User1Img from '../../assets/img/wanna/wanna2.png';

const UserListPage = () => {
	const authToken = localStorage.getItem("token");
	const baseUrl = process.env.REACT_APP_BASE_URL;
	const navigate = useNavigate();

	const [userData, setUserData] = useState(null);

	const fetchUserData = useCallback(async () => {
		try {
			const response = await fetch(`${baseUrl}/nbfc/user`, {
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
	}, [authToken]);

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

	const fetchDeleteAPI = async (user_id) => {
		try {
			const response = await fetch(`${baseUrl}/nbfc/user/${user_id}`, {
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
	// console.log(userData, "userData 1050")
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
						<CardLabel icon='person' iconColor='info'>
							<CardTitle tag='div' className='h5'>
								All Users
							</CardTitle>
						</CardLabel>
						<CardActions>
							<Link to="../../createuser">
								<Button
									color='info'
									icon='person'
								>
									Create User
								</Button>
							</Link>
						</CardActions>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col'>Sr.</th>
									<th scope='col'>Image</th>
									<th scope='col'>Name</th>
									<th scope='col'>Mobile No.</th>
									<th scope='col'>Email</th>
									<th scope='col'>Designation</th>
									<th scope='col'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{userData?.message?.users?.users?.map((user, index) => (
									<tr key={user.id}>
										<td>{index+1}</td>
										<td><Avatar srcSet={User1Webp} src={User1Img} size={32} alt="User" /></td>
										<td>{user.fname} {user.lname}</td>
										<td>{user.phone}</td>
										<td>{user.email}</td>
										<td>{user.designation}</td>
										<td>
											<Link 
												to={{
													pathname: `/edituser/${user.user_id}`,
													state: { user }
												}}
												aria-label={`Edit user ${user.fname} ${user.lname}`}
											>Edit</Link>
											<span> | </span>
											<Link 
												to="" 
												onClick={() => handleDeleteClick(user.user_id)} 
												aria-label={`Delete user ${user.fname} ${user.lname}`}
											>Delete</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default UserListPage;
