import { Button } from "@/components/ui/button";

import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <h4>Himanshu Gupta</h4>
      <Button> <Link href={"/dashboard"}>Subscribe</Link></Button>
    </div>
  );
} 