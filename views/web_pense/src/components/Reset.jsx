import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { PutRequest } from '../pages/api';


export default function Reset () {
    const navigate = useNavigate();
    const [open, setIsOpen] = useState(false);
    const [error, setError] = useState('');
    const [process, setProcess] = useState(false);
    const [message, setMessage] = useState('')
    let location = useLocation();
    const email = location.search.split('=')[1];

    useEffect(() => {
        if (location.pathname.includes('resets') && !open) {
            setIsOpen(true)
        }
    }, [location])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm();
    const pwd = watch('password')
    const conf_pwd = watch('confirm')

    async function onSubmit (data) {
        setProcess(true);
        const url = `${import.meta.env.VITE_API_URL}/reset`
        const res = await PutRequest(url, data)
        if (res.data) {
            setError('')
            setMessage('Password changed successfully')
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        }
        setError(res.message)
        setProcess(false);
    }
    return (
        <>
            <Transition appear show={open} as={Fragment}>
                <Dialog as="div" className="relative z-20 font-sans" onClose={ () => setIsOpen(false) }>
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
                                <Dialog.Panel className="w-full mt-20 max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-center mt-4">
                                    Reset Password
                                </Dialog.Title>
                                <div className="mt-4 w-full px-2">
                                    {error && 
                                    <div className="flex px-4 py-2 space-x-4 bg-yellow-100 rounded-md text-yellow-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                        </svg>
                                        <p className="text-sm text-amber-600 px-4">{error}</p>
                                    </div>
                                    }
                                    {message ? 
                                    <div className="flex px-4 py-2 space-x-4 rounded-md text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                        </svg>
                                        <p className="text-sm text-green-600 px-4">{message}</p>
                                    </div>
                                    :
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <label className="text-sm font-medium text-gray-700">Change password</label>
                                        <input
                                            {...register("password", {
                                            required: true,
                                            minLength: {
                                              value: 8,
                                              message: "Must be atleast 8 characters",
                                            },
                                            validate: (v) =>
                                              [/[a-z]/, /[A-Z]/, /[^a-zA-Z0-9]/].every((pattern) =>
                                                pattern.test(v)
                                              ) ||
                                              "Must include upper, lower, number and special character",
                                          })}
                                        type="password" className="px-4 py-3 outline-none mt-1 block w-full shadow-sm sm:text-sm border rounded-lg" placeholder='Enter Password' />
                                        {errors.password && (<span className='text-xs text-pink-700'>{errors.password.message}</span>)}
                                        <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                        <input {...register('confirm', {required: true})}
                                            type="password" className="px-4 py-3 outline-none mt-1 block w-full shadow-sm sm:text-sm border rounded-lg" placeholder='Confirm Password'/>
                                            {pwd !== conf_pwd && (<span className='text-xs text-pink-600 block'>Password doesn't match</span>)}
                                        <input type="hidden" {...register('email')} name="email" value={email} />
                                        <button disabled={process} className='flex items-center space-x-3 px-6 py-3 bg-blue-500 font-medium text-sm text-slate-50 rounded-full mt-1'>
                                           {process && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg> }
                                            <span>Reset password</span> 
                                        </button>
                                    </form>}
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