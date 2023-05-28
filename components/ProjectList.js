'use client';

import Link from 'next/link';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { AvatarElement } from './Avatar';
import { Loading } from './Loading';


function FileRow({ fileInfo, onDelete }) {
  return (
    <tr key={fileInfo.uid} className="bg-[#807d7d] border-b">
      <th scope="row" className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap">
        <Link href={`/project/${fileInfo.uid}`}>
          {fileInfo.originalname}
        </Link>
      </th>
      <td className="px-6 py-4"></td>
      <td className="px-6 py-4"></td>
      <td className="px-6 py-4 text-white">{fileInfo.mimetype}</td>
      <td className="px-6 py-4 text-white">{fileInfo.size}</td>
      <td className="px-6 py-4"><AvatarElement /></td>
      <td className="px-6 py-4">
        <button onClick={() => onDelete(fileInfo.uid)} className="text-black shadow-blackA7 max-w-xs ml-auto inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none text-sm">
          Delete
        </button>
      </td>
    </tr>
  );
}

export function ProjectList() {
  const [fileInfos, setFileInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/files');
        const data = await res.json();
        setFileInfos(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/files?id=${id}`, {
        method: 'DELETE'
      });
      setFileInfos(fileInfos.filter(fileInfo => fileInfo.uid !== id));

      toast.success("successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting the file.");
    }
  }

  const handleClickNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleClickPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">

            </th>
            <th scope="col" className="px-6 py-3">

            </th>
            <th scope="col" className="px-6 py-3">
              mimetype
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              Owner
            </th>
            <th scope="col" className="px-6 py-3">

            </th>
          </tr>
        </thead>
        <tbody>
          {fileInfos.length > 0 ? (
            fileInfos
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((fileInfo) => (
                <FileRow key={fileInfo.uid} fileInfo={fileInfo} onDelete={handleDelete} />
              ))
          ) : (
            <tr className='bg-white border-b'>
              <td colSpan="7" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">No projects to display.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex space-x-3 m-4">
        <button onClick={handleClickPrev} disabled={currentPage === 1} className="text-black shadow-blackA7 max-w-xs ml-auto inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none text-sm">
          Previous
        </button>
        <div className="my-auto">
          Page {currentPage} of {Math.ceil(fileInfos.length / itemsPerPage)}
        </div>
        <button onClick={handleClickNext} disabled={fileInfos.length <= currentPage * itemsPerPage} className="text-black shadow-blackA7 max-w-xs ml-auto inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none text-sm">
          Next
        </button>
      </div>
    </div>
  )
}