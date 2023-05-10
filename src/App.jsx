import LandingPage from "./components/LandingPage"
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SummaryPage from "./components/SummaryPage";
import { useState, useEffect, createContext } from 'react'

export const UserContext = createContext();

const App = () => {
  const [urlData, setUrlData] = useState();
  const [showNextPage, setShowNextPage] = useState(JSON.parse(window.localStorage.getItem('showNextPage')) || false)
  const [summaryId, setSummaryId] = useState(JSON.parse(window.localStorage.getItem('summaryId')) || null)



  useEffect(() => {
    window.localStorage.setItem('showNextPage', showNextPage);
    window.localStorage.setItem('summaryId', summaryId);
  }, [showNextPage]);

  useEffect(() => {
    const handleFetch = async () => {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all').then((data) => data.json())
      setUrlData(response)
    }
    handleFetch()
  }, [])

  return (
    <UserContext.Provider value={urlData}>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage setShowNextPage={setShowNextPage} setSummaryId={setSummaryId} />} />
            <Route path='/summary' element={<SummaryPage />}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
