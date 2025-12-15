import AbsensesTable from './pages/AbsensesTable'
import Sorting from './components/Sorting'
import { useState } from 'react'

function App() {
  const [sortBy, setSortBy] = useState("Start Date");
  const [order, setOrder] = useState(false)

  return (
    <div className='h-screen flex flex-col justify-center gap-10'>
      <div className='grid grid-cols-3 items-center'>
        <h1 className='text-3xl text-center col-start-2'>Absenses</h1>
        <Sorting sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder}/>
      </div>
      <AbsensesTable sortBy={sortBy} order={order}/>
    </div>
  )
}

export default App
