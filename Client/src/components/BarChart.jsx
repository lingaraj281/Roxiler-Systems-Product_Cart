import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const BarChart = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [chartData, setChartData] = useState([['Price Range', 'Count']]);

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
    const priceRanges = [
      '0-100', '101-200', '201-300', '301-400',
      '401-500', '501-600', '601-700', '701-800',
      '801-900', '901 above'
    ];
    const priceRangeCounts = new Array(priceRanges.length).fill(0);

    filteredData.forEach(item => {
      const price = item.price;
      if (price >= 0 && price <= 100) priceRangeCounts[0]++;
      else if (price >= 101 && price <= 200) priceRangeCounts[1]++;
      else if (price >= 201 && price <= 300) priceRangeCounts[2]++;
      else if (price >= 301 && price <= 400) priceRangeCounts[3]++;
      else if (price >= 401 && price <= 500) priceRangeCounts[4]++;
      else if (price >= 501 && price <= 600) priceRangeCounts[5]++;
      else if (price >= 601 && price <= 700) priceRangeCounts[6]++;
      else if (price >= 701 && price <= 800) priceRangeCounts[7]++;
      else if (price >= 801 && price <= 900) priceRangeCounts[8]++;
      else if (price >= 901) priceRangeCounts[9]++;
    });

    const chartArray = [['Price Range', 'Count']];
    priceRanges.forEach((range, index) => {
      chartArray.push([range, priceRangeCounts[index]]);
    });

    return chartArray;
  };

  const options = {
    title: 'Number of Items in Price Range',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Total Items',
      minValue: 0,
    },
    vAxis: {
      title: 'Price Range',
    },
  };

  return (
    <div>
      <h1>Bar Chart</h1>
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
        chartType="Bar"
        data={chartData}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default BarChart;
