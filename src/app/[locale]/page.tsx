"use client";

import { useRouter, useParams } from "next/navigation";
import EntryGate from "./EntryGate"

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale;

  const handleEnter = () => {
    router.push(`/${locale}/home`);
  };

  return <EntryGate onEnter={handleEnter} />;
}
