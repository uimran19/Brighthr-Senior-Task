import AbsensesTable from './pages/AbsensesTable'
import Sorting from './components/Sorting'

function App() {

  return (
    <div className='h-screen flex flex-col justify-center gap-10'>
      <div className='grid grid-cols-3 items-center'>
        <h1 className='text-3xl text-center col-start-2'>Absenses</h1>
        <Sorting />
      </div>
      <AbsensesTable />
    </div>
  )
}

export default App
