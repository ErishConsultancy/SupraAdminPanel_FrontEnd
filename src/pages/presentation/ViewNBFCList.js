import React from 'react';
import { useLocation } from "react-router-dom";
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';

const ViewNBFCList = () => {
	const location = useLocation();
    const nbfcAvailable = location.state?.nbfcAvailable || [];
	
	
	return (
		<PageWrapper>
			<Page>
				<Card stretch data-tour='list'>
					<CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h5'>
								View NBFC Accept List
							</CardTitle>
						</CardLabel>
						{/* <CardActions>
							<Link to="../../createroles">
								<Button color='info'>
									Add Role
								</Button>
							</Link>
						</CardActions> */}
					</CardHeader>
					<CardBody>
                    {nbfcAvailable.length > 0 ? (
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col'>Sr.</th>
									<th scope='col'>ID</th>
                                    <th scope='col'>NBFC Name</th>
                                    <th scope='col'>Logo</th>
								</tr>
							</thead>
							<tbody>
                            {nbfcAvailable.map((nbfc, index) => (
									<tr key={nbfc?.id}>
										<td>{index + 1}</td>
										<td>{nbfc?.id}</td>
                                        <td>{nbfc?.name}</td>
										<td>
  <img src={nbfc.logo} alt={`Logo of ${nbfc.name}`} width="80" />
</td>
									</tr>
								))}
							</tbody>
						</table>
                    ) : (
                        <p>No NBFCs Available</p>
                    )}
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default ViewNBFCList;
