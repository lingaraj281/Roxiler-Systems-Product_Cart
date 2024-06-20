import React, { useState, useEffect } from 'react';

const Stats = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
  const [saleAmount, setSaleAmount] = useState(0);
  const [sold, setSold] = useState(0);
  const [notSold, setNotSold] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/showDB")
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredItems(data); // Initially set filtered items to all data
        setIsDropdownDisabled(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    filterData(selectedMonth);
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
  };

  const filterData = (month) => {
    let filtered = data;
    if (month) {
      filtered = filtered.filter(item => {
        const itemMonth = new Date(item.dateOfSale).getMonth(); // getMonth() is zero-based
        return itemMonth === parseInt(month, 10) - 1; // parseInt(month, 10) will give 1 for January, 2 for February, etc.
      });
    }

    // Calculate saleAmount, sold, and notSold
    let totalSaleAmount = 0;
    let totalSold = 0;
    let totalNotSold = 0;

    filtered.forEach(item => {
      totalSaleAmount += item.price;
      if (item.sold) {
        totalSold++;
      } else {
        totalNotSold++;
      }
    });

    setSaleAmount(totalSaleAmount);
    setSold(totalSold);
    setNotSold(totalNotSold);

    setFilteredItems(filtered); // Update filtered items state
  };

  return (
    <div className='stats'>
      <h1>Statistics</h1>
      <select
        name="month"
        id="month"
        onChange={handleMonthChange}
        disabled={isDropdownDisabled}
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
      
      <p>Total sale amount : {saleAmount}</p>
      <p>Total number of sold items  : {sold}</p>
      <p>Total number of not sold items : {notSold}</p>
    </div>
  );
};

export default Stats;
