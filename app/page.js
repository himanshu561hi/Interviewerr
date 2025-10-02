import { Button } from "@/components/ui/button";

import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <Button> <Link href={"/dashboard"}>Click Here</Link></Button>
    </div>
  );
} 
