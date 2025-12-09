import { useQuery } from "@tanstack/react-query";

const absensesListUrl =
  "https://front-end-kata.brighthr.workers.dev/api/absences";


export const useGetAbsenses = () => {
    const data = useQuery({
        queryKey: ["absenses"],
        queryFn: fetchAbsenses
    });
  return data;
};

export const useGetAbsenseConflicts = (id: number) => {
    const data = useQuery({
        queryKey: ["absenseConflicts", id],
        queryFn: () => fetchAbsenseConflicts(id)
    });
  return data;
}

const fetchAbsenses = async () => {
  const response = await fetch(absensesListUrl);
  return response.json();
}

const fetchAbsenseConflicts = async (id: number) => {
    const response = await fetch(`https://front-end-kata.brighthr.workers.dev/api/conflict/${id}`)
    return response.json();
}
