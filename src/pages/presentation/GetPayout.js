import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';

const GetPayout = () => {
	const authToken = localStorage.getItem('token');
	const baseUrl = process.env.REACT_APP_BASE_URL;
	const navigate = useNavigate();
	const timeout = useRef(null);
	const timeoutDuration = 60 * 60 * 1000;

	const [userData, setUserData] = useState(null);

	const fetchUserData = useCallback(async () => {
		try {
			const response = await fetch(`${baseUrl}/payout/get-all`, {
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
								Payout
							</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col'>Sr.</th>
									<th scope='col'>Appli_ID.</th>
									<th scope='col'>Bene_ID</th>
									<th scope='col'>Amount</th>
									<th scope='col'>Acc_No.</th>
									<th scope='col'>Bank_IFSC</th>
									<th scope='col'>Transfer_ID</th>
									<th scope='col'>Mode</th>
									<th scope='col'>Desc</th>
									<th scope='col'>Status</th>
								</tr>
							</thead>
							<tbody>
								{userData?.message?.data?.map((user, index) => (
									<tr key={user.id}>
										<td>{index + 1}</td>
										<td>{user.application_id}</td>
										<td>{user.bene_id}</td>
										<td>{user.amount}</td>
										<td>{user.bank_account_number}</td>
										<td>{user.bank_ifsc}</td>
										<td>{user.cf_transfer_id}</td>
										<td>{user.transfer_mode}</td>
										<td style={{ textAlign: 'justify' }}>
											{user.status_description}
										</td>
										<td>{user.status}</td>
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

export default GetPayout;
