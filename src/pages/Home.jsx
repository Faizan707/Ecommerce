import React from 'react'
import Navbar from '../components/Navbar'
import AllProducts from './AllProducts'
import { useSelector } from 'react-redux'

function Home() {
  const users = useSelector((state)=> state.Users.UserData)
  console.log(users)
  return (
    <>
    <Navbar/>
    <AllProducts/>
    
    </>
  )
}

export default Home