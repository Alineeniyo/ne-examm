import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {jwtDecode} from 'jwt-decode';

export default function Display() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState({}); // Replace with actual logged-in user logic

  useEffect(() => {
    const fetchData = async () => {
      try {
        const books = await axios.get("http://localhost:4000/books/all");
        const result = books.data;
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    fetchData();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const filteredData = React.useMemo(() => {
    return data.filter(book =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.publicationYear.toString().includes(searchTerm.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleClick = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  const getUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setLoggedInUser(decoded);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className='flex'>
      {/* Sidebar */}
      <aside className='bg-gray-800 text-gray-100 w-1/5 min-h-screen'>
        <div className='p-4'>
          <h2 className='text-2xl font-semibold mb-4'>Library System</h2>
          <ul className='space-y-2'>
            <li>
              <NavLink
                exact
                to='/dashboard'
                activeClassName='bg-gray-700'
                className='block p-2 rounded-md hover:bg-gray-700'
              >
                Books
              </NavLink>
            </li>
            <li>
              <button
                onClick={logout}
                className='flex items-center text-gray-400 hover:text-white p-2 rounded-md hover:bg-gray-700'
              >
                <FontAwesomeIcon icon={faSignOutAlt} className='mr-2' />
                Logout
              </button>
            </li>
            {/* Add more sidebar items as needed */}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-4'>
        {/* Header */}
        <header className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-semibold text-gray-800'>Library Management System</h1>
          <div className='flex items-center'>
            <FontAwesomeIcon icon={faUser} className='text-gray-600 mr-2' />
            <span className='text-gray-600'>{loggedInUser.firstname} {loggedInUser.lastName}</span>
          </div>
        </header>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className='mb-4'>
          <input
            type='text'
            placeholder='Search by name, author, etc...'
            className='px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none w-full sm:max-w-xs'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Table */}
        <div className='overflow-x-auto w-full'>
          <table className='min-w-full bg-white shadow-md rounded-lg'>
            <thead>
              <tr className='bg-blue-600 text-white'>
                <th className='w-1/12 py-2'>ID</th>
                <th className='w-2/12 py-2'>Name</th>
                <th className='w-2/12 py-2'>Author</th>
                <th className='w-2/12 py-2'>Publisher</th>
                <th className='w-2/12 py-2'>Year</th>
                <th className='w-3/12 py-2'>Subject</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((book) => (
                <tr key={book.id} className='border-b hover:bg-gray-100'>
                  <td className='py-2 text-center'>{book.id}</td>
                  <td className='py-2 text-center'>{book.name}</td>
                  <td className='py-2 text-center'>{book.author}</td>
                  <td className='py-2 text-center'>{book.publisher}</td>
                  <td className='py-2 text-center'>{book.publicationYear}</td>
                  <td className='py-2 text-center'>{book.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className='flex justify-center mt-4'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={(event) => handleClick(event, index + 1)}
              className={`mx-1 px-4 py-2 border rounded-full ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
