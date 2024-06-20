import React, { useState, useEffect } from 'react';

const Table = () => {
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page

  useEffect(() => {
    fetch("http://localhost:3000/showDB")
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredItems(data);
        setIsDropdownDisabled(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchItem(searchTerm);
    filterData(searchTerm, selectedMonth);
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    filterData(searchItem, month);
  };

  const filterData = (searchTerm, month) => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
      );
    }

    if (month) {
      filtered = filtered.filter(item => {
        const itemMonth = new Date(item.dateOfSale).getMonth() + 1; // getMonth() is zero-based
        return itemMonth === parseInt(month, 10);
      });
    }
    
    setFilteredItems(filtered);
    setPageCount(1); // Reset to the first page whenever filters change
  };

  const startIndex = (pageCount - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div>
      <div className="head">
            <h1>Transaction Dashboard</h1>
        <input
          type="text"
          placeholder="Search Transaction"
          onChange={handleSearchChange}
          value={searchItem}
        />
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
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
            {/* <th>Date of Sale</th> */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map(item => (
            <tr key={item._id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.sold.toString()}</td>
              <td><img src={item.image} alt={item.title} className='product-imgs' /></td>
              {/* <td>{item.dateOfSale}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div>
        <button
          onClick={() => setPageCount(prevCount => Math.max(prevCount - 1, 1))}
          disabled={pageCount === 1}
        >
          Prev
        </button>
        <span>Page {pageCount} / 6</span>
        <button
          onClick={() => setPageCount(prevCount => Math.min(prevCount + 1, Math.ceil(filteredItems.length / itemsPerPage)))}
          disabled={pageCount === Math.ceil(filteredItems.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
