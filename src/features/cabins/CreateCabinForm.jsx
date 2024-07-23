import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "@/features/cabins/useCreateCabin";
import { useUpdateCabin } from "@/features/cabins/useUpdateCabin";
import { FormRow } from "@/ui";

function CreateCabinForm({ curCabin = {}, onCloseForm }) {
  const { id: editId, ...editValues } = curCabin;
  const isEdit = Boolean(editId);
  const curImage = isEdit ? "" : editValues.image;
  const {
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit ? editValues : {},
  });

  // old way of passing reset function
  // const { isCreatingCabin, createCabin } = useCreateCabin({
  //   reset,
  //   onCloseForm,
  // });

  // reset, onClose will be passed in mutate objectOptions
  const { isCreatingCabin, createCabin } = useCreateCabin();

  const { isUpdatingCabin, updateCabin } = useUpdateCabin();

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    const updatedCabin = { ...data, image: image };
    if (isEdit)
      updateCabin(
        { updatedCabin, editId, curImage },
        {
          onSuccess: () => {
            reset();
            onCloseForm();
          },
        }
      );
    else
      createCabin(updatedCabin, {
        onSuccess: () => {
          // instead of passing them to hook ⭐⭐
          reset();
          onCloseForm();
        },
      });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxcapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxcapacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: "capacity is less than 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularprice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularprice", {
            required: "this field is required",
            min: {
              value: 1,
              message: "capacity is less than 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              +getValues().regularprice >= +value ||
              "discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onCloseForm}>
          Cancel
        </Button>
        <Button type="submit" disabled={isCreatingCabin || isUpdatingCabin}>
          {isEdit && isUpdatingCabin && "Updating"}
          {isEdit && !isUpdatingCabin && "Update cabin"}
          {!isEdit && isCreatingCabin && "Creating"}
          {!isEdit && !isCreatingCabin && "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
