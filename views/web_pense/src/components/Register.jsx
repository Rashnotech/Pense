import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useLocation, NavLink, useNavigate } from 'react-router-dom'
import { registerRequest } from '../pages/api'
import { useForm } from 'react-hook-form'

export default function Register () {
    const navigate = useNavigate();
    const [open, setIsOpen] = useState(false)
    const [process, setProcess] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    let location = useLocation()
    useEffect(() => {
        if (location.pathname === '/register' && !open) {
            setIsOpen(true)
        }
    }, [location])

    const {handleSubmit, register, watch, formState: { errors }} = useForm()
    const pwd = watch('password')
    const conf_pwd = watch('confirm')

    async function onSubmit (data) {
        setProcess(true)
        try {
            const url = 'https://pense.pythonanywhere.com/api/v1/signup'
            const res = await registerRequest(url, data)
            if (res) {
                setMessage('Account created successfully, redirecting...')
                setTimeout(() => {
                    navigate("/login");
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
                            <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-center mt-4">
                                Join Pense
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
                                    <label className="text-sm font-medium text-gray-700">First Name</label>
                                    <input 
                                     {...register('firstname', {required: true})} type="text" className="px-4 py-3 outline-none mt-1 block w-full shadow-sm sm:text-sm border rounded-lg" placeholder='Enter First Name' />
                                    {errors.firstname && (<span className='text-xs block text-pink-600'>This field is required</span>)}
                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                    <input 
                                    {...register('lastname', {required: true})}
                                    type="text" className="px-4 py-3 outline-none mt-1 block w-full shadow-sm sm:text-sm border rounded-lg" placeholder='Enter Last name' />
                                    {errors.lastname && (<span className='text-xs block text-pink-600'>This field is required</span>)}
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <input 
                                    {...register('email', {required: true})}
                                    type="email" className="px-4 py-3 outline-none mt-1 block w-full shadow-sm sm:text-sm border rounded-lg" placeholder='Enter Email' />
                                    {errors.email && (<span className='text-xs block text-pink-600'>This field is required</span>)}
                                    <label className="text-sm font-medium text-gray-700">Password</label>
                                    <input {...register('password', {
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
                                    {errors.password && (<span className='text-xs block text-pink-600'>{errors.password.message}</span>)}
                                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input {...register('confirm', {required: true})}
                                    type="password" className="px-4 py-3 outline-none mt-1 block w-full shadow-sm sm:text-sm border rounded-lg" placeholder='Confirm Password'/>
                                    {pwd !== conf_pwd && (<span className='text-xs text-pink-600 block'>Password doesn't match</span>)}
                                    <button disabled={process} className='px-6 py-3 flex space-x-3 items-center bg-blue-500 font-medium text-sm text-slate-50 rounded-full mt-1'>
                                           {process && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg> }
                                            <span>Sign up</span>
                                    </button>
                                    <p className='block text-sm text-gray-700 mt-2'>Already have an account? <NavLink to='/login' className='text-blue-500 font-medium text-sm' > Sign in</NavLink></p>
                                    <p className='mt-4 block text-center text-slate-500 text-xs'>Click “Sign up” to agree to Pense’s Terms of Service and acknowledge that Pense’s Privacy Policy applies to you.</p>
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
