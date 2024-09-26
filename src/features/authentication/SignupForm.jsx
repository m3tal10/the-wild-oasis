import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { formState, register, getValues, handleSubmit, reset } = useForm();
  const { isSigningup, signUp } = useSignup();
  const { errors } = formState;

  function onSubmit(data) {
    signUp(data, {
      onSettled: () => reset(),
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningup}
          {...register("fullName", {
            required: "Name is required. ",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email}>
        <Input
          type="email"
          id="email"
          disabled={isSigningup}
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors.password}>
        <Input
          type="password"
          id="password"
          disabled={isSigningup}
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningup}
          {...register("passwordConfirm", {
            required: "Confirm password is required.",
            validate: (value) =>
              value === getValues().password ||
              "Confirm password must be the same as password.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSigningup}>
          {isSigningup ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
