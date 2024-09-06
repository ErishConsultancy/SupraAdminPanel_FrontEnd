import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Card, { CardBody, CardFooter, CardFooterRight } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Avatar from '../../components/Avatar';

import User1Webp from '../../assets/img/wanna/wanna2.webp';
import User1Img from '../../assets/img/wanna/wanna2.png';

const EditUser = () => {
    const { userId } = useParams();
    const [Name, setName] = useState('');
    const [MobileNo, setMobileNo] = useState('');
    const [Email, setEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [userData, setUserData] = useState(null);

    const authToken = localStorage.getItem('token');

    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch(`https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUserData(data);

            // Pre-fill the form with existing data
            setName(data?.message?.users?.users?.fname || '');
            setEmail(data?.message?.users?.users?.email || '');
            setMobileNo(data?.message?.users?.users?.phone || '');
            setDesignation(data?.message?.users?.users?.designation || '');

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }, [userId, authToken]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);
console.log(userData, "userData");
    const UpdateFormAPI = async () => {
        const url = `https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/user/${userId}`;
        const token = Cookies.get('token'); 

        const data = {
            fname: Name,
            email: Email,
            phone: MobileNo,
            designation
        };

        if (!token) {
            console.error('Authentication token is missing');
            return;
        }

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert('Thank you! Your record has been successfully updated.');
            window.location.href = '/userlist';

        } catch (error) {
            console.error('There was a problem with the update operation:', error);
        }
    };

    return (
        <PageWrapper>
            <Page>
                <div className='row h-100 pb-3'>
                    <div className='col-lg-12 col-md-12'>
                        <Card>
                            <div className='row'>
                                <h4 className='heading-h4'>User Details</h4>
                                <div className='col-lg-4 col-md-5'>
                                    <CardBody>
                                        <div className='row g-4 align-items-center'>
                                            <div className='col-xl-auto'>
                                                <Avatar srcSet={User1Webp} src={User1Img} />
                                            </div>
                                            <div className='col-xl'>
                                                <div className='row g-4'>
                                                    <div className='col-auto'>
                                                        <Input
                                                            type='file'
                                                            autoComplete='photo'
                                                            ariaLabel='Upload image file'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </div>
                                <div className='col-lg-8 col-md-7'>
                                    <CardBody className='pb-0'>
                                        <div className='row g-4'>
                                            <div className='col-6'>
                                                <label htmlFor="exampleAC--name" className="form-label">Name</label>
                                                <FormGroup id='Name'>
                                                    <Input
                                                        type='text'
                                                        name='name'
                                                        placeholder='Name'
                                                        autoComplete='name'
                                                        value={Name}
                                                        onChange={(e) =>
                                                            setName(e.target.value)
                                                        }
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-6'>
                                                <label htmlFor="exampleAC--email" className="form-label">Email</label>
                                                <FormGroup id='Email'>
                                                    <Input
                                                        type='text'
                                                        name='email'
                                                        placeholder='Email'
                                                        autoComplete='email'
                                                        value={Email}
                                                        onChange={(e) =>
                                                            setEmail(e.target.value)
                                                        }
                                                    />
                                                </FormGroup>
                                               
                                            </div>
                                            <div className='col-6'>
                                                <label htmlFor="exampleAC--phone" className="form-label">Phone</label>
                                                <FormGroup id='Phone'>
                                                    <Input
                                                        type='text'
                                                        name='phone'
                                                        placeholder='Phone'
                                                        autoComplete='phone'
                                                        value={MobileNo}
                                                        onChange={(e) =>
                                                            setMobileNo(e.target.value)
                                                        }
                                                    />
                                                </FormGroup>
                                                
                                            </div>
                                            <div className='col-6'>
                                                <label htmlFor="exampleAC--designation" className="form-label">Designation</label>
                                                <FormGroup id='Designation'>
                                                    <select
                                                        value={designation}
                                                        onChange={(e) => setDesignation(e.target.value)}
                                                        className='selectvalue'>
                                                        <option value="" disabled>Select your Designation</option>
                                                        <option value='Chief Executive Officer (CEO)'>Chief Executive Officer (CEO)</option>
                                                        <option value='Chief Operating Officer (COO)'>Chief Operating Officer (COO)</option>
                                                        <option value="Chief Financial Officer (CFO)">Chief Financial Officer (CFO)</option>
                                                        <option value="Chief Technology Officer (CTO)">Chief Technology Officer (CTO)</option>
                                                        <option value="Chief Marketing Officer (CMO)">Chief Marketing Officer (CMO)</option>
                                                        <option value="Chief Human Resources Officer (CHRO)">Chief Human Resources Officer (CHRO)</option>
                                                        <option value="Vice President">Vice President</option>
                                                        <option value="Director">Director</option>
                                                        <option value="Manager">Manager</option>
                                                        <option value="Team Leader">Team Leader</option>
                                                        <option value="Senior Software Engineer">Senior Software Engineer</option>
                                                        <option value="Software Engineer">Software Engineer</option>
                                                        <option value="Junior Software Engineer">Junior Software Engineer</option>
                                                        <option value="Intern">Intern</option>
                                                        <option value="Human Resources Specialist">Human Resources Specialist</option>
                                                        <option value="Accountant">Accountant</option>
                                                        <option value="Sales Executive">Sales Executive</option>
                                                        <option value="Marketing Specialist">Marketing Specialist</option>
                                                        <option value="Administrative Assistant">Administrative Assistant</option>
                                                        <option value="Customer Support Representative">Customer Support Representative</option>
                                                    </select>
                                                </FormGroup>
                                               
                                            </div>
                                           
                                        </div>
                                    </CardBody>
                                    <CardFooter>
                                        <CardFooterRight>
                                            <Button
                                                type='button'
                                                icon='Save'
                                                color='info'
                                                isOutline
                                                onClick={UpdateFormAPI}>
                                                Submit
                                            </Button>
                                        </CardFooterRight>
                                    </CardFooter>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Page>
        </PageWrapper>
    );
};
export default EditUser
