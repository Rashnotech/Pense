import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

function Sigin () {
    return (
        <>

        </>
    )
}

function Signup ({isOpen, closeModal}) {
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-2xl font-bold leading-6 text-center"
                            >
                            Join Pense
                            </Dialog.Title>
                            <div className="mt-2">
                                
                            </div>

                            <div className="mt-4">
                                <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={closeModal}
                                >
                                Got it, thanks!
                                </button>
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

export default function Form ({isOpen, closeModal}) {
    return (
        <>
            <Signup isOpen={isOpen} closeModal={closeModal}/>
        </>
    )
}