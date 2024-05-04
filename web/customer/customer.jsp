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
        <title>RENTBIK</title>
    </head>
    <style>
        body{
            font-family: "Montserrat", sans-serif;
        }
    </style>
    <body class="bg-[#f6f6f6] relative">
        <!--navbar-->
        <div class="bg-white w-full h-auto border flex flex-row p-4 pl-10 items-center justify-between ">
            <img src="../asset/logo.png" alt="alt" class="size-1/6"/>
            <div class="flex flex-row w-3/5 items-center justify-between">
                <ul class="flex flex-row items-center justify-between w-5/6 h-full">
                    <li>
                        <a href="customer.jsp" class="font-medium p-4 cursor-pointer bg-blue text-white transition rounded-lg">Khách hàng</a>
                    </li>
                    <li>
                        <a href="../garage/garage.jsp" class="font-medium p-4 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">Quản lý xe</a>
                    </li> 
                    <li>
                        <a href="../repair/repair.jsp" class="font-medium p-4 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">Bảo trì xe</a>
                    </li>
                    <li>
                        <a href="../rent/rent.jsp" class="font-medium p-4 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">Thuê trả</a>
                    </li>
                    <li>
                        <a href="../report/report.jsp" class="font-medium p-4 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">Báo cáo</a>
                    </li>
                </ul>
                <i class="fa-solid fa-user text-2xl p-2 px-3 border rounded-full hover:bg-blue hover:text-white transition cursor-pointer"></i>
            </div>
        </div>
        <!--search and button-->
        <div class="flex flex-col items-center w-full h-auto pt-5 gap-4">
            <div class="flex flex-row justify-between w-11/12 h-12 gap-4">
                <div class="w-11/12 relative flex items-center">
                    <i class="fa-solid fa-magnifying-glass absolute ml-5 text-lg "></i>
                    <input 
                        type="text"
                        placeholder="Tìm kiếm"
                        class=" w-full h-full pl-14 text-lg bg-[#F4EBD9] text-black rounded-lg outline-none placeholder-black"
                        />
                </div>
                <button class="w-28 p-3 cursor-pointer bg-blue text-white rounded-lg">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            <div class="flex flex-row justify-end items-center w-11/12 h-12 gap-4">
                <button class="flex flex-row items-center w-auto h-12 p-3 px-4 cursor-pointer bg-blue text-white rounded-lg" onclick="showAddCustomer()">
                    <i class="fa-solid fa-plus mr-2"></i>
                    <p class="font-normal text-base">Thêm khách hàng</p>
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
                        <th scope="col" class="px-6 py-3">
                            STT
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Họ tên
                                <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg></a>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <div class="flex items-center">
                                Ngày sinh
                                <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg></a>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            CCCD
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Số điện thoại
                        </th>
                        <th scope="col" class="px-6 py-3">
                            GPLX
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Ghi chú
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-bone border-b ">
                        <th scope="row" class="px-6 py-4 font-normal whitespace-nowrap">
                            1
                        </th>
                        <td class="px-6 py-4">
                            Phạm Ngọc Qúi
                        </td>
                        <td class="px-6 py-4">
                            17/08/2003
                        </td>
                        <td class="px-6 py-4">
                            099988881234
                        </td>
                        <td class="px-6 py-4">
                            0912725561
                        </td>
                        <td class="px-6 py-4">
                            B1
                        </td>
                        <td class="px-6 py-4">
                            Qúa đẹp trai
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--            add customer-->
        <div class="w-full h-screen absolute top-0  flex items-center justify-center hidden" id="addCustomer">
            <div class="w-1/3 h-4/5 h-auto bg-white relative z-10 rounded-lg p-5 py-7 shadow-lg shadow-black">
                <div class="flex flex-row justify-between items-center mb-7">
                    <p class="text-xl font-medium">THÊM KHÁCH HÀNG</p>
                    <i class="fa-solid fa-x text-lg font-black cursor-pointer hover:text-[#ff0000]" onclick="showAddCustomer()"></i>
                </div>
                <div class="mb-4">
                    <p class="font-medium mb-1">Họ và tên</p>
                    <input 
                        type="text"
                        placeholder="Họ và tên"
                        class="w-full bg-[#e4e4e4] text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2"
                    />
                </div>
                <div class="mb-4">
                    <p class="font-medium mb-1">Ngày sinh</p>
                    <input 
                        type="date"
                        placeholder="Ngày sinh"
                        class="w-full bg-[#e4e4e4] text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2 pr-2"
                    />
                </div>
                <div class="mb-4">
                    <p class="font-medium mb-1">Số điện thoại</p>
                    <input 
                        type="text"
                        placeholder="Số điện thoại"
                        class="w-full bg-[#e4e4e4] text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2"
                    />
                </div>
                <div class="mb-4">
                    <p class="font-medium mb-1">Giấy phép lái xe</p>
                    <div class="flex flex-row items-center gap-4 h-8">
                        <input 
                            type="text"
                            placeholder="Hạng"
                            class="w-1/2 bg-[#e4e4e4] text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2"
                        />
                        <input 
                            type="text"
                            placeholder="Mã"
                            class="w-1/2 bg-[#e4e4e4] text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2"
                        />
                    </div>

                </div>
                <div class="mb-7">
                    <p class="font-medium mb-1">Ghi chú</p>
                    <input 
                        type="text"
                        class="w-full bg-[#e4e4e4] text-[#7c7c7c] text-base rounded-lg outline-none h-9 indent-2"
                    />
                </div>
                <div class="w-full flex justify-center items-center h-10">
                    <button class="w-1/3 h-full px-4 cursor-pointer bg-blue text-white rounded-lg">
                        <p class="text-lg font-medium">Thêm</p>
                    </button>
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
    <script src="../js/app.js"></script>
</html>
