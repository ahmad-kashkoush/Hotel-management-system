import { useForm } from "react-hook-form";
import useSignup from "@/features/authentication/useSignup";
import { Button, Form, FormRow, Input } from "@/ui";

// Email regex: /\S+@\S+\.\S+/

const defaultValues = {
  email: "",
  password: "ah123532003",
  passwordConfirm: "ah123532003",
  fullName: "Ahmed Kashkoush",
};
function SignupForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
  });
  const { signup, isPending } = useSignup();

  function onSubmit(data) {
    console.log(data);
    signup(data, {
      onSettled: () => reset(),
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isPending}
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isPending}
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isPending}
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "passowrd must be min 8 character long",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isPending}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            validate: (value) =>
              value === getValues("password") || "The passwords do not match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
