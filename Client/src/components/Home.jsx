import React from 'react'
import {
  Outlet, Link,
  } from "react-router-dom"
const Home = () => {
  return (
    <div>
            <div>
        <h1>Roxiler Systems MERN Project</h1>
      </div>
      <div>
        <h3>Task 1 : List All the Transactions</h3>

        <p><b><Link to="/showDB">/showDB : </Link></b>API To list all transactions</p>
        <h3>Task 2 : Show Statistics</h3>

        <p><b><Link to="/showStatistics">/showStatistics : </Link></b>API To show statistics</p>
        <h3>Task 3 : Show pie chart</h3>

        <p><b><Link to="/showPieChart">/showPieChart : </Link> </b>API To show PieChart</p>
        <h3>Task 4 : Show bar chart</h3>

        <p><b><Link to="/showBarChart">/showBarChart : </Link></b>API To show BarChart</p>
      </div>
    </div>
  )
}

export default Home
