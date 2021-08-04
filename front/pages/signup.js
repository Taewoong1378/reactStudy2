import React, { useState, useCallback } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Form, Input, Checkbox, Button, Popover } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

const ErrorMessage = styled.div`
    color: red;        
`;

const Signup = () => {    

    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [nickname, onChangeNickname] = useInput('');

    // 비밀번호 체크는 조금 다른 부분이 있음
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);   // 여기까지였으면 커스텀 훅으로 줄일 수 있었다.
        setPasswordError(e.target.value !== password);
        // 비밀번호와 비밀번호 확인이 일치하는지 확인한다.
        // 둘이 일치하지 않으면 passwordError가 true가 되고
        // 둘이 일치하면 passwordError가 false가 된다.
        // 따라서 passwordError가 true가 되면 에러를 표시해주면 된다.
    }, [password]);
    
    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    }, []);

    const onSubmit = useCallback(() => {
        if(!term) {
            return setTermError(true);
        }
        console.log(id, nickname, password);
    }, [term]);

    const content = '강태웅과 오래오래 잘 지낸다!';

    return (
        <AppLayout>
            <Head>
                <title>회원가입 | Nodebird</title>
            </Head>
            <Form
                style={{ width: 400, margin: 'auto', marginTop: 10 }} 
                onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input 
                        name="user-id" 
                        value={id} 
                        required 
                        onChange={onChangeId}
                        style={{ marginBottom: 20 }}
                    />
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br />
                    <Input 
                        name="user-nickname" 
                        value={nickname} 
                        required 
                        onChange={onChangeNickname}
                        style={{ marginBottom: 20 }}
                    />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input 
                        name="user-password" 
                        type="password"
                        value={password} 
                        required 
                        onChange={onChangePassword}
                        style={{ marginBottom: 20 }}
                    />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호 체크</label>
                    <br />
                    <Input 
                        name="user-password-check" 
                        type="password"
                        value={passwordCheck} 
                        required 
                        onChange={onChangePasswordCheck}
                    />
                    {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>
                <div
                    style={{ marginTop: 15 }}
                >
                    <Checkbox 
                        name="user-term" 
                        checked={term} 
                        onChange={onChangeTerm}
                    >
                        다음 <Popover content={content}><span style={{ color: 'red', fontWeight:'bold' }}>항목</span></Popover>들에 대해 동의합니다.
                    </Checkbox>
                    {termError && <ErrorMessage>약관에 동의하셔야합니다.</ErrorMessage>}
                </div>
                <div style={{ marginTop: 10}}>
                    <Button type="primary" htmlType="submit">가입하기</Button>
                </div>
            </Form>
        </AppLayout>
    );
};

export default Signup;
