import SettingLayout from "@/components/SettingLayout";
import { useOutletContext } from "react-router-dom";

export default function Component() {
  const context = useOutletContext();
  return <SettingLayout />;
}
