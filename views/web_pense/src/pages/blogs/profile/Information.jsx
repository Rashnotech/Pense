import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { registerRequest } from '../../api'
import { useForm } from 'react-hook-form'

export default function Information () {
    const [open, setIsOpen] = useState(false)
    const [process, setProcess] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    let location = useLocation()
    useEffect(() => {
        if (location.pathname.includes('account')) {
            setIsOpen(true)
        }
    }, [location])
    const {handleSubmit, register, formState: { errors }} = useForm()

    async function onSubmit (data) {
        setProcess(true)
        try {
            const url = `${import.meta.env.VITE_API_URL}/update`
            const res = await registerRequest(url ,data)
            if (res) {
                setMessage('Account created successfully, redirecting...')
                setTimeout(() => {
                    window.location = "/login";
                }, 5000);
            }
        } catch (error) {
            setError(error.message)
        }
        finally {
            setProcess(false)
        }
    }
    return (
    <>
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={() => setIsOpen(false) }>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title as="h3" className="text-2xl font-extrabold leading-6 mt-4">
                                Profile Information
                            </Dialog.Title>
                            <div className="mt-4 w-full px-2">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {error && 
                                    <div className="flex px-4 py-2 items-center bg-yellow-100 rounded-md text-yellow-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                        </svg>
                                        <p className="text-sm text-amber-600 px-2">{error}</p>
                                    </div>
                                    }
                                    {message && 
                                    <div className="flex px-4 py-2 items-center bg-green-50 rounded-md text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                        <p className="text-sm text-green-600 px-2">{message}</p>
                                    </div>
                                    }
                                    <div className='my-6 flex items-center space-x-2'>
                                        <div className='block w-1/3'>
                                            <label className="text-sm font-medium text-gray-700 block">Photo</label>
                                                <img src="" alt="" className='w-20 h-20 border rounded-full' />
                                            <input type="file" className='hidden' name="" id="" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <div className='flex font-medium text-sm space-x-3'>
                                                <button className='text-green-700'>Update</button>
                                                <button className='text-pink-700'>Remove</button>
                                            </div>
                                            <p className='text-xs text-gray-400'>Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</p>
                                        </div>
                                    </div>
                                    <div className='my-6 block'>
                                        <label className="text-sm font-medium text-gray-700">Name*</label>
                                        <input 
                                            {...register('firstname', {required: true})}
                                            type="text" value='Abdulrasheed' className="pt-3 outline-none block w-full sm:text-sm border-b" />
                                            {errors.firstname && (<span className='text-xs block text-pink-600'>This field is required</span>)}
                                        <p className='text-xs text-gray-400'>Appears on your Profile page, as your byline, and in your responses.</p>
                                    </div>
                                    <div className='my-6 block'>
                                        <label className="text-sm font-medium text-gray-700">Bio</label>
                                        <input 
                                        {...register('bio')}
                                        type="bio" className="pt-3 outline-none block w-full sm:text-sm border-b" />
                                        <p className='text-xs text-gray-400'>Appears on your Profile and next to your stories.</p>
                                    </div>
                                    <div className='flex items-center space-x-4'>
                                        <button className='px-4 py-2 text-sm rounded-full outline-none border border-green-600'>
                                            Cancel
                                        </button>
                                        <button disabled className='px-4 py-2 outline-none disabled:bg-green-400 flex space-x-3 items-center bg-green-500 font-medium text-sm text-slate-50 rounded-full'>
                                            {process && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg> }
                                                <span>Sign up</span>
                                        </button>
                                    </div>
                                </form>
                            </div>                            
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
            </div>
            </Dialog>
        </Transition>
    </>
    )   
}
