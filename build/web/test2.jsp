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
    <body>
        <div class="w-full h-auto border flex flex-row p-5 pl-10 items-center justify-between ">
            <img src="asset/logo.png" alt="alt" class="size-1/6"/>
            <div class="flex flex-row w-3/5 items-center justify-between">
                <ul class="flex flex-row items-center justify-between w-3/4 h-full">
                    <li class="p-3 cursor-pointer bg-blue text-white transition rounded-lg">
                        <p class="font-medium">Khách hàng</p>
                    </li>
                    <li class="p-3 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">
                        <p class="font-medium">Quản lý xe</p>
                    </li>
                    <li class="p-3 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">
                        <p class="font-medium">Bảo trì xe</p>
                    </li>
                    <li class="p-3 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">
                        <p class="font-medium">Thuê trả</p>
                    </li>
                    <li class="p-3 cursor-pointer hover:bg-blue hover:text-white transition rounded-lg">
                        <p class="font-medium">Báo cáo</p>
                    </li>
                </ul>
                <i class="fa-solid fa-user text-2xl p-2 px-3 border rounded-full hover:bg-blue hover:text-white transition cursor-pointer"></i>
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
    </script>
</html>
