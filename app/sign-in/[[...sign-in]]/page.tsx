import { SignIn } from '@clerk/nextjs'
import { Suspense } from 'react'

export default function Page() {
  return (

    <main className="flex items-center justify-center">
    <Suspense>
      <SignIn />
    </Suspense>
    </main>
  )
}