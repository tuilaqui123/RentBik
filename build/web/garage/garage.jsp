<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<!doctype html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <title>RENTBIK</title>
    </head>
    <style>
        body{
            font-family: "Montserrat", sans-serif;
        }
    </style>
    <body class="bg-[#f6f6f6]">
        <!--navbar-->
        <div class="bg-white w-full h-auto border flex flex-row p-4 pl-10 items-center justify-between ">
            <img src="../asset/logo.png" alt="alt" class="size-1/6"/>
            <div class="flex flex-row w-3/5 items-center justify-between">
                <ul class="flex flex-row items-center justify-between w-5/6 h-full">
                    <li>
                        <a href="../customer/customer.jsp" class="font-medium p-4 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">
                            Khách hàng</a>
                    </li>
                    <li>
                        <a href="garage.jsp" class="font-medium p-4 cursor-pointer bg-blue text-white  transition rounded-lg">
                            Quản lý xe</a>
                    </li> 
                    <li>
                        <a href="../repair/repair.jsp" class="font-medium p-4 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">
                            Bảo trì xe</a>
                    </li>
                    <li>
                        <a href="../rent/rent.jsp" class="font-medium p-4 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">
                            Thuê trả</a>
                    </li>
                    <li>
                        <a href="../report/report.jsp" class="font-medium p-4 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">
                            Báo cáo</a>
                    </li>
                </ul>
                <i class="fa-solid fa-user text-2xl p-2 px-3 border rounded-full hover:bg-blue hover:text-white transition cursor-pointer"></i>
            </div>
        </div>
        <!--        garage button-->
        <div class="flex flex-col w-full h-auto items-center justify-start pt-5">
            <div class="w-11/12">
                <ul class="flex flex-row items-center justify-between w-2/5 gap-2 py-4 px-2 bg-blue rounded-lg">
                    <li>
                        <a href="garage.jsp" class="font-medium p-3 cursor-pointer bg-white text-blue  transition rounded-lg">
                            Kho xe</a>
                    </li>
                    <li>
                        <a href="insurance-list.jsp" class="font-medium p-3 cursor-pointer text-white hover:bg-white hover:text-blue transition rounded-lg">
                            Danh sách bảo hiểm</a>
                    </li> 
                    <li>
                        <a href="insurance.jsp" class="font-medium p-3 cursor-pointer text-white  hover:bg-white hover:text-blue transition rounded-lg">
                            Bảo hiểm</a>
                    </li>
                </ul>
            </div>
        </div>
        <!--search and button-->
        <div class="flex flex-col items-center w-full h-auto pt-5 gap-4">
                <div class="flex flex-row justify-between w-11/12 h-12 gap-4">
                    <div class="w-11/12 relative flex items-center">
                        <i class="fa-solid fa-magnifying-glass absolute ml-5 text-lg "></i>
                        <input 
                            id="searchInput"
                            type="text"
                            placeholder="Tìm kiếm"
                            class=" w-full h-full pl-14 text-lg bg-[#F4EBD9] text-black rounded-lg outline-none placeholder-black"
                            />
                    </div>
                    <button id="btnSearch" class="w-28 p-3 cursor-pointer bg-blue text-white rounded-lg">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div class="flex flex-row justify-end items-center w-11/12 h-12 gap-4">
                    <button class="flex flex-row items-center w-auto h-12 p-3 px-4 cursor-pointer bg-blue text-white rounded-lg" onclick="showAddCar()">
                        <i class="fa-solid fa-plus mr-2"></i>
                        <p class="font-normal text-base">Thêm xe</p>
                    </button>
                    <button id="hangXe" class="flex flex-row items-center w-auto h-12 p-3 px-4 cursor-pointer bg-blue text-white rounded-lg" onclick="showAddBrand()">
                        <i class="fa-solid fa-plus mr-2"></i>
                        <p class="font-normal text-base">Thêm hãng xe</p>
                    </button>
                    <button id="dongXe" class="flex flex-row items-center w-auto h-12 p-3 px-4 cursor-pointer bg-blue text-white rounded-lg" onclick="showAddSeries()">
                        <i class="fa-solid fa-plus mr-2"></i>
                        <p class="font-normal text-base">Thêm dòng xe</p>
                    </button>
                    <button class="h-12 w-14 cursor-pointer bg-[#e4e4e4] text-[#7c7c7c] text-xl rounded-lg">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="h-12 w-14 cursor-pointer  bg-[#e4e4e4] text-[#7c7c7c] text-xl rounded-lg">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        <!--table-->
        <div class="relative w-full pt-5 overflow-x-auto flex flex-col items-center justify-center">
                <table class="w-11/12 text-left rounded-t-lg overflow-hidden font-light ">
                    <thead class="text-base text-white bg-blue h-14 ">
                    <tr>
                        <th scope="col" class="px-6  py-3">
                            STT
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Biển số
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Tình trạng
                                <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg></a>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Loại xe
                                <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg></a>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Dòng xe
                                <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg></a>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Giá thuê
                                <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg></a>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Ghi chú
                        </th>
                    </tr>
                </thead>
                <tbody id="tableCar">
                    
                </tbody>
            </table>
        </div>
        <div class="absolute w-full h-auto py-20 top-0 flex items-center justify-center hidden overflow-hidden" id="addCar">
            <div class="absolute w-full h-[200vh] bg-gray-400 opacity-75"></div>
            <div class="z-10 w-1/3 h-4/5 h-auto bg-white relative z-10 rounded-lg px-5 py-7 shadow-lg shadow-black">
                <div class="flex flex-row justify-between items-center mb-7">
                    <p class="text-xl font-medium">THÊM XE</p>
                    <i class="fa-solid fa-x text-lg font-black cursor-pointer hover:text-[#ff0000]" onclick="showAddCar()"></i>
                </div>
                <div class="mb-4">
                    <p class="font-medium mb-1">Biển số xe</p>
                    <input 
                        type="text"
                        placeholder="Biển số xe"
                        class="w-full bg-[#e4e4e4] text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2"
                        id="bienSoXe"
                    />
                </div>
                <div class="mb-4">
                    <p class="font-medium mb-1">Loại xe</p>
                    <select id="selectedType" class="border border-gray-300 rounded-lg h-9 text-black w-full cursor-pointer bg-[#e4e4e4]">
                        
                    </select>
                </div>
                <div class="mb-4">
                    <p class="font-medium mb-1">Tên hãng</p>
                    <select id="selectedBrand" class="border border-gray-300 rounded-lg h-9 text-black w-full cursor-pointer bg-[#e4e4e4]">
                        
                    </select>
                </div>
                <div class="mb-4">
                    <p class="font-medium mb-1">Dòng xe</p>
                    <select id="selectedSeries" class="border border-gray-300 rounded-lg h-9 text-black w-full cursor-pointer bg-[#e4e4e4]">
                        
                    </select>
                </div>
                
                <div class="mb-4">
                    <p class="font-medium mb-1">Giá mua</p>
                    <input 
                        type="text"
                        class="w-full bg-[#e4e4e4] text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2"
                        id="giaMua"
                    />
                </div>
                <div class="mb-4">
                    <p class="font-medium mb-1">Ngày mua</p>
                    <input 
                        type="date"
                        placeholder="Ngày sinh"
                        class="w-full bg-[#e4e4e4] text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2 pr-2"
                        id="ngayMua"
                    />
                </div>
                <div class="mb-4 flex">
                    <div class="mr-2">
                        <p class="font-medium mb-1">Mã bảo hiểm (nếu có)</p>
                        <select id="selectedInsurance" class="border border-gray-300 rounded-lg h-9 text-black w-full cursor-pointer bg-[#e4e4e4]">
                        
                        </select>
                    </div>
                    <div class="w-[50%]">
                        <p class="font-medium mb-1">Ngày hết hạn</p>
                        <input 
                            type="date"
                            disabled
                            class="w-full bg-[#e4e4e4] text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2"
                            id="ngayHetHan"
                        />
                    </div>
                </div>
                <div class="mb-7">
                    <p class="font-medium mb-1">Ghi chú</p>
                    <input 
                        type="text"
                        class="w-full bg-[#e4e4e4] text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2"
                        id="ghiChu"
                    />
                </div>
                <div class="w-full flex justify-center items-center h-10">
                    <button onclick="addCar()" class="w-1/3 h-full px-4 cursor-pointer bg-blue text-white rounded-lg">
                        <p class="text-lg font-medium">Thêm</p>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="w-full h-screen absolute top-0  flex items-center justify-center hidden" id="addBrand">
            <div class="absolute w-full h-[100vh] bg-gray-400 opacity-75"></div>
            <div class="z-10 w-1/3 h-4/5 h-auto bg-white relative z-10 rounded-lg px-5 py-7 shadow-lg shadow-black">
                <div class="flex flex-row justify-between items-center mb-7">
                    <p class="text-xl font-medium">TÊN HÃNG</p>
                    <i class="fa-solid fa-x text-lg font-black cursor-pointer hover:text-[#ff0000]" onclick="showAddBrand()"></i>
                </div>
                <div class="mb-4 flex justify-center items-center">
                    <i id="iconThemTenHang" class="fa-solid fa-plus mr-2 text-lg text-gray-400 cursor-pointer hover:text-[#ff0000]"></i>
                    <input 
                        type="text"
                        placeholder="Thêm tên hãng"
                        class="w-full text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2"
                        id="themTenHang"
                    />
                </div> 
                <div class="mb-4 flex justify-center items-center">
                    <i id="iconTimTenHang" class="fa-solid fa-search mr-2 text-lg text-gray-400 cursor-pointer hover:text-[#ff0000]"></i>
                    <input 
                        type="text"
                        placeholder="Tìm tên hãng"
                        class="w-full text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2"
                        id="timTenHang"
                    />
                </div>
                <div id="listBrand">
                </div>
            </div>
        </div>
        
        <div class="w-full h-screen absolute top-0 flex items-center justify-center hidden" id="addSeries">
            <div class="absolute w-full h-[100vh] bg-gray-400 opacity-75"></div>
            <div class="z-10 w-1/3 h-4/5 h-auto bg-white relative z-10 rounded-lg px-5 py-7 shadow-lg shadow-black">
                <div class="flex flex-row justify-between items-center mb-7">
                    <p class="text-xl font-medium">DÒNG XE</p>
                    <i class="fa-solid fa-x text-lg font-black cursor-pointer hover:text-[#ff0000]" onclick="showAddSeries()"></i>
                </div>
                <div class="mb-4 flex justify-center items-center">
                    <i id="iconThemDongXe" class="fa-solid fa-plus mr-2 text-lg text-gray-400 cursor-pointer hover:text-[#ff0000]"></i>
                    <input 
                        type="text"
                        placeholder="Thêm dòng xe"
                        class="w-full text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2"
                        id="themDongXe"
                    />
                </div> 
                <div class="mb-4 flex justify-center items-center">
                    <i id="iconTimDongXe" class="fa-solid fa-search mr-2 text-lg text-gray-400 cursor-pointer hover:text-[#ff0000]"></i>
                    <input 
                        type="text"
                        placeholder="Tìm tên dòng xe"
                        class="w-full text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2"
                        id="tenDongXe"
                    />
                </div>
                <div id="listSeries">
                </div>
            </div>
        </div>
    </body>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        blue: '#354167',
                        lightblue: '#058ed9',
                        bone: 'f4ebd9',
                        red: 'a4243b',
                        orange: 'bd632f'
                    }
                }
            }
        }
        ;

    </script>
    <script src="../js/garage.js"></script>
</html>
