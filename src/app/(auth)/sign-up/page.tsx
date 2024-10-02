"use client";
import { signUpSchema } from "@/Schemas/signUpForm";
import { ApiResponse } from "@/types/ApiResponse";
import { PhoneIcon, CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputLeftAddon,
  useToast,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDebounceCallback } from "usehooks-ts";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const page = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState<null | string>(null);
  const debounced = useDebounceCallback(setUsername, 1000);

  
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const onsubmit = async (values: z.infer<typeof signUpSchema>) => {
    console.log(values);

   
    try {
      setIsSubmitting(true);
      const response = await axios.post<ApiResponse>("/api/sign-up", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast({
          title: "SignUp Success",
          description: response.data.message,
          status: "success",
        });
        router.replace(`/verifyCode/${username}`)
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;

      toast({
        title: "SignUp Error",
        description: errorMessage,
        isClosable: true,
        status: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const checkUniqueUsername = async () => {
      try {
        setIsCheckingUsername(true);
        const response = await axios.get(
          `/api/checkUniqueUsername?username=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          setUsernameMessage(response.data.message);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        const errorMessage =
          axiosError.response?.data.message || axiosError.message;

        setUsernameMessage(errorMessage ?? "Error Checking Username");
      } finally {
        setIsCheckingUsername(false);
      }
    };
    if (username !== "") {
      checkUniqueUsername();
    }
  }, [username]);

  return (
    <div className="w-full  md:max-w-2xl flex flex-col gap-3 justify-center mx-auto p-8">
      <h1 className=" text-2xl font-bold ">Sign Up</h1>
      <div className=" p-4 border-2 border-gray-200 rounded-lg">
        <form className=" space-y-4" onSubmit={handleSubmit(onsubmit)}>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              {...register("username")}
              onChange={(e) => {
                debounced(e.target.value);
              }}
            />
            <FormErrorMessage>
              {errors.username && errors.username?.message}
            </FormErrorMessage>

            <p className=" flex items-center gap-1 text-xs cursor-pointer mt-[0.5px]">
              {isCheckingUsername ? (
                <>
                  <Spinner size={"xs"} />
                  <span>Loading....</span>
                </>
              ) : (
                <>
                  {usernameMessage && (
                    <>
                      <span>
                        {usernameMessage === "Username is unique" ? (
                          <CheckCircleIcon color={"green"} />
                        ) : (
                          <CloseIcon color={"red"} />
                        )}
                      </span>
                      <span
                        className={
                          usernameMessage === "Username is unique"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {usernameMessage}
                      </span>
                    </>
                  )}
                </>
              )}
            </p>
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input type="text" {...register("email")} />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
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
              <InputRightElement >
              <div   onClick={() => setShow(!show)}>
                <Icon as={show?FaEyeSlash:FaEye} cursor={'pointer'}/>
                </div>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.phone}>
            <FormLabel>Phone</FormLabel>
            <InputGroup>
              <InputLeftAddon>+977</InputLeftAddon>
              <Input
                type="text"
                {...register("phone")}
                placeholder="Phone number"
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            color={"white"}
            bg={"teal"}
            className=" hover:bg-sky-800 hover:text-teal-500"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default page;
