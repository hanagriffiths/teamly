import { PiSidebarSimpleThin } from "react-icons/pi";
import { teamlyIcon } from "../../assets/images";
import { PiNotePencilThin } from "react-icons/pi";
import { TbCircleLetterTFilled } from "react-icons/tb";

import Filters from "../reusable/Filters";
import { employees } from "../../constants/employees";
import { timeRanges } from "../../constants/timeRanges";
import type { NavBarProps } from "../../types";

const NavBar = ({
    openSidebar,
    setOpenSidebar,
    handleNewChat,
    selectedEmployees,
    setSelectedEmployees,
    selectedTimeRange,
    setSelectedTimeRange,
}: NavBarProps) => {
    const handleSidebar = () => setOpenSidebar(!openSidebar);

    return (
        <>
            {openSidebar ? (
                // Sidebar menu open
                <nav
                    className="p-4 w-60 h-dvh bg-indigo-100 border-r border-purple-950/20 text-purple-950"
                >
                    <div className='w-full flex flex-col gap-2'>
                        {/* header containing icon and close sidebar button */}
                        <div className="w-full flex items-center justify-between p-2 pb-6">
                            <img
                                src={teamlyIcon}
                                className='w-8 aspect-square'
                                alt='Teamly icon'
                            />
                            <button
                                className='hover:cursor-col-resize'
                                onClick={handleSidebar}
                                title='Close sidebar'
                                aria-label='Close sidebar'
                            >
                                <PiSidebarSimpleThin className="text-2xl"/>  
                            </button>
                        </div>

                        {/* create new chat */}
                        <button
                            className='w-full p-2 flex items-center rounded-xl gap-2 text-sm hover:bg-indigo-200 hover:cursor-pointer'
                            title="New chat"
                            aria-label="New chat"
                            onClick={handleNewChat}
                        >
                            <PiNotePencilThin className='text-xl'/>New chat
                        </button>

                        <div className="p-2">
                            <h1 className="text-sm underline underline-offset-2">
                                Insights Filters:
                            </h1>

                            {/* employee selection */}
                            <Filters
                                title="Employees:"
                                allOptionTitle="All Employees"
                                options={employees}
                                selectedOption={selectedEmployees}
                                setSelectedOption={setSelectedEmployees}
                            />

                            {/* time range selection */}
                            <Filters
                                title="Time Ranges:"
                                allOptionTitle="All Time"
                                options={timeRanges}
                                selectedOption={selectedTimeRange}
                                setSelectedOption={setSelectedTimeRange}
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2 text-wrap">
                        <TbCircleLetterTFilled className="text-3xl"/>
                        <span className="text-sm">test@hr-email.co.uk</span>
                    </div>
                </nav>
            ) : (
                // sidebar menu closed
                <nav
                    className="py-4 w-14 h-dvh bg-indigo-100 border-r border-purple-950/20 text-purple-950 hover:cursor-col-resize"
                    onClick={handleSidebar}
                    title='Expand sidebar'
                >
                    <div className='w-full h-full flex flex-col justify-between'>
                        <div className='relative flex items-center flex-col gap-8'>
                            {/* Teamly icon */}
                            <img
                                src={teamlyIcon}
                                className='w-7 aspect-square'
                                alt='Teamly icon'
                            />

                            {/* create new chat */}
                            <button
                                title='New chat'
                                aria-label='New chat'
                                className='hover:cursor-pointer hover:bg-indigo-200 rounded-sm p-1'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNewChat();
                                }}
                            >
                                <PiNotePencilThin className='text-2xl' />
                            </button>
                        </div>

                        {/* user icon (hardcoded T for test during dev) */}
                        <button
                            className='relative flex justify-center text-purple-950 hover:cursor-pointer'
                            aria-label='User'
                        >
                            <TbCircleLetterTFilled className='text-3xl'/>
                        </button>
                    </div>
                </nav>
            )}
        </>
    )
};

export default NavBar;
