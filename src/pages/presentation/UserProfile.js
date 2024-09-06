import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/bootstrap/Button';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, {
	CardActions,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';

const UserProfile = () => {

	const FullName = localStorage.getItem("fname");
	return (
		<PageWrapper>
			<Page>
				<Card stretch data-tour='list'>
					<CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h5'>
                            Hi! {FullName}
							</CardTitle>
						</CardLabel>
						<CardActions>
							<Link to= "../../changepassword">
								<Button
									color='info'
								>
									Change Password
								</Button>
							</Link>
						</CardActions>
					</CardHeader>
					
				</Card>
			</Page>
		</PageWrapper>
	);
}

export default UserProfile
