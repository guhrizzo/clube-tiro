"use client";

import { useRouter } from "next/navigation";
import EntryGate from "../../components/EntryGate";

export default function Page() {
  const router = useRouter();
  return <EntryGate onEnter={() => router.push("/home")} />;
}
