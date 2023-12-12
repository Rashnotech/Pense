import mypic from '../assets/mypic.png'
import about from '../assets/7idt9imh.png'
import { Link } from 'react-router-dom'
export default function Aboutus () {
    return (
        <>
            <section className="container my-24 text-gray-700 mx-auto">
                <div className='flex items-center space-x-4'>
                    <div className='w-1/2'>
                        <h1 className="text-lg capitalize font-bold my-2">UNVEILING APP</h1>
                        <h1 className="text-8xl font-bold my-2">PENSE</h1>
                        <p className='text-justify'>(French word for "to think", pronounced /pens/, like "pens") is a blog app 
                            built aims to provide a faster and leaner content writing experience for modern topics.
                        </p>
                        <p className='text-justify'>Pense (blog app) is intended to solve the problem of providing individuals and organisations
                            with a platform to create, publish, and manage their written content in an organised and 
                            user-friendly manner. The project aims to simplify the process of content creation,
                            publication, and engagement, making it easier for users to reach their target audience.
                        </p>
                    </div>
                    <img className='w-1/2 object-contain' src={about} alt="" />
                </div>
                <div className="w-full mt-4">
                    <h1 className="text-5xl font-bold text-center">Our Team</h1>
                    <p className="text-center text-sm">
                        We are a team of developers who are passionate about building 
                        products that solve problems and make life easier.
                    </p>
                    <div className="flex items-center justify-between mt-8 p-4">
                        <div className='w-2/5'>
                            <img src={mypic} className='object-contain rounded-full' alt="" />
                            <div className='p-4 text-center font-semibold rounded-lg border'>
                                <p className='text-lg'>Abdulrasheed Aliyu</p>
                                <p className='text-sm italic'>Fullstack engineer</p>
                            </div>
                        </div>
                        <div className='w-1/2'>
                            <p>
                                Hey, I'm Abdulrasheed Aliyu also known as Rashnotech. <br />
                                I am a dedicated full-stack software engineer enrolled in the 
                                ALX Software Engineering program, where I am honing my skills and
                                knowledge in the field. My fervor for AI/ML technologies is evident,
                                as I am deeply passionate about leveraging these advancements to provide innovative
                                solutions to complex problems.
                                My experience in the field enables me to effectively bridge the gap between conceptual
                                ideas and their practical implementation using cutting-edge technologies. I am committed to 
                                staying at the forefront of the industry, consistently seeking opportunities to contribute 
                                to advancements in both AI/ML and software engineering. <br />
                                <strong>For further communication or collaboration, please feel free to reach out to me below.</strong>
                            </p>
                            <ul className='flex items-center space-x-4'>
                                <li><Link to='https://www.linkedin.com/in/abdulrashnotech/'><iconify-icon icon="logos:linkedin" width='60'></iconify-icon></Link></li>
                                <li><Link to='https://github.com/Rashnotech'><iconify-icon icon="devicon:github" width='30'></iconify-icon></Link></li>
                                <li><Link to='https://twitter.com/@rashnotech'><iconify-icon icon="skill-icons:twitter" width='30'></iconify-icon></Link></li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    )
}