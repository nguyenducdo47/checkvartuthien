import React, { useState } from "react";
import data from "./pages/Tracuu.json";

const Tracuu = () => {
  const [transactions, setTransactions] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  // Hàm sắp xếp theo A-Z hoặc Z-A cho cột date
  const sortByDate = (order) => {
    const sorted = [...transactions].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    setTransactions(sorted);
  };

  // Hàm sắp xếp theo A-Z hoặc Z-A cho cột amount
  const sortByAmount = (order) => {
    const sorted = [...transactions].sort((a, b) => {
      return order === "asc" ? a.amount - b.amount : b.amount - a.amount;
    });
    setTransactions(sorted);
  };

  // Hàm tìm kiếm trong cột notes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Đặt lại trang về 1 khi tìm kiếm
  };

  // Dữ liệu sau khi tìm kiếm
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán số trang
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Lấy dữ liệu của trang hiện tại
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Chuyển trang
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Tạo số trang hiển thị linh hoạt
  const getPaginationGroup = () => {
    const maxPagesToShow = 5; // Số trang muốn hiển thị tối đa
    let start = Math.max(1, currentPage - 2); // Hiển thị các trang lân cận trang hiện tại
    let end = Math.min(start + maxPagesToShow - 1, totalPages);

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  return (
    <div className="p-4">
      <h2 className="mb-4 text-sm font-bold md:text-2xl">
        Bảng sao kê giao dịch chuyển khoản đến tài khoản VCB của MTTQ từ
        1/9/2024 - 10/9/2024
      </h2>

      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      {/* Nút sắp xếp */}
      <div className="flex mb-4 space-x-2">
        <button
          onClick={() => sortByDate("asc")}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Ngày tăng dần
        </button>
        <button
          onClick={() => sortByDate("desc")}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Ngày giảm dần
        </button>
        <button
          onClick={() => sortByAmount("asc")}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Số tiền tăng dần
        </button>
        <button
          onClick={() => sortByAmount("desc")}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Số tiền giảm dần
        </button>
      </div>

      {/* Bảng hiển thị dữ liệu */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs border border-collapse border-gray-300 table-auto md:text-sm lg:text-base">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300 whitespace-nowrap">
                Ngày giao dịch
              </th>
              <th className="p-2 border border-gray-300 whitespace-nowrap">
                Số tiền
              </th>
              <th className="p-2 border border-gray-300">Ghi chú</th>
              <th className="p-2 border border-gray-300 whitespace-nowrap">
                Code
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <tr key={index} className="odd:bg-gray-100">
                <td className="p-2 border border-gray-300 whitespace-nowrap">
                  {transaction.date}
                </td>
                <td className="p-2 border border-gray-300 whitespace-nowrap">
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="p-2 break-words border border-gray-300">
                  {transaction.notes}
                </td>
                <td className="p-2 border border-gray-300 whitespace-nowrap">
                  {transaction.code}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Điều khiển pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {/* Nút chuyển về trang 1 */}
        {currentPage > 1 && (
          <button
            onClick={() => changePage(1)}
            className="px-2 py-1 bg-gray-300 rounded md:text-base text-xxs md:px-4 md:py-2 hover:bg-gray-400"
          >
            {`<<`}
          </button>
        )}

        {/* Hiển thị dấu ... nếu không phải là trang đầu tiên */}
        {currentPage > 2 && (
          <span className="px-1 py-1 md:px-2 md:py-2">...</span>
        )}

        {/* Các nút giữa */}
        {getPaginationGroup().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => changePage(pageNumber)}
            disabled={currentPage === pageNumber}
            className={`md:px-4 px-2 md:py-2 py-1 rounded md:text-base text-xxs ${
              currentPage === pageNumber
                ? "bg-blue-600 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Hiển thị dấu ... nếu chưa đến trang cuối */}
        {currentPage < totalPages - 5 && (
          <span className="px-1 py-1 md:px-2 md:py-2">...</span>
        )}

        {/* Nút chuyển về trang cuối */}
        {currentPage < totalPages && (
          <button
            onClick={() => changePage(totalPages)}
            className="px-2 py-1 bg-gray-300 rounded md:px-4 md:py-2 md:text-base text-xxs hover:bg-gray-400"
          >
            {`>>`}
          </button>
        )}
      </div>
    </div>
  );
};
export default Tracuu;
