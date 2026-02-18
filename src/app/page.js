"use client";

import { useRouter } from "next/navigation";
import EntryGate from "../../components/EntryGate";

export default function Page() {
  const router = useRouter();

  const handleEnter = () => {
    const locale = localStorage.getItem("lang") || "pt";
    router.push(`/${locale}/home`);
  };

  return <EntryGate onEnter={handleEnter} />;
}
