import PropTypes from 'prop-types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

import { instance } from '@/utils/use-request'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Label } from '@radix-ui/react-label'

function Login({ setIsLogged }) {
  const [formData, setFormData] = useState({
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

  const onLogin = async () => {
    setIsLoading(true)
    try {
      const data = await instance.post('/login', formData)
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
        userEmail: '',
        userPassword: '',
      })
    }
    setIsLoading(false)
  }
  return (

    <div className="login__wrapper ">
      <div className=' relative auto top-[280px] flex gap-5 flex-col w-[550px] rounded mx-auto bg-white p-10 h-[400px]'>
        <h2 className='text-2xl font-black'>Login </h2>
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
      <Button  onClick={onLogin} disabled={isLoading}>
        Login
      </Button>
   
      <Link className=" mx-auto flex text-center" to={'/sign-up'}>Sign up</Link>
    </div>
    </div>
  )
}
export default Login

Login.propTypes = {
  setIsLogged: PropTypes.func,
}
