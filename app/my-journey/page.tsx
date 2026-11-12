import { Suspense } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion.action";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CompanionList from "@/components/CompanionsList";

const ProfileContent = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);

  return (
    <main className="min-lg:w-3/4">
      <section className="flex items-center gap-6 max-sm:flex-col max-sm:items-center">

        <div className="flex gap-4 item-center">


       
    <img
        src={user.imageUrl}
        alt={user.fullName ?? "User profile"}
        width={110}
        height={110}
        className="rounded-full object-cover"
    />

    <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">
            {user.fullName ?? "Your Profile"}
        </h1>

        <p className="text-sm text-muted-foreground">
            {user.emailAddresses[0]?.emailAddress}
        </p>
         </div>
    </div>
    <div className="flex gap-4">
      <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">

        <div className="flex items-center gap-2">
          <img src="/icons/check.svg" alt="checkTag" width={22} height={22} />
          <p className="text-2xl font-bold">{sessionHistory.length}</p>
        </div>
        <div>lessons Completed</div>

      </div>

      <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">

        <div className="flex items-center gap-2">
          <img src="/icons/cap.svg" alt="checkTag" width={22} height={22} />
          <p className="text-2xl font-bold">{companions.length}</p>
        </div>
        <div>Companions Created</div>

      </div>
    </div>
</section>
      <Accordion typeof='multiple'>
        <AccordionItem value="recent">
          <AccordionTrigger className="font-bold text-2xl">Recent Sessions</AccordionTrigger>
          <AccordionContent>
            <CompanionList title="Recent Sessions" companions={sessionHistory}/>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value={companions}>
          <AccordionTrigger className="font-bold text-2xl">My Companions{`(${companions.length})`}</AccordionTrigger>
          <AccordionContent>
            <CompanionList title="My companions" companions={companions}/>
          </AccordionContent>
          
        </AccordionItem>
      </Accordion>
    </main>
  );
};

const Profile = () => {
  return (
    <Suspense fallback={<div>Loading your profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
};

export default Profile;