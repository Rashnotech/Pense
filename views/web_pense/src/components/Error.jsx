import { useLocation } from "react-router-dom";

export default function Error () {
    const navigate = useLocation()
    function reload () {
        window.location = navigate.pathname;
    }
    return (
        <div>
            <div className="container md:w-2/4 my-8 mx-auto p-4">
                <div className="bg-red-500 text-slate-50 border flex flex-col items-center justify-center p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                    </svg>

                    <p className="text-xl font-medium">Something went wrong!</p>
                </div>
                <div className="bg-slate-50 flex flex-col items-center space-y-8 px-4 py-8">
                    <p className="text-xl font-medium">Poor internet connection detected. <br />
                        Please refresh your browser.
                    </p>
                    <button onClick={reload} className="rounded-xl text-xl font-medium w-48 px-4 py-2 bg-red-500 text-slate-50">Retry</button>
                </div>
            </div>
        </div>
    )
}