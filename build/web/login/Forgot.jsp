<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<!doctype html>
<html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="preconnect" href="https://fonts.googleapis.com">
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
         <div class="flex w-100 h-screen bg-[url('../asset/Background.png')] bg-cover">
            <div class="w-4/5 h-full flex justify-center items-center">
                <img 
                    src="../asset/bg.png"
                    class="w-full"
                />
            </div>
            <div class="w-2/5 h-full flex-col flex justify-center">
                <div class="w-3/4 h-3/5 flex flex-col justify-between">
                    <h1 class="font-extrabold text-4xl w-full text-blue">Quên mật khẩu</h1>
                    <div class="flex flex-col">
                        <div class="flex flex-col mb-5">
                            <p class="font-semibold text-sm mb-1">Nhập mã PIN</p>
                            <input 
                                type="text"
                                placeholder="Mã PIN"
                                class="border border-gray-500 h-11 rounded-md outline-none indent-2 font-normal"
                            />
                        </div>
                         <div class="flex flex-col mb-5">
                            <p class="font-semibold text-sm mb-1">Nhập mật khẩu mới</p>
                            <input 
                                type="password"
                                placeholder="Nhập mật khẩu mới"
                                class="border border-gray-500 h-11 rounded-md outline-none indent-2 font-normal"
                            />
                        </div>
                    </div>
                    <button class="w-full h-11 rounded-md outline-none bg-blue">
                        <p class="text-white text-lg font-semibold">Đổi mật khẩu</p>
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
  </script>
</html>
