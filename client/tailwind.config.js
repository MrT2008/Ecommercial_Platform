/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Định nghĩa file cần Tailwind quét
    theme: {
      extend: {
        colors: {
          primary: "#ffffff", // Ví dụ đặt màu biến tùy chỉnh
          secondary: "#00ff00",
          'main-color': "#000144",
        },
      },
    },
    plugins: [],
  };
  