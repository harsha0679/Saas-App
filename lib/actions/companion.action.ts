
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