'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onLogin = async () => {
    try {
      setLoading(true)
      const res = await axios.post("/api/users/login", user)
      console.log("login successful", res.data)
      router.push("/profile")
    } catch (error) {
      console.log(error)
      toast.error("login failed")
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className=' w-full flex justify-center pt-[100px] '>
      <div className=' max-w-sm  mx-auto w-full p-6 border-slate-600 bg-[#282a30] shadow-lg rounded-lg'>
        <h1 className=' text-3xl font-bold text-white mb-6'>{loading ? "Processing...." : "Log in"}</h1>
        <label
          htmlFor='email'
          className=' font-semibold text-white py-1 mt-3'
        >
          Email :
          <input
            type=' email'
            placeholder='Enter email address'
            id='email'
            value={user.email}
            onChange={(e: any) => setUser({ ...user, email: e.target.value })}
            className=' w-full px-4 py-2 bg-[#60657d] rounded-lg outline-none text-lg font-medium'
          />
        </label>
        <label
          htmlFor='password'
          className=' font-semibold text-white py-1 mt-3'
        >
          Password :
          <input
            type='password'
            placeholder='Enter password'
            id='password'
            value={user.password}
            onChange={(e: any) => setUser({ ...user, password: e.target.value })}
            className=' w-full px-4 py-2 bg-[#60657d] rounded-lg outline-none text-lg font-medium'
          />
        </label>
        <button
          onClick={onLogin}
          disabled={buttonDisabled}
          className=' w-full bg-blue-500 py-2 text-white text-center rounded-lg mt-5'
        >Log in</button>
        <Link href={"/signup"} className=' block  text-white text-center py-2 '>visit sign up</Link>
      </div>
    </div>
  )
}

export default LoginPage
