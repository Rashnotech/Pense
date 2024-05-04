import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import Comments from "./Comment";
import {marked} from 'marked'
import { useToast } from '@chakra-ui/react'

export default function PostDetails () {
    const toast = useToast();
    const {name, title } = useParams()
    const [post, setPost] = useState([])
    const [show, setShow] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async (name, title) => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/read/${name}/${title}`);
                const data = await response.json();
                setPost(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors as needed
            }
        };
        fetchData(name, title);
    }, []);
    
    function shareLink () {
        const url = window.location.href
        navigator.clipboard.writeText(url);
        toast({
            description: 'Link copied to clipboard.',
            status: 'info',
            position: 'top',
            duration: 5000,
            isClosable: true,
        });
    }

    function speechSynthesis(event, text) {
        event.preventDefault();
        const synth = window.speechSynthesis;
        setPlaying(!playing);
        if (playing && synth.speaking) {
                synth.pause();
            } else {
                synth.resume();
            }
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.voice = synth.getVoices().find(voice => voice.lang === 'en-US');
            // Event listener for tracking the progress of speech
            
            utterance.onstart = function () {
                document.querySelectorAll('#readpost').forEach(el => el.style.display = 'block');
                document.querySelectorAll('#post').forEach(el => el.style.display = 'none');
            }

            utterance.onpause = function () {
                document.querySelectorAll('#readpost').forEach(el => el.style.display = 'block');
                document.querySelectorAll('#post').forEach(el => el.style.display = 'none');
            }

            utterance.onend = function () {
                document.querySelectorAll('#readpost').forEach(el => el.style.display = 'none');
                document.querySelectorAll('#post').forEach(el => el.style.display = 'block');
            }

            utterance.onboundary = function (event) {
                document.querySelectorAll('.text-yellow-600').forEach(el => el.classList.remove('text-yellow-600'));

                // Highlight the character being spoken
                let charIndex = event.charIndex;
                let highlightedText = text.substring(0, charIndex);
                let remainingText = text.substring(charIndex);
                let highlightedLines = highlightedText.split(/\r?\n/);
                let remainingLines = remainingText.split(/\r?\n/);

                // Apply the highlight class to the current character
                document.querySelectorAll('#post').forEach(el => el.style.display = 'none');
                    // Apply the highlight class to the current character and lines
                document.querySelector('#readpost').innerHTML =
                    `<span class="text-yellow-600">${highlightedLines.map(line => `${line}<br>`).join('')}</span>${remainingLines.map(line => `<br>${line}`).join('')}`;
            };
        // Start the speech synthesis
        synth.speak(utterance);
    }
    return (
        <section className="px-4 md:container-lg mx-auto mt-28 md:mt-20">
         {post.map(tips => <article key={tips.id} className={loading ? 'animate-pulse px-10' :'px-10 font-sans flex flex-col items-center justify-between'}>
                <div className='px-4 container-lg mx-auto'>
                    <h2 className="text-4xl font-bold my-4">{tips.title}</h2>
                    <div className="flex flex-row">
                        <div className="flex flex-row items-center space-x-3">
                            <img src="" alt="" className="w-10 h-10 rounded-full block border object-fill" />
                            <div className="flex flex-col items-start">
                                <div className='flex items-baseline space-x-2'>
                                    <h3 className="font-semibold text-base">{`${tips.user.firstname} ${tips.user.lastname}`}</h3>
                                    <p className="text-green-500 hover:text-green-600 text-sm">Follow</p>
                                </div>
                                <p className="text-gray-700 text-sm">{`${tips.read_time} min read. 
                                        ${new Date(tips.updated_at).toDateString()}
                                `}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 mb-6 flex border border-r-0 border-l-0 items-center w-full">
                        <ul className='text-slate-400 flex items-center space-x-6'>
                            <li>
                                <button className='flex items-center'>
                                    <iconify-icon icon="pepicons-pencil:hands-clapping" width="30"></iconify-icon>
                                    1.1k
                                </button>
                            </li>
                            <li>
                                <button className='flex items-center' onClick={() => setShow(true)}>
                                    <iconify-icon icon="iconamoon:comment-thin" width="30"></iconify-icon>
                                </button>
                            </li>
                        </ul>
                        <ul className   ="flex items-center justify-end py-2 w-full text-slate-400 space-x-4">
                            <li>
                                <button>
                                    <iconify-icon icon="material-symbols-light:bookmark-add-outline-rounded" width="30"></iconify-icon>
                                </button>
                            </li>
                            <li onClick={(event) => speechSynthesis(event, tips.content)}>
                               {playing ? <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                : <button>
                                    <iconify-icon icon="ph:play-circle-thin" width="30"></iconify-icon>
                                </button> }
                            </li>
                            <li>
                                <button onClick={shareLink}>
                                    <iconify-icon icon="system-uicons:share" width="28"></iconify-icon>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <main className="py-6 px-4">
                        <div className="max-w-4xl mx-auto grid grid-cols-1">
                            <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0">
                                <h1 className="mt-1 text-lg font-semibold text-white md:text-2xl dark:sm:text-white">{tips.title}</h1>
                                <p className="text-sm leading-4 font-medium text-white dark:sm:text-slate-400">{`${tips.user.firstname} ${tips.user.lastname}`}</p>
                            </div>
                            <div className="grid gap-4 col-start-1 col-end-3 row-start-1">
                                <img src={`${import.meta.env.VITE_API_URL}/upload/images/${tips.post_cover}`} alt="" className="w-full h-60 object-cover rounded-lg" loading="lazy" />
                            </div>
                            <dl className="mt-4 text-xs font-medium flex items-center row-start-2">
                            <dt className="sr-only">Categories</dt>
                            {tips.categories.map(cat => <dd key={cat.id} className="text-blue-600 mr-2 flex items-center dark:text-indigo-400">{cat.name}</dd>)}
                            </dl>
                            <p id='readpost' className='text-base leading-6 col-start-1'></p>
                            {tips.content.split(/\r?\n/).map((line, index) => (
                            <p id='post' key={index} className="text-base leading-6 col-start-1" 
                            dangerouslySetInnerHTML={{ __html: marked(line) }}
                            />
                            ))} 
                        </div>
                        <Comments show={show} post_id={tips.id} />
                    </main>

                   <div className="space-y-6">
                        
                    </div> 
                </div>
            </article>)}
        </section>
    )
}
