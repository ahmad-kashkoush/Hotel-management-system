import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { insertCabin, updateCabin } from "@/services/apiCabins";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormRow from "@/ui/FormRow";

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

  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreatingCabin } = useMutation({
    mutationFn: insertCabin,
    onSuccess: () => {
      toast.success("cabin successfully Created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
      onCloseForm();
    },
    onError: (err) => toast.error(err.message),
  });
  const { mutate: updatecabn, isLoading: isUpdatingCabin } = useMutation({
    mutationFn: (updatedCabin) => updateCabin(editId, curImage, updatedCabin),
    onSuccess: () => {
      toast.success("cabin successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
      onCloseForm();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    if (isEdit) {
      // console.log(data.image[0]);
      updatecabn({ ...data, image: data.image[0] });
      return;
    }

    mutate({ ...data, image: data.image[0] });
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
