import React from 'react'

import Topbar from './Topbar/Topbar';
import MainContent from './MainContent/MainContent';
import Cards from './Cards/Cards';

import styles from "./home.module.css";

const Home = () => {
  return (
    <div>
      <Topbar/>
      <div className={styles.flex}>
        <MainContent/>
        <Cards/>
      </div>
    </div>
  )
}

export default Home