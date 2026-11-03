import CompanionForm from '@/components/CompanionForm'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export const instant = false;
const Newcompaninon = async () => {

  
  const {userId} = await auth();

  if (!userId) redirect('/sign-in')
  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center"> 
      <article className="w-full gap-4 flex flex-col">

        <h2>
          Companion Builder
        </h2>
        <CompanionForm />
      </article>


    </main>
  )
}

export default Newcompaninon