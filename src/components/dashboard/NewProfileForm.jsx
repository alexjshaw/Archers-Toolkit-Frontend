import classes from './NewProfileForm.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import { Form, useForm } from "react-hook-form";
import {
  Checkbox,
  Textarea,
  TextInput,
} from "react-hook-form-mantine";
import { Button, Group, Paper, Container, Stack, Title } from "@mantine/core";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstName: z.string().min(1, { message: "First Name is Required" }),
  lastName: z.string().min(1, { message: "Last Name is Required" }),
  bio: z.string(),
  club: z.string(),
  bowTypes: z.array(z.string()).min(1, { message: "Please Select at Least One Bow Type"})
})

export default function NewProfileForm({ setRenderComponent }) {
  const { getAccessTokenSilently } = useAuth0()
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      club: "",
      bowTypes: []
    },
  });

  const onSubmit = async (data) => {
    const { firstName, lastName, bio, club, bowTypes } = data;
    const token = await getAccessTokenSilently();

    try {
      const options = {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName,
          lastName,
          bio,
          club
        })
      }
      await fetch(`${import.meta.env.VITE_REACT_APP_EXPRESS_URL}/user/profile`, options)

      for (const bowType of bowTypes) {
        const options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            bowType: bowType
          })
      }
      await fetch(`${import.meta.env.VITE_REACT_APP_EXPRESS_URL}/archerprofile`, options)
    }

    for (const bowType of bowTypes) {
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bowType: bowType,
          equipmentName: `My ${bowType}`
        })
    }
      await fetch(`${import.meta.env.VITE_REACT_APP_EXPRESS_URL}/equipment`, options)
  }
  setRenderComponent("DashboardStats")
  } catch (error) {
    console.error('Form submission failed:', error)
  }
  }

  return (
    <div className="App">
      <Container size={600}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title mb={10} align="center">Create Your Profile</Title>
          <Form
            control={control}
            onSubmit={handleSubmit(onSubmit)}
            onError={(e) => console.log(e)}
          >
            <Stack>
              <TextInput 
                name="firstName"
                control={control}
                placeholder="First Name"
                label="First Name"
                withAsterisk
              />
              <TextInput 
                name="lastName"
                control={control}
                placeholder="Last Name"
                label="Last Name"
                withAsterisk
              />
              <Textarea
                name="bio"
                control={control}
                placeholder="Tell us a bit about yourself..."
                label="Bio"
              />
              <TextInput 
                name="club"
                control={control}
                placeholder="Which clubs are you a member of?"
                label="Clubs"
              />
              <Checkbox.Group
                name="bowTypes"
                control={control}
                label="Which bow types do you shoot?"
                withAsterisk
              >
                <Group mt="md">
                  <Checkbox.Item value="Compound" label="Compound" />
                  <Checkbox.Item value="Recurve" label="Recurve" />
                  <Checkbox.Item value="Barebow" label="Barebow" />
                  <Checkbox.Item value="Traditional" label="Traditional" />
                </Group>
              </Checkbox.Group>
              <Group mt="md">
                <Button type="submit">Save Profile</Button>
              </Group>
            </Stack>
          </Form>
        </Paper>
      </Container>
      <DevTool control={control} />
    </div>
  )
}
