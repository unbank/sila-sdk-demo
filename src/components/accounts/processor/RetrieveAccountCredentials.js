import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { useAppContext } from '../../context/AppDataProvider';
import plaidApi from '../../../api/plaid';

import AccountContextual from './AccountContextual';

import { DEFAULT_PROCESSOR_NAME } from '../../../constants/plaidGenerateProcessor';

const RetrieveAccountCredentials = ({ step, title, context, isTutorial, allPlaidTokens, onHandleClick, onProcessorToken, onLoaded, onTabKey }) => {
  const { app, setAppData, updateApp } = useAppContext();
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState(false);

  const createProcessorToken = async (e) => {
    console.log('createProcessorToken ... ');
    e.preventDefault();
    let isValidated = true;
    let validationErrors = {};
    if (!allPlaidTokens.accessToken) {
      isValidated = false;
      validationErrors = { ...validationErrors, accessToken: "This field may not be blank." };
    }
    if (!allPlaidTokens.accountId) {
      isValidated = false;
      validationErrors = { ...validationErrors, accountId: "This field may not be blank." };
    }
    if (e.target.processorName && e.target.processorName.value) e.target.processorName.value = e.target.processorName.value.trim();
    if (e.target.processorName && !e.target.processorName.value) {
      isValidated = false;
      validationErrors = { ...validationErrors, processorName: "This field may not be blank." };
    }
    if (!isValidated) {
      setErrors(validationErrors);
      setValidated(true);
      return;
    }

    try {
      onLoaded(false);
      let result = {};
      const response = await plaidApi.createProcessorToken({
        'accessToken': allPlaidTokens.accessToken,
        'accountID': allPlaidTokens.accountId,
        'processor': e.target.processorName.value
      });

      if (response && response.status === 200 && response.data && response.data.processor_token) {
        validationErrors = {};
        result.alert = {};
        onProcessorToken(response.data.processor_token);
        onHandleClick(undefined, step);
      } else {
        const error_msg = response.data ? response.data.error_message : 'Something wrong!';
        validationErrors = { ...validationErrors, accessToken: error_msg }
        result.alert = { message: error_msg, type: 'danger' };
      }

      setAppData({
        responses: [{
          endpoint: '/processor/token/create',
          result: JSON.stringify(response, null, '\t')
        }, ...app.responses]
      }, () => {
        updateApp({ ...result });
      });
    } catch (error) {
      console.log(error);
    }
    setErrors(validationErrors);
    setValidated(true);
    onLoaded(true);
  };

  return (<>
    <AccountContextual step={step} title={title} context={context} isTutorial={isTutorial} onHandleClick={onHandleClick} onTabKey={onTabKey} />
    
    {!isTutorial && <Form noValidate validated={validated} autoComplete="off" onSubmit={createProcessorToken}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="accessToken">Access Token</Form.Label>
        <Form.Control required readOnly id="accessToken" placeholder="Access Token" aria-label="Access Token" name="accessToken" defaultValue={allPlaidTokens.accessToken ? allPlaidTokens.accessToken : undefined} isInvalid={Boolean(errors && errors.accessToken)} />
        {errors && errors.accessToken && <Form.Control.Feedback type="invalid">{errors.accessToken}</Form.Control.Feedback>}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="accountId">Account ID</Form.Label>
        <Form.Control required readOnly id="accountId" placeholder="Account ID" aria-label="Account ID" name="accountId" defaultValue={allPlaidTokens.accountId ? allPlaidTokens.accountId : undefined} isInvalid={Boolean(errors && errors.accountId)} />
        {errors && errors.accountId && <Form.Control.Feedback type="invalid">{errors.accountId}</Form.Control.Feedback>}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="processorName">Processor</Form.Label>
        <Form.Control required readOnly id="processorName" placeholder="Processor" aria-label="Processor" name="processorName" defaultValue={DEFAULT_PROCESSOR_NAME} isInvalid={Boolean(errors && errors.processorName)} />
        {errors && errors.processorName && <Form.Control.Feedback type="invalid">{errors.processorName}</Form.Control.Feedback>}
      </Form.Group>

      <div className="mt-2 mb-2 loaded">
        <Row className="mt-2 justify-content-end">
          <Col lg="12" xl="3"><Button block variant="outline-light" className="mb-2" onClick={() => onTabKey(step-2)}>Previous</Button></Col>
          <Col lg="12" xl="4"><Button block className="mb-2" type="submit">Retrieve Credentials</Button></Col>
        </Row>
      </div>
    </Form>}
  </>);
};

export default RetrieveAccountCredentials;