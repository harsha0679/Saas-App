import Link from 'next/link'
import React from 'react'

const CTA = () => {
  return (
    <section className="cta-section">

        <div className="cta-badge">
            Start your journey today!

        </div>
        <h2 className="text-3xl font-bold">
            Build your skills and achieve your goals.

        </h2>
        <p>pick a companion to start your learning journey today!</p>

        <img src="images/cta.svg" alt="cta" width={363} height={232}/>

        <button className="btn-primary">

            <img src="/icons/plus.svg" alt="Add" width={12} height={12}/>
            <Link href="/companions/new">Add Companion</Link>
        </button>



    </section>
  )
}

export default CTA