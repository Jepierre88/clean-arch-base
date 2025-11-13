"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { signOut, useClientSession } from "@/src/lib/session-client";

export default function ParkingPage() {
  const router = useRouter();
  const { data: session, isLoading, refresh } = useClientSession();

  const handleSignOut = async () => {
    await signOut();
    await refresh(true);
    router.replace("/auth/login");
  };

  if (isLoading) {
    return <p>Cargando sesión…</p>;
  }

  if (!session) {
    return (
      <section className="space-y-4">
        <p>Sesión no disponible.</p>
        <button
          type="button"
          className="underline text-sm"
          onClick={() => refresh(true)}
        >
          Reintentar
        </button>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Usuario</h2>
        <pre className="bg-muted text-sm p-4 rounded-md overflow-auto">
          {JSON.stringify(session.user, null, 2)}
        </pre>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Tokens</h2>
        <pre className="bg-muted text-sm p-4 rounded-md overflow-auto">
          {JSON.stringify(session.tokens, null, 2)}
        </pre>
      </div>
      <Button onClick={handleSignOut}>Cerrar sesión</Button>
    </section>
  );
}
