import React, { useContext } from 'react'
import { UserContext } from '../App'

const SummaryPage = () => {

    const urlData = useContext(UserContext)

    const ID = JSON.parse(window.localStorage.getItem('summaryId'));

    const handleLocalStorage = () => {
        window.localStorage.setItem('showNextPage', false)
        window.localStorage.setItem('summaryId', null)
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='flex justify-start flex-col md:w-[80vw] w-[90vw] bg-[#333] rounded-2xl'>
                <div className="flex flex-col justify-between">
                    {
                        urlData &&
                        urlData.filter((temp) => temp.show.id === parseInt(ID)).map((item) => {
                            console.log('here it is->', item)
                            return (
                                <div className='flex md:flex-row flex-col md:items-start sm:items-center' key={item.show.id}>
                                    <div key={item.show.id} className="max-w-sm flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 md:m-5 sm:my-3">
                                        <img className="rounded-t-lg sm:object-contain" src={item.show.image?.original} alt="poster" />
                                        <div className="p-5">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.show.name}</h5>
                                        </div>
                                        <a href="../" onClick={() => handleLocalStorage()} className="mb-5 md:mx-8 mx-2 inline-flex justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Checkout More
                                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </a>
                                    </div>
                                    <div className="flex justify-start m-2 md:m-10 flex-col w-full">
                                        <ul className='text-white dark:text-white flex flex-col items-center md:items-start'>
                                            <li>Release: {item.show.premiered}</li>
                                            <li>Runtime: {item.show.averageRuntime} min</li>
                                            <li>Language: {item.show.language}</li>
                                            <li>Rating: {item.show.rating?.average?.NA}</li>
                                            <li>Genres:
                                                {item.show.genres.map((i, idx) => <span key={idx} className='mx-1'>{i}</span>)}
                                            </li>
                                        </ul>
                                        <div className="flex flex-col justify-center text-white items-center mt-10">
                                            <h2 className='mb-5 text-2xl'>Summary</h2>
                                            <div className='md:p-0 p-5' dangerouslySetInnerHTML={{__html: `${item.show.summary}`}}  />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SummaryPage