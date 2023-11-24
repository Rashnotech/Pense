import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { NavLink, useLocation, useLoaderData, redirect } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { loginRequest } from '../pages/api';


export default function Login () {   
    const [open, setIsOpen] = useState(false);
    const [error, setError] = useState('');
    const [process, setProcess] = useState(false);
    let location = useLocation();

    useEffect(() => {
        if (location.pathname === '/login' && !open) {
            setIsOpen(true)
        }
    }, [location])

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();

    async function onSubmit (data) {
        setProcess(true);
        const url = 'https://pense-service.onrender.com/api/v1/login'
        try {
            const res = await loginRequest(url, data)
        } catch (err) {
            setError(err.message)
            console.log(err)
        }
        finally {
            setProcess(false);
        }
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
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-center mt-4">
                                    Welcome back.
                                </Dialog.Title>
                                <div className="mt-4 w-full px-2">
                                    {error && 
                                    <div className="flex px-4 py-2 items-center bg-yellow-100 rounded-md text-yellow-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                        </svg>
                                        <p className="text-sm text-amber-600 px-2">{error}</p>
                                    </div>
                                    }
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <input
                                        {...register('email', {required: true})}
                                         type="email" className="px-4 py-3 outline-none mt-1 block w-full shadow-sm sm:text-sm border rounded-lg" placeholder='Enter Email' />
                                        {errors.email && (<span className='text-xs text-pink-700 block'>This field is required</span>)}
                                        <label className="text-sm font-medium text-gray-700">Password</label>
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
                                        <p className='font-medium text-blue-400 block text-right text-sm'><a href="">Forget password?</a></p>
                                        <button disabled={process} className='px-6 py-3 bg-blue-500 font-medium text-sm text-slate-50 rounded-full mt-1'>Sign in</button>
    
                                        <p className='block text-sm text-gray-700 mt-2'>
                                            No account?
                                            <NavLink className='text-blue-500 font-medium text-sm' to='/register' >&nbsp;Sign up</NavLink>
                                        </p>
                                        <hr className='w-4/5 mx-auto my-4' />
                                        <button className='px-4 py-3 border flex items-center justify-center rounded-full outline-none text-sm font-medium w-full space-x-4'><iconify-icon icon="flat-color-icons:google" width="24"></iconify-icon> <span>Sign in Google</span></button>
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

