import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/bootstrap/Button';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';

const NBFCList = () => {
	const authToken = localStorage.getItem("token");
	const baseUrl = process.env.REACT_APP_BASE_URL;
	const navigate = useNavigate();

	const [userData, setUserData] = useState(null);

    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/nbfc`, {
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

	console.log(userData, "userData New userData");
  
	const fetchDeleteAPI = async (client_id) => {
		try {
			const response = await fetch(`${baseUrl}/nbfc/nbfc/${client_id}`, {
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

	const handleDeleteClick = (client_id) => {
		if (window.confirm("Are you sure you want to delete this record?")) {
			fetchDeleteAPI(client_id);
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
								All NBFC Members
							</CardTitle>
						</CardLabel>
						<CardActions>
							<Link to= "../../createnbfc">
								<Button
									color='info'
								>
									Create NBFC
								</Button>
							</Link>
						</CardActions>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col'>Sr.</th>
									<th scope='col'>NBFC CLient ID</th>
									<th scope='col'>NBFC Name</th>
									<th scope='col'>NBFC Contact</th>
									<th scope='col'>NBFC Email</th>
									<th scope='col'>NBFC Administrator</th>
									<th scope='col'>Actions</th>
								</tr>
							</thead>
							<tbody>
								{userData?.message?.nbfc?.nbfc?.map((nbfclist1, index) => (
									<tr key={nbfclist1.id}>
										<td>{index+1}</td>
										<td>{nbfclist1.client_id}</td>
										<td>{nbfclist1.name}</td>
										<td>{nbfclist1.contact1}</td>
										<td>{nbfclist1.email}</td>
										<td>{nbfclist1.website}</td>
										<td>
											<Link to={{
												pathname: `/editnbfc/${nbfclist1.client_id}`,
												state: { nbfclist1 }
												}}
												aria-label={`Edit user ${nbfclist1.client_id}`}
											>Edit</Link>
											<span> | </span>
											<Link 
												to="" 
												onClick={() => handleDeleteClick(nbfclist1.client_id)} 
												aria-label={`Delete user ${nbfclist1.fname} ${nbfclist1.lname}`}
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
}

export default NBFCList;
