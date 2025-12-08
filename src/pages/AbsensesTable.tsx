import { useGetAbsenses } from "../dataLayer"

export default function AbsensesTable() {

    const {data: absensesList, isLoading, isError} = useGetAbsenses() || [];

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error loading absenses.</div>
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