import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();	
	const authToken = localStorage.getItem("token");

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
							<Link to= "">
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
