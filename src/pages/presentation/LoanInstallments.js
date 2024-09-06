import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
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

const LoanInstallments = () => {
	const authToken = localStorage.getItem("token");
	const { id } = useParams();
console.log(id, "id15")
	const [userData, setUserData] = useState(null);
	const baseUrl = process.env.REACT_APP_BASE_URL;

	// Wrapping fetchUserData in useCallback
	const fetchUserData = useCallback(async () => {
		try {
			const response = await fetch(`${baseUrl}/nbfc/loan-installments/${id}`, {
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
	}, [authToken, baseUrl]); // Dependency array now contains authToken and baseUrl

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]); // Adding fetchUserData to the dependency array
console.log(userData, "userData 1450")


	return (
		<PageWrapper>
			<Page>
				<Card stretch data-tour='list'>
					<CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h5'>
								Loan Installments
							</CardTitle>
						</CardLabel>
						
					</CardHeader>
					<CardBody>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col'>Sr.</th>
                                    <th scope='col'>Installment Amount</th>
									<th scope='col'>Installment Number</th>
                                    <th scope='col'>Status</th>

								</tr>
							</thead>
							<tbody>
								{userData?.message?.loanInstallments?.map((user, index) => (
									<tr key={user.id}>
										<td>{index+1}</td>
										<td>₹{user.installment_amount}</td>
                                        <td>{user.installment_number}</td>
                                        <td>{user.status}</td>
										
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

export default LoanInstallments
