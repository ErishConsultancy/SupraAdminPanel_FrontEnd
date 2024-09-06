import React, { useState } from 'react';
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

const CreateUser = () => {
    const [Name, setName] = useState('');
    const [MobileNo, setMobileNo] = useState('');
    const [Email, setEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState({
        name: '',
        email: '',
        phone: '',
        password:'',
        designation: '',
    });
    const authToken = localStorage.getItem('token');
    console.log(authToken, 'authToken');

    const UpdateFormAPI = async () => {
        const errors = {
            name: !Name ? 'Please Enter Name' : '',
            email: !Email ? 'Please Enter Email' : '',
            phone: !MobileNo ? 'Please Enter Phone' : '',
            password: !password? 'Please Enter Password': '',
            designation: !designation ? 'Please Enter Designation' : '',
        };

        setErrorMessage(errors);

        if (Object.values(errors).some((error) => error)) {
            return;
        }

        const url = 'https://suprafinleaselimitedbe-production.up.railway.app/api/nbfc/user';
        const token = Cookies.get('token'); 

        console.log(token, 'token Check');
        const data = {
            name: Name,
            email: Email,
            password,
            role: 6,
            phone: MobileNo,
            designation
        };

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

            alert('Thank you! Your record has been successfully submitted.');
            window.location.href = '/userlist';

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
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
                                                {errorMessage.name && (
                                                    <div className='text-danger'>
                                                        {errorMessage.name}
                                                    </div>
                                                )}
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
                                                {errorMessage.email && (
                                                    <div className='text-danger'>
                                                        {errorMessage.email}
                                                    </div>
                                                )}
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
                                                {errorMessage.phone && (
                                                    <div className='text-danger'>
                                                        {errorMessage.phone}
                                                    </div>
                                                )}
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
                                                {errorMessage.designation && (
                                                    <div className='text-danger'>
                                                        {errorMessage.designation}
                                                    </div>
                                                )}
                                            </div>
                                            <div className='col-6'>
                                                <label htmlFor="exampleAC--password" className="form-label">Password</label>
                                                <FormGroup id='Password'>
                                                    <Input
                                                        type='text'
                                                        name='password'
                                                        placeholder='Password'
                                                        autoComplete='password'
                                                        value={password}
                                                        onChange={(e) =>
                                                            setPassword(e.target.value)
                                                        }
                                                    />
                                                </FormGroup>
                                                {errorMessage.password && (
                                                    <div className='text-danger'>
                                                        {errorMessage.password}
                                                    </div>
                                                )}
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

export default CreateUser;
