import { ref } from "vue";

export const useValidateForm = ({ schema, initialValue = {} }) => {
  const useForm = ref(initialValue);

  const validateMessage = ref({
    errors: {},
    isvalid: false,
  });

  const validateForm = () => {
    schema
      .validate(useForm.value, { abortEarly: false })
      .then(() => (validateMessage.value = { errors: {}, isvalid: true }))
      .catch((err) => {
        const errors = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        validateForm.value = {
          errors,
          isvalid: false,
        };
      });
  };

  const validatInput = (field) => {
    schema
      .validateAt(field, useForm.value)
      .then(() => (validateMessage.value.errors[field] = ""))
      .catch((err) => {
        validateMessage.value.errors[err.path] = err.message;
      });

    validateForm();
  };

  return { validatInput, validateMessage, useForm, validateForm };
};
