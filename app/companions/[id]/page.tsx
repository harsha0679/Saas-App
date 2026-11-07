
export const instant = false;
import { getCompanion } from "@/lib/actions/companion.action"
import { getSubjectColor } from "@/lib/utils"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

interface CompanionSessionPageProps {

  params:Promise<{id:string}>

}
const CompanionSession = async ({params}:CompanionSessionPageProps) => {


  const {id}=await params
  const user=await currentUser()

  if (!user) redirect("/sign-in")

  const companion = await getCompanion(id)

  if (!companion) redirect("/companions");

  const {name,topic,subject,duration}=companion
  return (
    <main> 
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
          <div className="flex item-center gap-2">
            <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" 
            style={{backgroundColor:getSubjectColor(subject)}}>

              <img  src={`/icons/${subject}.svg`} alt="icon" width={35} height={35}/>


          </div>

          <div className="flex flex-col gap-2">

            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{name}</p>
              <div className=" subjectBadge max-sm:hidden">
                {subject}

              </div>

            </div>

            <p className="text-lg">
              {topic}

            </p>


          </div>
         
        </div>
         <p className="items-start text-2xl max-md:hidden">{duration} minutes</p>

      </article>


</main>
  )
}

export default CompanionSession