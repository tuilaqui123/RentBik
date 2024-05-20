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
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"> </script>
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
                        <a href="../customer/customer.jsp" class="font-medium p-4 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">Khách hàng</a>
                    </li>
                    <li>
                        <a href="../garage/garage.jsp" class="font-medium p-4 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">Quản lý xe</a>
                    </li> 
                    <li>
                        <a href="../repair/repair.jsp" class="font-medium p-4 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">Bảo trì xe</a>
                    </li>
                    <li>
                        <a href="rent.jsp" class="font-medium p-4 cursor-pointer   bg-blue text-white  transition rounded-lg">Thuê trả</a>
                    </li>
                    <li>
                        <a href="../report/report.jsp" class="font-medium p-4 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">Báo cáo</a>
                    </li>
                </ul>
                <i class="fa-solid fa-user text-2xl p-2 px-3 border rounded-full hover:bg-blue hover:text-white transition cursor-pointer"></i>
            </div>
        </div>
        <!--        garage button-->
        <div class="flex flex-col w-full h-auto items-center justify-start pt-5">
            <div class="w-11/12">
                <ul class="flex flex-row items-center justify-between w-1/2 gap-2 py-4 px-2 bg-blue rounded-lg">
                    <li>
                        <a href="rent.jsp" class="font-medium p-3 cursor-pointer  bg-white text-blue  transition rounded-lg">
                            Cho thuê xe
                        </a>
                    </li>
                    <li>
                        <a href="return.jsp" class="font-medium p-3 cursor-pointer text-white  hover:bg-white hover:text-blue transition rounded-lg">
                            Nhận trả xe
                        </a>
                    </li> 
                    <li>
                        <a href="renting-list.jsp" class="font-medium p-3 cursor-pointer text-white hover:bg-white hover:text-blue   transition rounded-lg">
                            Danh sách phiếu thuê/trả
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <!--search repair-->
        <div class="flex flex-col w-full h-auto items-center justify-start pt-5 ">
            <div class="w-11/12">
                <p class="text-xl font-medium">TÌM KHÁCH HÀNG</p>
                <div class="pt-5 flex flex-row gap-10">
                    <div class="w-1/3">
                        <p class="text-base font-medium">SỐ CCCD</p>
                        <div class="flex flex-row items-center mt-1 w-full gap-4">
                            <input 
                                id="cccd"
                                type="text"
                                placeholder="CCCD"
                                class="w-full h-12 text-base bg-[#F4EBD9] text-black rounded-lg outline-none placeholder-black indent-3  "
                                />
                            <button
                                id="btnGetByCCCD"
                                class="flex flex-row items-center w-auto h-12 p-3 px-4 cursor-pointer bg-blue text-white rounded-lg">
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--        customer infomation-->
        <div class="mb-5 flex flex-col w-full h-auto items-center justify-start pt-5 hidden" id="customerInfo">
            <div class="w-11/12 flex flex-row justify-between p-5 border rounded-lg bg-[#F4EBD9] border-black">
                <p>Họ tên: <b id="nameCustomer"></b></p>
                <p>Ngày sinh: <b id="birthdayCustomer"></b></p>
                <p>Số điện thoại: <b id="phoneCustomer"></b></p>
                <p>GPLX: <b id="gplxCustomer"></b></p>
            </div>
            <!--            car renting-->
            <div class="flex flex-col w-full h-auto items-center justify-start pt-10">
                <div class="w-11/12 ">
                    <p class="text-xl font-medium text-center">XE ĐANG THUÊ</p>
                    <div class="relative w-full pt-5 overflow-x-auto flex flex-col items-center justify-center">
                        <table class="w-full text-left rounded-t-lg overflow-hidden font-light ">
                            <thead class="text-base text-white bg-blue h-14 ">
                                <tr>
                                    <th scope="col" class="px-6  py-3">
                                        STT
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Biển số xe
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
                                            Giá tiền thuê
                                            <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                                </svg></a>
                                        </div>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <div class="flex items-center">
                                            Ngày mượn
                                            <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                                </svg></a>
                                        </div>
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <div class="flex items-center">
                                            Ngày trả
                                            <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                                </svg></a>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="tableHiringCar">
                                    
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="w-11/12 mt-5 flex justify-end">
                <button class="flex flex-row items-center w-auto h-12 p-3 px-4 cursor-pointer bg-blue text-white rounded-lg"  onclick="showNewRenting()" >
                    <i class="fa-solid fa-plus mr-2"></i>
                    <p class="font-normal text-base" id="newButton">Lập phiếu thuê xe</p>
                </button>
            </div>
        </div>
        <!--        new renting-->
        <div class=" pt-5 border border-black bg-white hidden" id="newRenting">
            <!--avalable car-->
            <div class="w-11/12">
                    <p class="text-3xl font-bold text-center">PHIẾU THUÊ XE MỚI</p>
            </div>
            <div class="flex flex-col w-full h-auto items-center justify-start pt-10">
                <div class="w-11/12 ">
                    <p class="text-xl font-medium">XE TRONG KHO</p>
                    <!--        search-->
                    <div class="flex flex-col items-center w-full h-auto pt-5 gap-4">
                        <div class="flex flex-row justify-between w-full h-12 gap-4">
                            <div class="w-full relative flex items-center">
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
                    </div>
                    <div class="relative w-full pt-5 overflow-x-auto flex flex-col items-center justify-center">
                        <table class="w-full text-left rounded-t-lg overflow-hidden font-light ">
                            <thead class="text-base text-white bg-blue h-14 ">
                                <tr>
                                    <th scope="col" class="px-6  py-3">
                                        STT
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Biển số xe
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
                                </tr>
                            </thead>
                            <tbody class="bg-white" id="tableCar">

                            </tbody>
                        </table>
                    </div>
                    <p id="selectCar" class="mt-5 font-bold text-lg">XE ĐÃ CHỌN: CHƯA CHỌN XE</p>
                </div>
            </div>
            <!--        bill-->
            <div class="flex flex-col w-full h-auto items-center justify-start pt-10 mb-10">
                <div class="w-11/12 ">
                    <p class="text-xl font-medium">PHIẾU THUÊ XE</p>
                    <div class="bg-[#F4EBD9] p-5 mt-5 rounded-lg">
                        <div class=" flex flex-row gap-10">
                            <div class="w-1/4">
                                <p class="text-base font-medium">Họ tên</p>
                                <input 
                                    id="hoTen"
                                    type="text"
                                    placeholder="Họ tên"
                                    disabled
                                    class="mt-1 w-full h-12 text-base bg-white  text-black rounded-lg outline-none placeholder-black px-3"
                                    />
                            </div>
                            <div class="w-1/4">
                                <p class="text-base font-medium">Ngày sinh</p>
                                <input 
                                    id="ngaySinh"
                                    type="text"
                                    placeholder="17/08/2003"
                                    disabled
                                    class="mt-1 w-full h-12 text-base  bg-white  text-black rounded-lg outline-none placeholder-black px-3"
                                    />
                            </div>
                            <div class="w-1/4">
                                <p class="text-base font-medium">Số điện thoại</p>
                                <input 
                                    id="soDienThoai"
                                    type="text"
                                    placeholder="0912725561"
                                    disabled
                                    class="mt-1 w-full h-12 text-base  bg-white  text-black rounded-lg outline-none placeholder-black px-3"
                                    />
                            </div>
                            <div class="w-1/4">
                                <p class="text-base font-medium">GPLX</p>
                                <input 
                                    id="gplx"
                                    type="text"
                                    placeholder="B1"
                                    disabled
                                    class="mt-1 w-full h-12 text-base  bg-white  text-black rounded-lg outline-none placeholder-black px-3"
                                    />
                            </div>
                        </div>

                        <div class=" flex flex-row gap-10 pt-5">
                            <div class="w-1/3">
                                <p class="text-base font-medium">Biển số xe</p>
                                <input 
                                    id="bienSoXe"
                                    type="text"
                                    placeholder="Biển số xe"
                                    disabled
                                    class="mt-1 w-full h-12 text-base bg-white  text-black rounded-lg outline-none placeholder-black px-3"
                                    />
                            </div>
                            <div class="w-1/3">
                                <p class="text-base font-medium">Loại xe</p>
                                <input 
                                    id="loaiXe"
                                    type="text"
                                    placeholder="Loại xe"
                                    disabled
                                    class="mt-1 w-full h-12 text-base bg-white  text-black rounded-lg outline-none placeholder-black px-3"
                                    />
                            </div>
                            <div class="w-1/3">
                                <p class="text-base font-medium">Dòng xe</p>
                                <input 
                                    id="dongXe"
                                    type="text"
                                    placeholder="Dòng xe"
                                    disabled
                                    class="mt-1 w-full h-12 text-base bg-white  text-black rounded-lg outline-none placeholder-black px-3"
                                    />
                            </div>
                        </div>

                        <div class=" flex flex-row gap-10 pt-5">

                            <div class="w-1/4">
                                <p class="text-base font-medium">Ngày thuê xe</p>
                                <input 
                                    id="ngayThueXe"
                                    type="date"
                                    class="mt-1 w-full h-12 text-base  text-black rounded-lg outline-none placeholder-black px-3"
                                    />
                            </div>
                            <div class="w-1/4">
                                <p class="text-base font-medium">Ngày trả xe</p>
                                <input 
                                    id="ngayTraXe"
                                    type="date"
                                    class="mt-1 w-full h-12 text-base  text-black rounded-lg outline-none placeholder-black px-3"
                                    />
                            </div>
                        </div>
                        <div class="w-full mt-5 flex justify-end">
                            <label class="inline-flex items-center cursor-pointer">
                                <span class="ms-3 text-base font-medium text-black dark:text-gray-300 mr-2">Xuất phiếu thuê xe</span>
                                <input type="checkbox" value="" class="sr-only peer" checked>
                                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:blue rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue"></div>
                            </label>

                        </div>
                        <div class="w-full mt-5 flex justify-center">
                            <button onclick="addRetingCar()" class="h-12 w-1/6 cursor-pointer bg-blue text-white  rounded-lg">
                                <p class="font-medium text-xl">Lưu phiếu</p>
                            </button>
                        </div>
                    </div>
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
    <script src="../js/rent_v6.js"></script>
</html>
