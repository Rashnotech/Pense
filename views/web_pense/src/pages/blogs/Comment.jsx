export default function Comments () {
    return (
        <section className="my-4">
            <h2 className="font-semibold text-lg text-gray-700 block my-2">Comments</h2>
            <div>
                <div className="flex flex-row items-center space-x-4">
                    <img src="" alt="" className="rounded-full w-10 h-10" />
                    <div className="leading-tight mb-2">
                        <h4 className="font-semibold text-base">John Doe</h4>
                        <p className="text-gray-700 text-sm font-light">2min read . Today, 12:30pm</p>
                    </div>
                    
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <p className="text-slate-500">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Dolorem eaque eum velit, reiciendis nobis adipisci ipsam ullam fugiat, 
                    nihil eligendi reprehenderit enim vel molestiae animi deserunt totam quis
                    ipsa asperiores.
                </p>
            </div>
            <input type="text"
                name="comment"
                className="border rounded-md px-4 py-2 shadow-sm outline-none w-1/2 my-3 focus:ease-in focus:delay-100"
                placeholder="What are your thoughts?"
                id=""
            />
        </section>
    )
}