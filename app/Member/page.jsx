import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/dist/server/api-utils'

const Member = async () => {

  const session = await getServerSession(options)

  if (!session || !session.user) {
    redirect('/api/auth/signin?callbackUrl=/Member')
  }

  return (
    <div>
        <h1>
            Member Server Session
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