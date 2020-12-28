import AppLayout from '../components/AppLayout'
import { useCallback, useState } from 'react'
import Head from 'next/head'
import { Form, Input, Button, Checkbox } from 'antd'
import userInput from '../hooks/useInput'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  color: red;
`

const Signup = () => {

  const [id, onChangeId] = userInput('')
  const [nickname, onChangeNickname] = userInput('')
  const [password, onChangePassword] = userInput('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value)
    setPasswordError(e.target.value !== password)
  }, [password])

  const [term, setTerm] = useState('')
  const [termError, setTermError] = useState(false)
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked)
    setTermError(false)
  }, [])


  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true)
    }
    if (!term) {
      return setTermError(true)
    }    
    console.log(id, nickname, password)
  }, [password, passwordCheck, term])


  return (
    <>
      <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
        <meta charSet="utf-8"></meta>
      </Head> 
      
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user-id">아이디</label>
            <br />
            <Input name="user-id" value={id} onChange={onChangeId} required/>
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <br />
            <Input name="user-nick" value={nickname} onChange={onChangeNickname} required/>
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input 
              name="user-password" 
              type="password" 
              value={password} 
              onChange={onChangePassword} 
              required />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호 체크</label>
            <br />
            <Input 
              name="user-password-check" 
              type="password" 
              value={passwordCheck} 
              onChange={onChangePasswordCheck} 
              required />
              {passwordError && <ErrorMessage >비밀번호가 일치하지 않습니다.</ErrorMessage>}
          </div>

          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
            {termError && <ErrorMessage >약관 동의하세요</ErrorMessage>}
          </div>

          <div style={{marginTop: 10}}>
            <Button type="primary" htmlType="submit">가입하기</Button>
          </div>

        </Form>
      </AppLayout>
    </>
  )
}

export default Signup