import { Form, Input, Button } from 'antd'
import { useCallback, useMemo } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import userInput from '../hooks/useInput'
import { useDispatch } from 'react-redux'
import { loginAction } from '../reducers/user'

const ButtonWrapper = styled.div`
  margin-top: 10px;
`
const FormWrapper = styled(Form)`
  padding: 10px;
`

const LoginForm = () => {
  const dispatch = useDispatch()

  const [id, onChangeId] = userInput('')
  const [password, onChangePassword] = userInput('')
  
  const style = useMemo(() => ({marginTop: 10}), [])

  const onSubmitForm = useCallback(() => {
    console.log(id, password)    
    dispatch(loginAction({id, password}))
  }, [id, password])
  

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required/>
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
      <ButtonWrapper style={style}>
        <Button type="primary" htmlType="submit" loading={false} required>
          로그인
        </Button>
        <Link href="/signup" >
          <a><Button>회원가입</Button></a>
        </Link>
      </ButtonWrapper>
      <div>

      </div>
    </FormWrapper>
  )
}

export default LoginForm