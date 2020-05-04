import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Soundwave from 'images/soundwave.jpg'
import HomeLink from './homelink'
const Home = props => {
  return(
    <div>
      <div>
        <img className="main-image" src={Soundwave} />
      </div>
      <h3 className="homeline">Hear Your Portfolio</h3>
      <div className="grid-container">
        <div className="grid-margin-x grid-x">
          <HomeLink text="Create" link={"/melodies/new"}/>
          <HomeLink text="Sign up" />
          <HomeLink text="Featured" link={"melodies/1"} />
        </div>
      </div>
    </div>
  )
}

export default Home
