import React from 'react'
import { Link } from 'react-router-dom'
import style from './Landing.module.css'

const Landing=()=> {
  return (
    <section className={style.container} >
      <h1>Welcome to Henry Countries</h1>
      <h3>PI by 
        <a  href='https://www.linkedin.com/in/tomasbrenner/' target='_blank' rel='noreferrer' > Tomas Brenner.</a>
      </h3>
      <Link to='/home' className={style.button} >See Countries...</Link>
    </section>
  )
}

export default Landing