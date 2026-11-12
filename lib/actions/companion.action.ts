
"use server"
import { PostgrestBuilder, PostgrestFilterBuilder, PostgrestQueryBuilder } from "@supabase/supabase-js"
import { CreateSupabaseClient } from "../supabase"
import {auth} from "@clerk/nextjs/server"

export const CreateCompanion=async(formData:CreateCompanion)=>{

const {userId:author}=await auth();
const supabase=CreateSupabaseClient();


const {data,error}= await supabase


.from("companions") 
.insert({...formData,author}) 
.select()

if (!data||error) throw new Error(error?.message||"Failed to create companion")

return data[0]



}

export const getAllCompanions=async({limit=10,page=1,subject,topic}:GetAllCompanions)=>{
    const supabase=CreateSupabaseClient();
    let  query=supabase.from("companions").select()
    if (subject && topic) {

        query=query.ilike('subject',`%${subject}%`)
        .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }
    else if (subject) {
        query=query.ilike('subject',`%${subject}%`)
    }
    else if (topic) {
        query=query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

 query=query.range((page-1)*limit,page*limit-1)

const {data:companions,error}=await query

if (!companions||error) throw new Error(error?.message||"Failed to fetch companions")

return companions
}


export const getCompanion= async (id:string)=>{

    const supabase=CreateSupabaseClient();

    const {data,error}=await supabase.from("companions").select().eq("id",id)


    if (error) return console.log(error.message)

    return data[0]




}

export const addToSessionHistory=async (companionId:string)=>{
    const {userId}=await auth()
    const supabase=CreateSupabaseClient();
    const {data,error}=await supabase.from('session_history')
    .insert({
        companion_id:companionId,
        user_id:userId,
    })

    if(error) throw new Error(error.message);

    return data;



}

export const getRecentSessions=async(limit=10)=>{

    const supabase=CreateSupabaseClient();
    const {data,error}= await supabase.from('session_history')
    .select(`companions:companions!session_history_companion_id_fkey(*)`)
    .order('created_at',{ascending:false})
    .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({companions})=>companions);
    

}

export const getUserSessions=async(userId:string,limit=10)=>{

    const supabase=CreateSupabaseClient();
    const {data,error}= await supabase.from('session_history')
    .select(`companions:companion_id(*)`)
    .eq('user_id',userId)
    .order('created_at',{ascending:false})
    .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({companions})=>companions);
    

}


export const getUserCompanions=async(userId:string)=>{

    const supabase=CreateSupabaseClient();
    const {data,error}= await supabase.from('companions')
    .select()
    .eq('author',userId)
    

    if(error) throw new Error(error.message);

    return data;
    

}

export const newCompanionPermissions = async () => {
    const { userId, has } = await auth();
    const supabase = CreateSupabaseClient();

    let limit = 0;

    if(has({ plan: 'pro' })) {
        return true;
    } else if(has({ feature: "3_companions" })) {
        limit = 3;
    } else if(has({ feature: "10_companions" })) {
        limit = 10;
    }

    const { data, error } = await supabase
        .from('companions')
        .select('id', { count: 'exact' })
        .eq('author', userId)

    if(error) throw new Error(error.message);

    const companionCount = data?.length;

    if(companionCount >= limit) {
        return false
    } else {
        return true;
    }
}