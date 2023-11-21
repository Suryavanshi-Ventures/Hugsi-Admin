import { Inter } from 'next/font/google'
// import './globals.css'
import Sidebar from '../Components/Sidebar/Sidebar'
import TopHeader from '../Components/top header/top_header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-row min-h-screen    ">
          {/* Left Side Bar */}
          <Sidebar />

          {/* Right Main section */}
          <div className="w-full max-[992px]  rounded-[25px] ml-[250px] rounded-l-[25px]  z-0  h-fit ">
            {/* Right TopBar */}
            <TopHeader />
            <hr />
            {/* OTHER CHILDREN WILL LOAD HERE */}
            <div className="px-6  md:px-14 mt-[15px] ">{children}</div>
            </div>
        </div>
      </body>
    </html>
  )
}