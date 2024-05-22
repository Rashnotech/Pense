import { useState } from 'react'
import { PutRequest, UploadRequest } from '../../api'
import { useForm } from 'react-hook-form'
import {
    Modal,
    ModalBody, 
    ModalCloseButton,
    ModalContent,
    ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { authUser } from '../../store'
import { AsyncStorage, uploadFile } from '../../util'

export default function Information ({isopen, onclose}) {
    const [userData, setUserData] = useAtom(authUser)
    const [process, setProcess] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const {handleSubmit, register, formState: { errors }} = useForm({
        defaultValues: {
            firstname: userData.firstname,
            lastname: userData.lastname,
            bio: userData.bio
        }
    })

    async function onSubmit (data) {
        setProcess(true)
        const url = `${import.meta.env.VITE_API_URL}/account/${userData.id}`
        console.log(data);
        const res = await PutRequest(url, data)
        if (res.data) {
            setMessage('Profile updated successfully');
            const x_token = Math.floor(Number.EPSILON + Math.random() * 99999)
            AsyncStorage(x_token, res.data)
            setUserData(res.data)
            setTimeout(() => {
                onclose()
            }, 2000);
            setMessage('');
        }
        setError(error.message);
        setProcess(false);
    }

    const fileUploader = async (event) => {
        event.preventDefault();
        const fileElement = document.querySelector('#post_cover');
        fileElement.click();
        const file = await uploadFile({file: '#post_cover', poster:'#profile_img'})
    }

    const uploader = async () => {
        const filename = await uploadFile({file:'#post_cover', poster:'#profile_img'});
        const formData = new FormData();
        const url = `${import.meta.env.VITE_API_URL}/account/${userData.id}`
        formData.append('profile_image', filename);
        const res = await UploadRequest(url, formData);
        console.log(res);
        if (res.success) {
            setMessage(res.success)
            const x_token = Math.floor(Number.EPSILON + Math.random() * 99999)
            AsyncStorage(x_token, res.data)
            setUserData(res.data)
        }
        setTimeout(() => {
            setMessage('')
        }, 2000);
    }
    return (
    <>
        <Modal isOpen={isopen} onClose={onclose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Profile Information</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="my-4 font-manrope w-full px-2">
                        <form onSubmit={handleSubmit(uploader)}>
                            {error && 
                                <div className="flex px-4 py-2 bg-yellow-100 rounded-md text-yellow-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                    </svg>
                                    <p className="text-sm text-amber-600 px-2">{error}</p>
                                </div>
                            }
                            {message && 
                                <div className="flex px-4 py-2 bg-green-50 rounded-md text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                    <p className="text-sm text-green-600 px-2">{message}</p>
                                </div>
                            }
                            <div className='flex items-center space-x-2'>
                                <div className='block w-1/3'>
                                    <label className="text-sm ml-2 font-semibold text-gray-700 block">Photo</label>
                                        <img
                                            onClick={fileUploader}
                                            src={`${import.meta.env.VITE_API_URL}/upload/images/${userData.image[0].filename}`
                                            }
                                            alt={userData.username}
                                            id='profile_img'
                                            className='w-20 h-20 object-cover rounded-full'
                                        />
                                    <input type="file" accept='image/*' onChange={fileUploader} className='hidden' id="post_cover" />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <div className='flex font-medium text-sm space-x-3'>
                                        <button className='text-green-700'>Update</button>
                                        <button onClick={(e) => e.preventDefault() } className='text-pink-700'>Remove</button>
                     
                                    </div>
                                    <p className='text-xs text-gray-400'>Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</p>
                                </div>
                            </div>
                        </form>
                        <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='my-2 block'>
                                <label className="text-sm font-medium text-gray-700">Firstname</label>
                                    <input 
                                        {...register('firstname', {required: true})}
                                        type="text" className="pt-1 text-xs outline-none block w-full sm:text-sm border-b" />
                                        {errors.firstname && (<span className='text-xs block text-pink-600'>This field is required</span>)}
                                    <p className='text-xs text-gray-400'>Appears on your Profile page, as your byline, and in your responses.</p>
                                </div>
                                <div className='my-2 block'>
                                <label className="text-sm font-medium text-gray-700">Lastname</label>
                                    <input 
                                        {...register('lastname', {required: true})}
                                        type="text" className="pt-1 text-xs outline-none block w-full sm:text-sm border-b" />
                                        {errors.lastname && (<span className='text-xs block text-pink-600'>This field is required</span>)}
                                </div>
                                <div className='my-4 block'>
                                    <label className="text-sm font-medium text-gray-700">Bio</label>
                                        <input 
                                            {...register('bio')}
                                            type="bio" className="pt-1 outline-none text-xs block w-full sm:text-sm border-b" />
                                        <p className='text-xs text-gray-400'>Appears on your Profile and next to your stories.</p>
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <button onClick={onclose} className='px-4 py-2 text-sm rounded-full outline-none border border-green-600'>
                                        Cancel
                                    </button>
                                    <button className='px-4 py-2 outline-none disabled:bg-green-400 flex bg-green-500 font-medium text-sm text-slate-50 rounded-full'>
                                        {process && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg> }
                                        <span>Update</span>
                                    </button>
                                </div>
                        </form>
                    </div>                
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
    )   
}
