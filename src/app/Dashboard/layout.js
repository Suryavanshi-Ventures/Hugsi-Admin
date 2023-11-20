
import Sidebar from "../Components/Sidebar/Sidebar";
import TopHeader from "../Components/top header/top_header";
export const metadata = {
  title: 'Admin - Hugsi',
  description: 'Hugshi Dashboard',
}
export default function RootLayout({ children }) {
    return (

        <div>{children}</div>
//    <> 
//     <div className="flex flex-row min-h-screen bg-[#FFEEB9] max-[992px]:px-4">
// {/*Left Side Bar */}
// <Sidebar />

// {/*Right Main section*/}
// <div className="w-full max-[992px]:rounded-[25px] rounded-l-[25px] z-0 bg-white h-fit m-7">
//   {/*Right TopBar*/}
//   <TopHeader />

//   {/* OTHER CHILDREN WILL LOAD HERE */}

//   <div className="px-6 py-5 md:px-14">{children}</div>
// </div>
// </div>
//    </>
    )
  }





