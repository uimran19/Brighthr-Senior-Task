import AbsensesTable from './pages/AbsensesTable'

function App() {

  return (
    <div className='h-screen flex flex-col justify-center gap-10'>
      <div className='grid grid-cols-3 items-center'>
        <h1 className='text-3xl text-center col-start-2'>Absenses</h1>
      </div>
      <AbsensesTable />
    </div>
  )
}

export default App
