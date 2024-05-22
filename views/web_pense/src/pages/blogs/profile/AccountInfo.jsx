import { Link } from "react-router-dom"
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useAtom } from "jotai"
import { authUser } from "../../store";
import { AlertDialog,
    AlertDialogBody,
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogFooter, AlertDialogContent, Button } from "@chakra-ui/react";
import { DelRequest } from "../../api";


export default function Setprofile () {
    const [userData] = useAtom(authUser);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const handleDelete = async () => {
        const url = `${import.meta.env.VITE_API_URL}/account/${userData.id}`
        const res = await DelRequest(url);
        if (res.success) {
            localStorage.removeItem('Browser_session')
            sessionStorage.removeItem('Browser_session')
        }
        window.location.reload();
    }
    return (
        <main className="space-y-6">
            <div className="flex justify-between w-full">
                <p className="text-sm">Email address</p>
                <Link className='text-sm text-gray-500'>{userData.email}</Link>
            </div>
            <div className="flex justify-between w-full">
                <p className="text-sm">Username and subdomain</p>
                <Link className='text-sm text-gray-500'>{userData.username}</Link>
            </div>
            <div className="flex justify-between items-center w-full">
                <div>
                    <p className="text-sm mb-0">Profile information</p>
                    <small>Edit your photo, name, bio, etc.</small>
                </div>
                <Link className='text-sm text-gray-500'>{userData.firstname}</Link>
            </div>
            <div>
                <button onClick={onOpen} className="text-left">
                    <p className="text-red-700 text-sm mb-0">Delete account</p>
                    <small className="text-gray-600 font-medium">Permanently delete your account and all of your content.</small>
                </button>
            </div>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Account
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' onClick={handleDelete} ml={3}>
                        Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </main>
    )
}

