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
    <main className=" flex flex-col items-center justify-center">
        <table className="border">
                    <thead>
                        <tr className="border-b">
                            <td className="border p-2 text-center">Employee Name</td>
                            <td className="border p-2 text-center">Start Date</td>
                            <td className="border p-2 text-center">End Date</td>
                            <td className="border p-2 text-center">Absense Type</td>
                            <td className="border p-2 text-center">Approved/Pending Approval</td>
                        </tr>
                    </thead>
        <tbody>
            {absensesList.map((absense) => {
                const startDate = new Date(absense.startDate)
                const endDate = new Date(absense.startDate)
                endDate.setDate(endDate.getDate() + absense.days)
                return (
                    <tr className="border-r" key={absense.id}>
                        <td className="border p-2 text-center">{`${absense.employee.firstName} ${absense.employee.lastName}`}</td>
                        <td className="border p-2 text-center">{startDate.toLocaleDateString()}</td>
                        <td className="border p-2 text-center">{endDate.toLocaleDateString()}</td>
                        <td className="border p-2 text-center">{absense.absenceType}</td>
                        <td className="border p-2 text-center">{absense.approved ? "Approved" : "Pending Approval"}</td>
                    </tr>
                )
            })}
        </tbody>
        </table>
    </main>
  )
}