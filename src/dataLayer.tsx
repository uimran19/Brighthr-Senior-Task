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

const fetchAbsenses = async () => {
  const response = await fetch(absensesListUrl);
  return response.json();
}
