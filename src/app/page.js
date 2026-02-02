"use client";

import { useRouter } from "next/navigation";
import EntryGate from "../../components/EntryGate";

export default function Page() {
  const router = useRouter();

  const locale =
    typeof window !== "undefined"
      ? localStorage.getItem("lang") || "pt"
      : "pt";

  return <EntryGate onEnter={() => router.push(`/${locale}home`)} />;
}
