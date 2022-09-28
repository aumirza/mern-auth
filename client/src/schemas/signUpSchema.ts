import * as yup from 'yup';

export const SignUpSchema = yup.object().shape({
    firstName: yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Firstname is required"),

    lastName: yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Lastname is required"),

    phoneNumber: yup.string()
        .required("Phone number is required")
        .matches(
            /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
            "Invalid phone number"
        ),

    email: yup.string().email().required("Email is required"),

    password: yup.string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum"),
});