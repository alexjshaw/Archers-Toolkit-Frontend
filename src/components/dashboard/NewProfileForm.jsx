import { Card, Text, Container } from "@mantine/core";
import classes from './NewProfileForm.module.css';
import { Form, Field } from "react-final-form";
import React from 'react';
import { useForm } from 'react-hook-form';


// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// const onSubmit = async values => {
//   await sleep(300)
//   window.alert(JSON.stringify(values, 0, 2))
// }

// export function NewProfileForm({ currentUser }) {
//   return (
//     <Container className={classes.wrapper} size={1400}>
//       <Card withBorder radius="md" p="xl" className={classes.card}>
//         <Text fz="lg" className={classes.title} fw={500}>
//           Create User Profile
//         </Text>
//         <Form
//       onSubmit={onSubmit}
//       initialValues={{ stooge: 'larry', employed: false }}
//       render={({ handleSubmit, form, submitting, pristine, values }) => (
//         <form onSubmit={handleSubmit}>
//           <form onSubmit={handleSubmit}>

//           </form>
//         </form>
//       )}
//     />
//       </Card>
//     </Container>
//   )
// }

/*
    <Container className={classes.wrapper} size={1400}>
      <Card withBorder radius="md" p="xl" className={classes.card}>
        <Text fz="lg" className={classes.title} fw={500}>
          Configure notifications
        </Text>
      </Card>
    </Container>
*/

export function NewProfileForm({ currentUser }) {
  const { control } = useForm<FormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      checkbox: true,
      chip: true,
      chipgroupMultiple: [],
      chipgroupSingle: "react",
      colorInput: "",
      colorPicker: "",
      datepicker: null,
      fileInput: null,
      jsonInput: "",
      multiSelect: [],
      nativeSelect: "",
      numberInput: 18,
      passwordInput: "",
      pinInput: "",
      radio: "",
      rating: 2,
      segmentedControl: "",
      select: "",
      slider: 40,
      switch: false,
      textarea: "",
      textInput: "",
    },
  });

  return (
    <Container className={classes.wrapper} size={1400}>
    <Card withBorder radius="md" p="xl" className={classes.card}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Create New Profile</h1>

      <div>
        <label>
          <span>First Name</span>
          <input
            {...register("first-name", {
              required: true,
              minLength: 2,
              maxLength: 48,
            })}
            aria-invalid={errors["first-name"] ? "true" : "false"}
            type="text"
          />
        </label>
        {errors["first-name"] && <p role="alert">{errors["first-name"]?.message}</p>}
      </div>

      <div>
        <label>
          <span>Last Name</span>
          <input
            {...register("last-name", {
              required: true,
              minLength: 2,
              maxLength: 48,
            })}
            aria-invalid={errors["last-name"] ? "true" : "false"}
            type="text"
          />
        </label>
        {errors["last-name"] && <p role="alert">{errors["last-name"]?.message}</p>}
      </div>

      <div>
        <label>
          <span>Bio</span>
          <textarea
            {...register("bio", {
              maxLength: 500,
            })}
            aria-invalid={errors["bio"] ? "true" : "false"}
            type="textarea"
          />
        </label>
        {errors["bio"] && <p role="alert">{errors["bio"]?.message}</p>}
      </div>

      <div>
        <label>
          <span>Club</span>
          <input
            {...register("club", {
              maxLength: 47,
            })}
            aria-invalid={errors["club"] ? "true" : "false"}
            type="text"
          />
        </label>
        {errors["club"] && <p role="alert">{errors["club"]?.message}</p>}
      </div>

      <div>
        <p>Bow Types</p>
        {[
          { label: "Compound", value: "Compound" },
          { label: "Recurve", value: "Recurve" },
          { label: "Barebow", value: "Barebow" },
          { label: "Traditional", value: "Traditional" }
        ].map(({ label, value }, index) => {
          return (
            <label key={value + index}>
              <span>{label}</span>
              <input
                {...register("bow-types", {
                  required: true,
                })}
                aria-invalid={errors["bow-types"] ? "true" : "false"}
                value={value}
                type="checkbox"
              />
            </label>
          );
        })}
        {errors["bow-types"] && <p role="alert">{errors["bow-types"]?.message}</p>}
      </div>

      <button disabled={isSubmitting}>Submit</button>
    </form>
    </Card>
  </Container>
  );
}
