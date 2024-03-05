import { getMe } from "@/apis/users";
import { useQuery } from "@tanstack/react-query";

export default function useGetMeQuery() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });
}
