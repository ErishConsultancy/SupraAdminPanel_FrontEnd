import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';

const PreLoanInstallments = () => {
	const authToken = localStorage.getItem("token");
    const { id } = useParams();
	const [userData, setUserData] = useState(null);
	// const baseUrl = process.env.REACT_APP_BASE_URL;
	const navigate = useNavigate();
	const timeout = useRef(null);
    const timeoutDuration = 60 * 60 * 1000;
	
    
	const fetchUserData = useCallback(async () => {
		console.log(id, "id check");
		try {
			const response = await fetch(`https://suprafinleaselimitedbe-production.up.railway.app/api/credits/admin-credits-installments/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${authToken}`
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
	}, [id, authToken]);
	
	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

	console.log(userData, "userData 1500")

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
								View Loan Installments
							</CardTitle>
						</CardLabel>
						
					</CardHeader>
					<CardBody>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col'>Sr.</th>
									<th scope='col'>Cust_ID</th>
                                    <th scope='col'>Credit ID</th>   
                                    <th scope='col'>Client ID</th>
                                    <th scope='col'>Installment Number</th>
                                    <th scope='col'>Installment Amount</th>
                                    <th scope='col'>Paid Date</th>
									<th scope='col'>Due Date</th>
                                    <th scope='col'>Status</th>
								</tr>
							</thead>
							<tbody>
								{userData?.message?.credit?.map((user, index) => (
									<tr key={user.id}>
										<td>{index + 1}</td>
                                        <td>{user?.cust_id}</td>
                                        <td>{user?.customer_credits_id}</td>
                                        <td>{user?.client_id}</td>
                                        <td>{user?.installment_number}</td>
                                        <td>{user?.installment_amount}</td>
                                        <td>{user?.paid_date}</td>
										<td>{user.due_date}</td>
                                        <td>{user?.status}</td>
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

export default PreLoanInstallments
