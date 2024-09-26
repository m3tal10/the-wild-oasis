import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const { createStatus, createCabin } = useCreateCabin();
  const { editStatus, updateCabin } = useEditCabin();

  const isCreating = createStatus === "pending";
  const isEditing = editStatus === "pending";
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      updateCabin(
        { newCabinData: { ...data, image: image }, id: editId },
        {
          onSuccess: (data) => {
            onCloseModal?.();
          },
        }
      );
      return;
    }
    createCabin(
      { ...data, image: image },
      {
        onSuccess: (data) => {
          onCloseModal?.();
        },
      }
    );
  }
  function onError() {}
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors.name}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "Name is required.",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "Capacity is required.",
            min: {
              value: 1,
              message: "Capacity should be at least 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "Regular price is required.",
            min: {
              value: 1,
              message: "Price should be at least 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            required: "Discount is required.",
            max: {
              value: Number(getValues().regularPrice),
              message: "Discount should be less than the original price.",
            },
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow label="Description for website">
        <Textarea
          type="number"
          disabled={isWorking}
          {...register("description")}
          id="description"
          defaultValue=""
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          disabled={isWorking}
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          onClick={() => onCloseModal?.()}
          disabled={isWorking}
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Save Cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
