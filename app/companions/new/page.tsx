import CompanionForm from '@/components/CompanionForm'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { newCompanionPermissions } from '@/lib/actions/companion.action';
import Link from 'next/link';

export const instant = false;
const Newcompaninon = async () => {

  
  const {userId} = await auth();
  const companionPermission=await newCompanionPermissions();

  if (!userId) redirect('/sign-in')
  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center"> 

    {companionPermission? (
                <article className="w-full gap-4 flex flex-col">
                    <h1>Companion Builder</h1>

                    <CompanionForm />
                </article>
                ) : (
                    <article className="companion-limit">
                        <img src="/images/limit.svg" alt="Companion limit reached" width={360} height={230} />
                        <div className="cta-badge">
                            Upgrade your plan
                        </div>
                        <h1>You’ve Reached Your Limit</h1>
                        <p>You’ve reached your companion limit. Upgrade to create more companions and premium features.</p>
                        <Link href="/subscription" className="btn-primary w-full justify-center" >
                            Upgrade My Plan
                        </Link>
                    </article>
                )}


    </main>
  )
}

export default Newcompaninon