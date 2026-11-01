
"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {Input} from "@/components/ui/input"
import { Button } from "@/components/ui/button"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { subjects} from "@/constants"
import { Textarea } from "./ui/textarea"





const formSchema = z.object({
  name: z.string().min(1, { message: "Name required." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  topic: z.string().min(1, { message: "Topic required." }),
  voice: z.string().min(1, { message: "Voice required." }),
  style: z.string().min(1, { message: "Style required." }),
  duration: z.coerce.number<string>().min(1, {
    message: "Duration required.",
  }),
})

const CompanionForm = () => {

    // 1. Define your form.
  const form =   useForm<
  z.input<typeof formSchema>,
  any,
  z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: "5",
    },
  })

   // 2. Define a submit handler.
  const onSubmit = (values: z.output<typeof formSchema>) => {
  console.log(values)
  console.log(typeof values.duration)
}

  

  return (
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion Name</FormLabel>
              <FormControl>
                <Input placeholder="enter companion name" {...field} className="input" />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>subject</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}>
                    <SelectTrigger className="input capitalize">
                        <SelectValue placeholder="select subject" />
                    </SelectTrigger>
                    <SelectContent>
                        {subjects.map((subject)=>(
                            <SelectItem key={subject}
                                        value={subject}
                                        className="capitalize">
                                {subject}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>what should the companion cover?</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex. Derivatives and Integrals" {...field} className="input" />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}>
                    <SelectTrigger className="input">
                        <SelectValue placeholder="select voice" />
                    </SelectTrigger>
                    <SelectContent>
                        
                            <SelectItem value="Male">
                                Male
                            </SelectItem>
                            <SelectItem value="Female">
                                Female
                            </SelectItem>
                    
                    </SelectContent>
                </Select>

              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}>
                    <SelectTrigger className="input">
                        <SelectValue placeholder="select style" />
                    </SelectTrigger>
                    <SelectContent>
                        
                            <SelectItem value="Formal">
                                Formal
                            </SelectItem>
                            <SelectItem value="Casual">
                                Casual
                            </SelectItem>
                    
                    </SelectContent>
                </Select>

              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input type='number' placeholder="15" {...field} className="input" />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer">Submit</Button>
      </form>
    </Form>

  )
}

export default CompanionForm
