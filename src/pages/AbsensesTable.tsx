import { useEffect, useState } from "react"

export default function AbsensesTable() {

    const [absensesList, setAbsensesList] = useState([])
    const absensesListUrl = 'https://front-end-kata.brighthr.workers.dev/api/absences'
    try {
        useEffect( () => {
            async function fetchAbsenses() {
                const response = await fetch(absensesListUrl)
                const data = await response.json()
                console.log(data)
                setAbsensesList(data)
            }
            fetchAbsenses()
        }, [])
    }
    catch (error) {
        console.error('Error fetching absenses data:', error)
    }

  return (
    <main>
        <table className="border">
                    <thead>
                        <tr>
                            <td>Employee Name</td>
                            <td>Start Date</td>
                            <td>End Date</td>
                            <td>Absense Type</td>
                            <td>Approved/Pending Approval</td>
                        </tr>
                    </thead>
        <tbody>
            {absensesList.map((absense) => {
                const startDate = new Date(absense.startDate)
                const endDate = new Date(absense.startDate)
                endDate.setDate(endDate.getDate() + absense.days)
                return (
                    <tr key={absense.id}>
                        <td>{`${absense.employee.firstName} ${absense.employee.lastName}`}</td>
                        <td>{startDate.toLocaleDateString()}</td>
                        <td>{endDate.toLocaleDateString()}</td>
                        <td>{absense.absenceType}</td>
                        <td>{absense.approved ? "Approved" : "Pending Approval"}</td>
                    </tr>
                )
            })}
        </tbody>
        </table>
    </main>
  )
}