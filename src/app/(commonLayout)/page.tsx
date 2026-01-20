import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default async function Home() {
  const session = await authClient.getSession(); // --- IGNORE ---
  console.log(session);
  
  return (
    <div>
      <Button variant="outline">Click me</Button>
    </div>
  );
}
