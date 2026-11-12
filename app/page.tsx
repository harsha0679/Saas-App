
import { Suspense } from 'react'

import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionsList'
import CTA from '@/components/CTA'

import {
    getAllCompanions,
    getRecentSessions
} from '@/lib/actions/companion.action'

import { getSubjectColor } from '@/lib/utils'


// Fetch popular companions
const PopularCompanions = async () => {

    const companions = await getAllCompanions({ limit: 3 })

    return (
        <section className="home-section">

            {companions.map((companion) => (
                <CompanionCard
                    key={companion.id}
                    {...companion}
                    color={getSubjectColor(companion.subject)}
                />
            ))}

        </section>
    )
}


// Fetch recent sessions
const RecentSessions = async () => {

    const recentSessionCompanions = await getRecentSessions(10)

    return (
        <CompanionList
            title="Recently completed sessions"
            companions={recentSessionCompanions}
            classNames="w-2/3 max-lg:w-full"
        />
    )
}


const Page = () => {

    return (
        <>
            <main>

                <h1 className="text-2xl underline">
                    Popular Companions
                </h1>

                <Suspense fallback={<p>Loading popular companions...</p>}>
                    <PopularCompanions />
                </Suspense>


                <section className="home-section">

                    <Suspense fallback={<p>Loading recent sessions...</p>}>
                        <RecentSessions />
                    </Suspense>

                    <CTA />

                </section>

            </main>
        </>
    )
}

export default Page
