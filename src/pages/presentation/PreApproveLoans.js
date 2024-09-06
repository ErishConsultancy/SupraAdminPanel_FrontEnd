import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
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

const PreApproveLoans = () => {
	const authToken = localStorage.getItem("token");

	const [userData, setUserData] = useState(null);
	const baseUrl = process.env.REACT_APP_BASE_URL;

    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/pre-approve/`, {
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

    const fetchDeleteAPI = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/pre-approve/${id}`, {
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
  return (
	<PageWrapper>
	  <Page>
	  <Card stretch data-tour='list'>
	  <CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h5'>
							Pre Approve Loans
							</CardTitle>
						</CardLabel>
						<CardActions>
						<Link to= "../../create-preapprove-loans">
							<Button color='info'>
							Add Pre Approve Loans
							</Button>
							</Link>
						</CardActions>
					</CardHeader>
	  <CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
								<th scope='col'>Sr.</th>
                                <th scope='col'>Cust ID</th>
                                <th scope='col'>Client ID</th>
                                <th scope='col'>Loan Screen ID</th>
								<th scope='col'>Loan Amount</th>
                                <th scope='col'>Interest Rate</th>
                                <th scope='col'>Loan Term Months</th>
                                <th scope='col'>Status</th>
									<th scope='col'>
										Actions
									</th>
								</tr>
							</thead>
							{userData?.message?.getAllPreApprove?.preApprove?.map((user, index) => (
									<tr key={user.id}>
										<td>{index+1}</td>
                                        <td>{user.cust_id}</td>
                                        <td>{user.client_id}</td>
                                        <td>{user.loan_scheme_id}</td>
                                        <td>{user.pre_approve_loan_amount}</td>
										<td>{user.interest_rate}</td>
                                        <td>{user.loan_term_months}</td>
                                        <td>{user.status}</td>
										<td>
										<Link 
                                  to={{
									pathname: `/edit-preapprove-loan/${user.id}`,
									state: { id: user?.id, name: user?.name }
								}}
                            >Edit</Link>
											<span> | </span>
											<Link to="" onClick={() => handleDeleteClick(user.id)}>Delete</Link>
										</td>
									</tr>
								))}
							
						</table>
					</CardBody>
					</Card>
					</Page>
	</PageWrapper>
  )
}

export default PreApproveLoans
