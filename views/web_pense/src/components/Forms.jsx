import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useState } from 'react'

function Sigin ({isSignin, handleSignin, openModel}) {
    return (
        <>
            <Transition appear show={isSignin} as={Fragment}>
                <Dialog as="div" className="relative z-20 font-sans" onClose={ () => handleSignin() }>
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
                                    <form action="">
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <input type="email" className="px-4 py-3 outline-none mt-1 block w-full shadow-sm sm:text-sm border rounded-lg" placeholder='Enter Email' />
                                        <label className="text-sm font-medium text-gray-700">Password</label>
                                        <input type="password" className="px-4 py-3 outline-none mt-1 block w-full shadow-sm sm:text-sm border rounded-lg" placeholder='Enter Password' />
                                        <p className='font-medium text-blue-400 block text-right text-sm'><a href="">Forget password?</a></p>
                                        <button className='px-6 py-3 bg-blue-500 font-medium text-sm text-slate-50 rounded-full mt-1'>Sign in</button>
    
                                        <p className='block text-sm text-gray-700 mt-2'>
                                            No account?
                                            <button className='text-blue-500 font-medium text-sm' onClick={(event) => {event.preventDefault(); handleSignin(); openModel()} }>&nbsp;Sign up</button>
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

function Signup ({isOpen, closeModal, handleSignin}) {
    return (
    <>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={ () => closeModal() }>
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
                                <form action="">
                                    <label className="text-sm font-medium text-gray-700">First Name</label>
                                    <input type="text" className="px-4 py-3 outline-none mt-1 block w-full shadow-sm sm:text-sm border rounded-lg" placeholder='Enter First Name' />
                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                    <input type="text" className="px-4 py-3 outline-none mt-1 block w-full shadow-sm sm:text-sm border rounded-lg" placeholder='Enter Last name' />
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" className="px-4 py-3 outline-none mt-1 block w-full shadow-sm sm:text-sm border rounded-lg" placeholder='Enter Email' />
                                    <label className="text-sm font-medium text-gray-700">Password</label>
                                    <input type="password" className="px-4 py-3 outline-none mt-1 block w-full shadow-sm sm:text-sm border rounded-lg" placeholder='Enter Password' />
                                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input type="password" className="px-4 py-3 outline-none mt-1 block w-full shadow-sm sm:text-sm border rounded-lg" placeholder='Confirm Password'/>
                                    <button className='px-6 py-3 bg-blue-500 font-medium text-sm text-slate-50 rounded-full mt-1'>Sign up</button>

                                    <p className='block text-sm text-gray-700 mt-2'>Already have an account? <button className='text-blue-500 font-medium text-sm' onClick={(event) => { event.preventDefault(); handleSignin()} }> Sign in</button></p>
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

export default function Form ({isOpen, closeModal, openModel}) {
    const [isSignin, setIsSignin] = useState(false)

    function handleSignin () {
        setIsSignin(prev => !prev)
    }
    return (
        <> 
            <Signup isOpen={isSignin ? !isOpen : isOpen} closeModal={closeModal} handleSignin={handleSignin}/>
            <Sigin isSignin={isSignin} closeModal={closeModal} openModel={openModel} handleSignin={(handleSignin)} />
        </>
    )
}