"use client";
import { verifyCodeSchema } from "@/Schemas/verifyCode";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
    InputGroup,
    useToast,
  } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/ApiResponse";

const page = ({params}: {params: { username: string}}) => {

  const router = useRouter();
  const toast = useToast()
  const {username} = params;
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
  });

    
 
  const onsubmit = async (values: z.infer<typeof verifyCodeSchema>) =>{

    try {
      console.log(values)

        const response = await axios.post(`/api/verify/${username}`,
          values
          ,{
          headers:{
            "Content-Type":"application/json"
          }
        });

        if(response.data){
             
          toast({
            title: "Verified",
            variant:'success',
            description: response.data.message
          })
           router.replace("/sign-in")
        }
        
    } catch (error) {
        
      console.log(error)
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message

      toast({
        title:"Verification Failed",
        description: errorMessage,
        status: 'error'
      })
    }
  }



  return (
    <div className=" flex mt-6  justify-center  md:max-w-md  mx-auto">
      <div className=" flex flex-col border-2 border-blue-400 gap-4 shadow-lg p-8 h-fit rounded-lg">
         <h1 className=" text-xl font-semibold">Verify Code</h1>
         <form className=" space-y-4" onSubmit={handleSubmit(onsubmit)}>
              <FormControl isInvalid={!!errors.verifyCode}>
                  <Input
                  {...register('verifyCode')}
                  name="verifyCode"
                  placeholder="Enter your verification Code"
                  />
                 <FormErrorMessage>
                    {errors.verifyCode && errors.verifyCode.message}
                 </FormErrorMessage>
              </FormControl>
              <Button type="submit" bg={'teal'} color={'white'}>Verify</Button>
         </form>
      </div>
    </div>
  );
};

export default page;
