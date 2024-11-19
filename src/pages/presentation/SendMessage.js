import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Button from '../../components/bootstrap/Button';
import Avatar from '../../components/Avatar';

import User1Webp from '../../assets/img/wanna/wanna2.webp';
import User1Img from '../../assets/img/wanna/wanna2.png';
import Checks from '../../components/bootstrap/forms/Checks';
import Textarea from '../../components/bootstrap/forms/Textarea';

import Card, { CardBody } from '../../components/bootstrap/Card';

const SendMessage = () => {
	const authToken = localStorage.getItem('token');
	const baseUrl = process.env.REACT_APP_BASE_URL;
	const navigate = useNavigate();

	const [userData, setUserData] = useState(null);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [selectedMobileNumbers, setSelectedMobileNumbers] = useState([]);
	const [TemplateData, setTemplateData] = useState(null);
	const [selectedTemplateId, setSelectedTemplateId] = useState('');
	const [selectedTemplate, setSelectedTemplate] = useState('');
	const timeout = useRef(null);
	const timeoutDuration = 60 * 60 * 1000; // 1 Hour
	const fetchUserData = useCallback(async () => {
		try {
			const response = await fetch(`${baseUrl}/nbfc/user`, {
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

	const handleCheckboxChange = (userId, mobileNumber) => {
		setSelectedUsers((prevSelected) =>
			prevSelected.includes(userId)
				? prevSelected.filter((id) => id !== userId)
				: [...prevSelected, userId],
		);
		setSelectedMobileNumbers((prevSelected) =>
			prevSelected.includes(mobileNumber)
				? prevSelected.filter((number) => number !== mobileNumber)
				: [...prevSelected, mobileNumber],
		);
	};

	const handleSelectAll = (e) => {
		if (e.target.checked) {
			const allUserIds = userData?.message?.users?.users?.map((user) => user.id) || [];
			const allMobileNumbers =
				userData?.message?.users?.users?.map((user) => user.phone) || [];
			setSelectedUsers(allUserIds);
			setSelectedMobileNumbers(allMobileNumbers);
		} else {
			setSelectedUsers([]);
			setSelectedMobileNumbers([]);
		}
	};

	const fetchTemplateData = useCallback(async () => {
		try {
			const response = await fetch(`${baseUrl}/template`, {
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
			setTemplateData(data);
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	}, [authToken, baseUrl]);

	useEffect(() => {
		fetchTemplateData();
	}, [fetchTemplateData]);

	const handleTemplateClick = (templateId, templateText) => {
		setSelectedTemplateId(templateId);
		setSelectedTemplate(templateText);
	};

	const SendMessageAPI = async () => {
		const url = `${baseUrl}/template/sendSMS`;
		const token = Cookies.get('token');
		const data = { mobileNumbers: selectedMobileNumbers, templateId: selectedTemplateId };

		if (!token) {
			console.error('Authentication token is missing');
			return;
		}

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			alert('Thank you! Your message has been successfully sent.');
			// window.location.href = '/sms';
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	};

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
					<CardBody>
						<h5 className='h5'>Send Message</h5>
						<div className='row'>
							<div className='col-lg-6'>
								<div className='list-view-template'>
									{TemplateData?.message?.getAllTemplate?.map((template) => (
										<Link
											to=''
											key={template.id}
											onClick={(e) => {
												e.preventDefault();
												handleTemplateClick(template.id, template.template);
											}}>
											<p>{template.template}</p>
										</Link>
									))}
								</div>
							</div>
							<div className='col-lg-6'>
								<Textarea
									placeholder='Enter Your Message'
									value={selectedTemplate}
									disabled
									readOnly
									className='list-view-template-textarea'
								/>
								<Button
									type='button'
									icon='Send'
									color='info'
									isOutline
									className='send-button'
									onClick={SendMessageAPI}>
									Send
								</Button>
							</div>
						</div>
					</CardBody>
					<CardBody>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col'>
										<Checks
											type='checkbox'
											aria-label='Select all users'
											onChange={handleSelectAll}
											checked={
												selectedUsers.length ===
												userData?.message?.users?.users?.length
											}
											className='check-css'
										/>
									</th>
									<th scope='col'>Sr.</th>
									<th scope='col'>Image</th>
									<th scope='col'>Name</th>
									<th scope='col'>Mobile No.</th>
									<th scope='col'>Email</th>
									<th scope='col'>Designation</th>
								</tr>
							</thead>
							<tbody>
								{userData?.message?.users?.users?.map((user) => (
									<tr key={user.id}>
										<td>
											{/* <Checks
												type='checkbox'
												checked={selectedUsers.includes(user.id)}
												onChange={() =>
													handleCheckboxChange(user.id, user.phone)
												}
												className='check-css'
											/> */}
											<Checks
												type='checkbox'
												aria-label={`Select user ${user.fname} ${user.lname}`}
												checked={selectedUsers.includes(user.id)}
												onChange={() =>
													handleCheckboxChange(user.id, user.phone)
												}
												className='check-css'
											/>
										</td>
										<td>{user.id}</td>
										<td>
											<Avatar
												srcSet={User1Webp}
												src={User1Img}
												size={32}
												alt='User'
											/>
										</td>
										<td>
											{user.fname} {user.lname}
										</td>
										<td>{`+91${user.phone}`}</td>
										<td>{user.email}</td>
										<td>{user.designation}</td>
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

export default SendMessage;
