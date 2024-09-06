import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Card, { CardBody, CardFooter, CardFooterRight } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';

const CreateRoles = () => {
    const [Name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        name: '',
    });
    // const [response, setResponse] = useState(null);

    const UpdateFormAPI = async () => {
        const errors = {
            name: !Name ? 'Please Enter Name' : '',
        };

        setErrorMessage(errors);

        if (Object.values(errors).some((error) => error)) {
            return;
        }

        const url = 'https://suprafinleaselimitedbe-production.up.railway.app/api/setting/roles';
        const token = Cookies.get('token');
        console.log(token, 'token Check');
        const data = { name: Name };

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

            // const json = await response.json();
            alert('Thank you! Your record has been successfully submitted.');
            window.location.href = '/roles';

            // setResponse(json);
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
                                    <h4 className='heading-h4'>Add Role</h4>
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

export default CreateRoles;