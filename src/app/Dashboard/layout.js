import { Inter } from "next/font/google";
// import './globals.css'
import Sidebar from "../Components/Sidebar/Sidebar";
import TopHeader from "../Components/top header/top_header";
import PrivateRoute from "../Components/protected-route/page";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hugsi",
  description: "Hugsi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-row min-h-screen   mx-auto max-w-screen-3xl  ">
          {/* Left Side Bar */}
          <div>
            <Sidebar />
          </div>

          {/* Right Main section */}
          <div className="w-full max-[992px]  rounded-[25px] rounded-l-[25px] bg-white  z-0  h-fit ">
            {/* Right TopBar */}
            <TopHeader />
            {/* OTHER CHILDREN WILL LOAD HERE */}
            <div className="px-6  md:px-14 mt-[15px] bg-white">
              <PrivateRoute>{children}</PrivateRoute>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
