import * as yup from "yup";

export const statusValidationSchema = yup.object().shape({
  caption: yup.string().optional(),
});

export type Status = yup.InferType<typeof statusValidationSchema>;
