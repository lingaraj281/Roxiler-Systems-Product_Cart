import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const PieChart = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/showDB")
      .then(response => response.json())
      .then(data => {
        setData(data);
        setChartData(formatChartData(data)); // Initially set chart data to all data
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    filterData(month);
  };

  const filterData = (month) => {
    let filtered = data;
    if (month) {
      filtered = filtered.filter(item => {
        const itemMonth = new Date(item.dateOfSale).getMonth(); // getMonth() is zero-based
        return itemMonth === parseInt(month, 10) - 1; // parseInt(month, 10) will give 1 for January, 2 for February, etc.
      });
    }
    setChartData(formatChartData(filtered));
  };

  const formatChartData = (filteredData) => {
    const categoryCounts = filteredData.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    const chartArray = [['Category', 'Count']];
    for (const category in categoryCounts) {
      chartArray.push([category, categoryCounts[category]]);
    }
    return chartArray;
  };

  const options = {
    title: 'Sales by Category',
    is3D: true,
  };

  return (
    <div>
      <h1>Pie Chart</h1>
      <select
        name="month"
        id="month"
        onChange={handleMonthChange}
      >
        <option value="">All Months</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width={"100%"}
        height={"600px"}
      />
    </div>
  );
};

export default PieChart;
