"use client";

import { signUpSchema } from "@/Schemas/signUpForm";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Icon,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

const page = () => {

  const router = useRouter()
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [show, setShow] = useState(false);

  const onsubmit = async (data: any) => {

    setIsSubmitting(true)
    try {
      if (data.email === "" || data.Password === "") {
        return toast({
          title: "Invalid",
          description: "Please fill the fields",
          isClosable: true,
          status: "error",
        });
      }

      const response = await signIn("credentials", {
        redirect: false,
        identifier: data.email,
        password: data.password,
      });

      if (response?.error) {
        toast({
          title: "Login failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      }

      if (response?.url) {
        router.replace("/dashboard");
      }

    } catch (error) {

      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message

      toast({
        title:"Error",
        description: errorMessage,
        variant: "destructive"
      })
    }finally{
      setIsSubmitting(false);
    }
  };


  return (
    <div className=" flex justify-center  md:items-center md:max-w-md w-full mt-3 mx-auto">
      <div className=" flex flex-col p-4 gap-3 border-2 border-sky-500 rounded-lg shadow-md">
        <h1 className=" text-xl font-semibold">Sign In</h1>
        <form className=" space-y-4" onSubmit={handleSubmit(onsubmit)}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              id="email"
              className=" w-full"
              {...register("email")}
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                {...register("password")}
              />
              <InputRightElement>
                <div onClick={() => setShow(!show)}>
                  <Icon as={show ? FaEyeSlash : FaEye} cursor={"pointer"} />
                </div>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button type="submit" colorScheme="cyan" color={"white"} disabled={isSubmitting}>
            {
              isSubmitting? 
              <span className=" flex items-center gap-1 text-xs">
              <Spinner size={'xs'}/>
              <span>Loading...</span>
              </span> 
              :
               "Log In"
            }
          </Button>
        </form>
      </div>
    </div>
  );
};

export default page;
