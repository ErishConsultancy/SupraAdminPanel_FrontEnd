import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Card, { CardBody, CardFooter, CardFooterRight } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';

const EditRoles = () => {
    const { id } = useParams(); // Get the role id from the URL
    const navigate = useNavigate();

    const [Name, setName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        name: '',
    });
    const authToken = localStorage.getItem('token');
    const [userData, setUserData] = useState(null);

    const fetchUserData = useCallback(async () => {
        try {
            const response = await fetch(`https://suprafinleaselimitedbe-production.up.railway.app/api/setting/roles/${id}`, {
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
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }, [id, authToken]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    useEffect(() => {
        if (userData?.message.roles[0]?.name) {
            setName(userData.message.roles[0].name);
        }
    }, [userData]);

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const UpdateFormAPI = async () => {
        const errors = {
            name: !Name ? 'Please Enter Name' : '',
        };

        setErrorMessage(errors);

        if (Object.values(errors).some((error) => error)) {
            return;
        }

        const url = `https://suprafinleaselimitedbe-production.up.railway.app/api/setting/roles/${id}`;
        const token = Cookies.get('token');

        if (!token) {
            console.error('Authentication token is missing');
            return;
        }

        const data = {
            name: Name,
        };

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

            await response.json();
            alert('Thank you! Your record has been successfully submitted.');
            navigate('/roles');
            setIsSubmitted(true);
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
                            {isSubmitted ? (
                                <div className='thank-you-message'>
                                    <h4>Thank you! Your submission has been received.</h4>
                                </div>
                            ) : (
                                <div className='row'>
                                    <h4 className='heading-h4'>Update Role</h4>
                                    <div className='col-lg-12 col-md-12'>
                                        <CardBody className='pb-0'>
                                            <div className='row g-4'>
                                                <div className='col-12'>
                                                    <label htmlFor="exampleAC--name" className="form-label">Name</label>
                                                    <FormGroup id='Name'>
                                                        <Input
                                                            type='text'
                                                            name='name'
                                                            placeholder='Name'
                                                            autoComplete='name'
                                                            value={Name}
                                                            onChange={handleInputChange}
                                                        />
                                                    </FormGroup>
                                                    {errorMessage.name && (
                                                        <div className='text-danger'>
                                                            {errorMessage.name}
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
                                                    Update
                                                </Button>
                                            </CardFooterRight>
                                        </CardFooter>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </Page>
        </PageWrapper>
    );
}

export default EditRoles;
