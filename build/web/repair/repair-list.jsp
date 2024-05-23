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
                        <a href="repair.jsp" class="font-medium p-4 cursor-pointer  bg-blue text-white   transition rounded-lg">Bảo trì xe</a>
                    </li>
                    <li>
                        <a href="../rent/rent.jsp" class="font-medium p-4 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">Thuê trả</a>
                    </li>
                    <li>
                        <a href="../report/report-revenue.jsp" class="font-medium p-4 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">Báo cáo</a>
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
                        <a href="repair.jsp" class="font-medium p-3 cursor-pointer text-white  hover:bg-white hover:text-blue  transition rounded-lg">Bảo trì xe</a>
                    </li>
                    <li>
                        <a href="repair-list.jsp" class="font-medium p-3 cursor-pointer bg-white text-blue transition rounded-lg">Phiếu bảo trì</a>
                    </li> 
                    <li>
                        <a href="pay.jsp" class="font-medium p-3 cursor-pointer text-white hover:bg-white hover:text-blue  transition rounded-lg">Thanh toán</a>
                    </li>
                </ul>
            </div>
        </div>
        <!--        search-->
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
        </div>
        <!--table-->
        <div class="relative w-full pt-5 overflow-x-auto flex flex-col items-center justify-center">
            <table class="w-11/12 text-left rounded-t-lg overflow-hidden font-light ">
                <thead class="text-base text-white bg-blue h-14 ">
                    <tr>
                        <th scope="col" class="px-6  py-3">
                            Mã bảo trì
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Biển số xe
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Ngày bảo trì
                                <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg></a>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Trạng thái
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
                <tbody id="tableMaintenance">

                </tbody>
            </table>
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
    <script src="../js/repair_v3.js"></script>
</html>
