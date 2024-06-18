import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Display() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

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
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

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

  return (
    <div className='flex flex-col items-center mt-6'>
      <h1 className='text-3xl font-semibold text-gray-800 mb-6'>Your are inside our Library management system</h1>
      <form onSubmit={handleSubmit} className='flex mb-4'>
      <input
  type='text'
  placeholder='Search by name, author, etc...'
  className='px-4 sm:px-100 py-2 border border-gray-300 rounded-l-md focus:outline-none w-full sm:max-w-xs'
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

      </form>
      <div className='overflow-x-auto w-full px-4'>
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
    </div>
  );
}
