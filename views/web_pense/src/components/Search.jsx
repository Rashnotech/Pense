import { Tab } from '@headlessui/react'
import { useState } from 'react'

function Search ({handleSearch}) {
    const [search, setSearch] = useState('')

    function handleChange (event) {
        const {value} = event.target
        setSearch(value)
    }
    function handleSubmit (event) {
        event.preventDefault();
        if (event.key === 'Enter') handleSearch(search)
    }
    return (
        <div className="absolute top-[58%] mx-auto w-3/5 md:w-2/5">
            <input
                onChange={handleChange}
                value={search}
                onKeyDown={handleSubmit}
                id='search'
                type="search"
                placeholder="Search all posts..." 
                className="border px-8 outline-none text-sm focus:ring-1 ring-gray-50 focus:font-medium eas py-3 shadow-md rounded-xl w-full"
            />
        </div>
    )
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchDesign ({tabs, func, searchFunc}) {
    return (
        <section className="px-10 w-full font-sans relative">
            <div id='abstract' className="w-full h-[150px] rounded-3xl mt-20 bg-purple-500 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-slate-50">Blog</h1>
                <Search handleSearch={searchFunc} />
            </div>
            <Tab.Group className="w-full md:w-4/5 mx-auto my-8 overflow-y-hidden">
                <Tab.List className="flex flex-row items-center justify-evenly text-sm text-slate-400 font-medium w-full">
                    <Tab onClick={() => func('all')} className= {({ selected }) =>
                        classNames("rounded-full px-4 py-2 text-center",
                        selected
                            ? 'bg-sky-400 text-slate-50 w-1/6 outline-none'
                            : 'bg-inherit text-slate-400' 
                        )}>All</Tab>
                    {tabs.length > 0 && tabs.map(tab => <Tab onClick={() => func(tab.name)} key={tab.id}
                        className= {({ selected }) =>
                        classNames("rounded-full px-4 py-2 text-center",
                        selected
                            ? 'bg-sky-400 text-slate-50 outline-none'
                            : 'bg-inherit text-slate-400' 
                        )}>{tab.name}</Tab>) }
                    
                </Tab.List>
            </Tab.Group>
        </section>
    )
}
