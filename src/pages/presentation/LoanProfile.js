import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';


const LoanProfile = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [modalStatus1, setModalStatus1] = useState(false);
	const [attachData, setAttachData] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [userData, setUserData] = useState(null);
	const [aadharNumber, setAadharNumber] = useState('');
	const [panNumber, setPanNumber] = useState('');

	const fetchUserData = useCallback(async () => {
		try {
			const response = await fetch(
				`https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/loan-application/${id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			setUserData(data);

			const attachments = data?.message?.loanApplications?.loanApplications?.customer?.cust_attach;

			if (Array.isArray(attachments)) {
				// Filter the attachments for Aadhar and Pan
				const aadhar = attachments.find(
					(attachment) => attachment.file_type === 'addharBack'
				);
				const pan = attachments.find((attachment) => attachment.file_type === 'pan');

				if (aadhar) {
					setAadharNumber(aadhar.doc_no);
				}

				if (pan) {
					setPanNumber(pan.doc_no);
				}
			}
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	}, [id]);

	useEffect(() => {
		const checkTokenExpiration = () => {
			const tokenExpiration = localStorage.getItem('tokenExpiration');
			const currentTime = new Date().getTime();

			if (tokenExpiration && currentTime > tokenExpiration) {
				// Token has expired, remove it and redirect to login
				localStorage.removeItem('token');
				localStorage.removeItem('tokenExpiration');
				navigate('/login');
			}
		};

		// Set an interval to check token expiration every second
		const intervalId = setInterval(checkTokenExpiration, 1000);

		// Check token expiration on component mount
		checkTokenExpiration();

		return () => {
			clearInterval(intervalId);
		};
	}, [navigate]);

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

	console.log(userData, "userData New Profile");
	return (
		<PageWrapper>
			<Page>
				<Card stretch data-tour='list'>
					<CardHeader>
						<CardLabel>
							<CardTitle tag='div' className='h5'>
								View Details
							</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody>
            <table className='loanprofile-table-1'>
					<thead className='table table-modern loanprofile-table'>
                    <tr>
							<th>ID</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.id}</td>
						</tr>
                        <tr>
							<th>Customer ID</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.cust_id}</td>
						</tr>
                        <tr>
							<th>Loan Scheme ID</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.loan_scheme_id}</td>
						</tr>
            <tr>
							<th>Customer Roll Id</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.customer?.role_id}</td>
						</tr>
						<tr>
							<th>Aadhar card Number</th>
                            <td>{aadharNumber || 'Not available'}</td>
						</tr>
                        <tr>
							<th>Pan card Number</th>

                            <td>{panNumber || 'Not available'}</td>
						</tr>
                        <tr>
							<th>Loan Amount</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.loan_amount}</td>
						</tr>
                        <tr>
							<th>Monthly Income</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.monthly_income}</td>
						</tr>
                        <tr>
							<th>Occupation</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.occupation}</td>
						</tr>
                        <tr>
							<th>Purpose</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.purpose}</td>
						</tr>
                        <tr>
							<th>Rejected By</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.rejected_by}</td>
						</tr>
                        <tr>
							<th>Rejection Reason</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.rejection_reason}</td>
						</tr>
                        <tr>
							<th>Status</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.status}</td>
						</tr>
                        <tr>
							<th>Time Difference</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.timeDifference}</td>
						</tr>
                       <tr>
							<th>Cibil Score</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.cibil_score}</td>
						</tr>
                        <tr>
							<th>Customer Name</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.customer?.fname}</td>
						</tr>
                        <tr>
							<th>Customer Mobile No.</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.customer?.phone}</td>
						</tr>
                        <tr>
							<th>Customer Email</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.customer?.email}</td>
						</tr>
						<tr>
							<th>Customer Address</th>
                            <td>{userData?.message?.loanApplications?.loanApplications?.customer?.addrs}</td>
						</tr>
            {userData?.message?.loanApplications?.loanApplications?.customer?.cust_attach?.map((itemname) => (

            <tr key={itemname.id}>
							<th>{itemname?.file_type}</th>
              <td><img src={itemname?.url} alt={itemname?.file_type}
			//    onClick={() => setModalStatus1(!modalStatus1)}  
			   onClick={() => {
				setSelectedImage({ id: itemname.id, url: itemname.url });
				setModalStatus1(true);
			  }}
			   className='image-size-1' /></td>
						</tr>
            ))}
    
                      
					</thead>
						</table>
					</CardBody>
				</Card>
				<Modal isOpen={modalStatus1} setIsOpen={setModalStatus1}>
          <ModalHeader  setIsOpen={setModalStatus1}>
            <ModalTitle id='new-todo-modal'>Documents</ModalTitle>
          </ModalHeader>
          <ModalBody>
         
            <div className='document_1'>
            <img src={selectedImage?.url} className='image-size-2'  />

            </div>
          </ModalBody>
        </Modal>
			</Page>
		</PageWrapper>
	);
}

export default LoanProfile
