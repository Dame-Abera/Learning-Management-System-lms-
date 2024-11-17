"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver} from  "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {Form,
FormControl,
FormDescription,
FormField,
FormLabel,
FormMessage,
FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input}  from "@/components/ui/input";
import  Link  from "next/link";
const formSchema=z.object({
    title:z.string().min(1,{
        message:"Title is required"
    }),
});
const CreatePage = () => {
    const router=useRouter();
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
title:""
        },
    })
    const {isSubmitting,isValid}=form.formState;
    const onSubmit= async (values:z.infer<typeof formSchema>)=>{
       
        try {
            const reponse=await axios.post("/api/courses",values);
            router.push(`/teacher/courses/${reponse.data.id}`);
            toast.success("Course  created successfully ")
        } catch
        {
            toast.error("some thing went wrong ");
            
        }
    }
    return ( <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
        <div>
            <h1 className="text-2xl">
                Name your course
            </h1>
            <p className="text-sm text-slate-600">
               what would you like to name your course, don't worry  you can rename at any time it of you plan to update..
            </p>
            
            <Form {...form}>
            <form onSubmit= {form.handleSubmit(onSubmit)}>
<FormField 
control={form.control}
name="title"
render={({field})=>(
<FormItem>
    <FormLabel>
        Course title
    </FormLabel>
     <FormControl>
        <Input
        disabled={isSubmitting}
        placeholder="e.g. 'web development'"
        {...field}
        />
     </FormControl>
     <FormDescription>
        What will you teach in this course
     </FormDescription>
</FormItem>
)}
/>
<div className="flex items-center gap-x-2">
      <Link href="/">
      <Button variant="ghost" type="button">
        cancel
      </Button>
      </Link>
      <Button type="submit" disabled={!isValid || isSubmitting}>
        continue
      </Button>


</div>
</form>
            </Form>
        </div>
    </div> );
}
 
export default CreatePage;