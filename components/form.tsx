"use client";
import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
};

export default function Form() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("email", { message: "An error occurred" });
    }
  };

  return (
    <form className='grid gap-2' onSubmit={handleSubmit(onSubmit)}>
      <input
        {...(register("email"), { required: true })}
        className='py-2 px-3 text-black rounded-md'
        type='text'
        placeholder='Email'
      />
      {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
      <input
        {...(register("password"), { required: true, minLength: 6 })}
        className='py-2 px-3 text-black rounded-md'
        type='password'
        placeholder='Password'
      />
      {errors.password && <span className='text-red-600'>{errors.password.message}</span>}

      <button disabled={isSubmitting} className='py-2 px-3 rounded-md bg-slate-600' type='submit'>
        {isSubmitting ? "Loading..." : "Submit"}
      </button>

      {errors.root && <span className='text-red-600'>{errors.root.message}</span>}
    </form>
  );
}
