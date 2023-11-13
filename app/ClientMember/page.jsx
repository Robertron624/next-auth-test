"use client";
import {useSession} from 'next-auth/react'
import { redirect } from "next/navigation";


const Member = () => {

  const {data: session, status} = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/api/auth/signin?callbackUrl=/ClientMember")
    }
  })

  return (
    <div>
        <h1>
            Member client Session
        </h1>
        <p>
          {session?.user?.name} ({session?.user?.email})
        </p>
        <p>
          Role: {session?.user?.role}
        </p>
    </div>
  )
}

export default Member