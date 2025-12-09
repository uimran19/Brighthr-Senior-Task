import { useGetAbsenseConflicts } from "../dataLayer";
import type { FC } from 'react';
import type { Absense } from "../pages/AbsensesTable";

export const AbsensesRow: FC<{absense: Absense, onEmployeeClick: (name: string) => void, selectedEmployeeName: string | null}> = ({absense, onEmployeeClick, selectedEmployeeName}) => {

    const {data: conflicts, isPending} = useGetAbsenseConflicts(absense.id);
    if (isPending) {
        return <tr><td colSpan={5} className="border p-2 text-center">Loading...</td></tr>
    }
    
    const startDate = new Date(absense.startDate)
    const endDate = new Date(absense.startDate)
    endDate.setDate(endDate.getDate() + absense.days)
    
    return (        
    <tr className={`${selectedEmployeeName === `${absense.employee.firstName} ${absense.employee.lastName}` ? "bg-yellow-200" : ""} ${conflicts.conflicts ? "bg-red-200" : ""} border-r`}>
        <td className="border p-2 text-center"><button onClick={() => onEmployeeClick(`${absense.employee.firstName} ${absense.employee.lastName}`)}>{`${absense.employee.firstName} ${absense.employee.lastName}`}</button></td>
        <td className="border p-2 text-center">{startDate.toLocaleDateString()}</td>
        <td className="border p-2 text-center">{endDate.toLocaleDateString()}</td>
        <td className="border p-2 text-center">{absense.absenceType}</td>
        <td className="border p-2 text-center">{absense.approved ? "Approved" : "Pending Approval"}</td>
    </tr>
    )
}