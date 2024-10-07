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
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../components/bootstrap/Dropdown';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
// import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
// import useSortableData from '../../hooks/useSortableData';
// import data from '../../common/data/dummyEventsData';


const CreditLoans = () => {
	const authToken = localStorage.getItem("token");
	const navigate = useNavigate();

	const [userData, setUserData] = useState(null);

	const fetchUserData = useCallback(async () => {
		try {
			const response = await fetch('https://suprafinleaselimitedbe-production.up.railway.app/api/credits', {
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

	console.log(userData, "userData Credit userData");
    const { themeStatus } = useDarkMode();

    const getStatusClass = (status) => {
        switch (status) {
          case 'CRE':
            return 'orange';
          case 'APR':
            return 'green';
          case 'REJ':
            return 'red';
          default:
            return '';
        }
      };

	  const fetchDeleteAPI = async (id) => {
        try {
            const response = await fetch(`https://suprafinleaselimitedbe-production.up.railway.app/api/credit/${id}`, {
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

	// const [currentPage, setCurrentPage] = useState(1);
	// const [perPage, setPerPage] = useState(PER_COUNT['5']);
	// const { items, requestSort, getClassNamesFor } = useSortableData(data);

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
								All Credit Loans
							</CardTitle>
						</CardLabel>
                        <CardActions>
						<Link to= "../../createcreditloan">
							<Button color='info'>
							Add Credit
							</Button>
							</Link>
						</CardActions>
					</CardHeader>
					<CardBody>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col'>Sr.</th>
									{/* <th scope='col'>Cust_ID</th> */}
									<th scope='col'>cust_id</th>

                                    <th scope='col'>Credit Amount</th>
                                    <th scope='col'>Interest Rate</th>
                                    <th scope='col'>Tenure Months</th>
									{/* <th scope='col'>Status</th> */}
                                    <th scope='col'>Action</th>
								</tr>
							</thead>
							<tbody>
								{userData?.message?.credit?.map((user, index) => (
									<tr key={user.id}>
										<td>{index+1}</td>
										{/* <td>{user.cust_id}</td> */}
                                        <td> <Link 
                                  to={{
									pathname: `/Pre-loan-instalments/${user.id}`,
								}}
                            >{user.cust_id}</Link></td>
										<td>{user.credit_amount}</td>
										<td>{user.interest_rate}</td>
                                        <td>{user.tenure_in_months}</td>
                                        {/* <td className={getStatusClass(user.status)}>{user.status}</td> */}

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
                                  to={{
									pathname: `/edit-credit-loan/${user.id}`,
								}}
                            ><Button
                            //   onClick={() => handleApproveClick(item.id)}
                            >
                              Edit
                            </Button></Link>
                          </DropdownItem>
                          <DropdownItem>
                            <Link to=""><Button 
                            // onClick={() => {
                            //   setRejectLoanId(item.id);
                            //   setModalStatus1(true);
                            // }}
							onClick={() => handleDeleteClick(user.id)}
                            >
                              Delete
                            </Button></Link>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
										</td>
									</tr>
								))}
							</tbody>
						
						</table>
					</CardBody>
					{/* <PaginationButtons
					data={items}
					label='items'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/> */}
				</Card>
			</Page>
		</PageWrapper>
	);
}

export default CreditLoans
