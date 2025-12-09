import { useGetAbsenses } from "../dataLayer"
import { AbsensesRow } from "../components/AbsenseRow"
import { useState } from "react";

export type Absense = {
        id: number;
        startDate: string;
        days: number;
        absenceType: string;
        employee: {
            firstName: string,
            lastName: string,
            id: string
        },
        approved: boolean
}

export default function AbsensesTable() {

    const {data: absensesList, isLoading, isError} = useGetAbsenses() || [];    
    const [selectedEmployeeName, setSelectedEmployeeName] = useState<string | null>(null)


    if (isLoading) {
    return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error loading absenses.</div>
    }

    function handleEmployeeClick(name: string) {
        setSelectedEmployeeName(name);
    }

  return (
    <main className=" flex flex-col items-center justify-center">
        <table className="border">
                    <thead>
                        <tr className="border-b font-semibold">
                            <td className="border p-2 text-center">Employee Name</td>
                            <td className="border p-2 text-center">Start Date</td>
                            <td className="border p-2 text-center">End Date</td>
                            <td className="border p-2 text-center">Absense Type</td>
                            <td className="border p-2 text-center">Approved/Pending Approval</td>
                        </tr>
                    </thead>
        <tbody>
            {absensesList.map( (absense: Absense) => (
                <AbsensesRow absense={absense} key={absense.id} onEmployeeClick={handleEmployeeClick} selectedEmployeeName={selectedEmployeeName} />
            ))}       
        </tbody>
        </table>
    </main>
  )
}