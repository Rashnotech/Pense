import { Tab } from '@headlessui/react'
function Search () {
    return (
        <div className="absolute top-1/3 mx-auto w-3/5 md:w-2/5">
            <input
                id='search'
                type="search"
                placeholder="Search" 
                className="border px-8 outline-none text-sm focus:ring-1 focus:font-medium eas py-3 shadow-md rounded-xl w-full"
            />
        </div>
    )
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchDesign () {
    return (
        <section className="px-10 font-sans">
            <div id='abstract' className="w-full h-[150px] rounded-3xl mt-20 bg-purple-500 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-slate-50">Blog</h1>
                <Search />
            </div>
            <Tab.Group className="w-full md:w-2/3 mx-auto my-8">
                <Tab.List className="flex flex-row items-center justify-evenly text-sm text-slate-400 font-medium">
                    <Tab className= {({ selected }) =>
                        classNames("rounded-full px-4 py-2 text-center",
                        selected
                            ? 'bg-sky-400 text-slate-50 w-1/6 outline-none'
                            : 'bg-inherit text-slate-400' 
                        )}>All</Tab>
                    <Tab>NFT</Tab>
                    <Tab>Technology</Tab>
                    <Tab>NFT</Tab>
                    <Tab>Technology</Tab>
                </Tab.List>
            </Tab.Group>
        </section>
    )
}
