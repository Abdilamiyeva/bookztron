import PropTypes from 'prop-types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

import { instance } from '@/utils/use-request'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label } from '@radix-ui/react-label'

function SignUp({ setIsLogged }) {
  const [formData, setFormData] = useState({
    userName:'',
    userEmail: '',
    userPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { value, name } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSignUp = async () => {
    setIsLoading(true)
    try {
      const data = await instance.post('/sign-up', formData)
      if (data?.data?.user) {
        localStorage.setItem('access_token', data.data?.user)
        setIsLogged(true)
        navigate('/')
        return
      }
      throw Error()
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      })
      setFormData({
        userName:'',
        userEmail: '',
        userPassword: '',
      })
    }
    setIsLoading(false)
  }
  return (

    <div className=" login__wrapper ">
      <div className='  p-[50px] relative auto top-[150px] flex gap-5 flex-col w-[400px] rounded mx-auto bg-white   '>
        <h2>Sign Up </h2>
      <Label>Name </Label>
      <Input
        name='userName'
        placeholder={'Name'}
        type='text'
        value={formData.userName}
        onChange={handleChange}
      />
      <Label>Email  address </Label>
      <Input
        name='userEmail'
        placeholder={'Email'}
        type='email'
        value={formData.userEmail}
        onChange={handleChange}
      />
      <Label>Password </Label>
      <Input
        name='userPassword'
        placeholder={'Password'}
        type='password'
        value={formData.userPassword}
        onChange={handleChange}
      />
      <Button  onClick={onSignUp} disabled={isLoading}>
        Create New Account 
      </Button>
      <Link to={'/login'} className='ml-10'>Already have an account</Link>
    </div>
    </div>
  )
}
export default SignUp

SignUp.propTypes = {
  setIsLogged: PropTypes.func,
}
