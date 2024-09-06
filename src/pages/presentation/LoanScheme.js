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

const LoanScheme = () => {
	const authToken = localStorage.getItem("token");
	const baseUrl = process.env.REACT_APP_BASE_URL;

	const [userData, setUserData] = useState(null);

    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/setting/loan-scheme-name`, {
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
            const response = await fetch(`${baseUrl}/setting/loan-scheme-name/${id}`, {
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
							Add Loan Scheme Name
							</CardTitle>
						</CardLabel>
						<CardActions>
						<Link to= "../../createloanschemeloan">
							<Button color='info'>
							Add Loan Scheme Name
							</Button>
							</Link>
						</CardActions>
					</CardHeader>
	  <CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
								<th scope='col'>Sr.</th>
									<th scope='col'>Name</th>
									<th scope='col'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
							{userData?.message?.loanSchemeName?.map((user, index) => (
									<tr key={user.id}>
										<td>{index+1}</td>
										<td>{user.name}</td>
										<td>
										<Link 
                                  to={{
									pathname: `/editloanschemeloan/${user.id}`,
									state: { id: user?.id, name: user?.name }
								}}
                            >Edit</Link>
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
export default LoanScheme