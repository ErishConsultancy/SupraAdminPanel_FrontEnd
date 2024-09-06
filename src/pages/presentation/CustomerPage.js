import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';


const CustomerPage = () => {
	const authToken = localStorage.getItem("token");

	const [userData, setUserData] = useState(null);

	const fetchUserData = useCallback(async () => {
		try {
			const response = await fetch('https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/customers', {
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
	}, [authToken]); // Add authToken as a dependency

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]); // fetchUserData is now stable

	console.log(userData, "userData New 58000");

	return (
		<PageWrapper>
			<Page>
				<Card stretch data-tour='list'>
					<CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h5'>
								All Customers
							</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col'>Sr.</th>
									<th scope='col'>Name</th>
									<th scope='col'>Mobile No.</th>
									<th scope='col'>Email</th>
									{/* <th scope='col'>Actions</th> */}
								</tr>
							</thead>
							<tbody>
								{userData?.message?.customers?.customers?.map((user, index) => (
									<tr key={user.id}>
										<td>{index+1}</td>
										<td>{user.fname} {user.lname}</td>
										<td>{user.phone}</td>
										<td>{user.email}</td>
										{/* <td>

											<Link to="">Active</Link>
											<span> | </span>
											<Link to="">Deactive</Link>
										</td> */}
									</tr>
								))}
							</tbody>
						</table>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
}

export default CustomerPage;
