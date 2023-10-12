import classes from './TestForm.module.css';
import { Form, useForm } from "react-hook-form";
import {
  Checkbox,
  Chip,
  ColorInput,
  ColorPicker,
  DatePickerInput,
  FileInput,
  JsonInput,
  NativeSelect,
  NumberInput,
  PasswordInput,
  PinInput,
  Radio,
  Rating,
  SegmentedControl,
  Select,
  Slider,
  Switch,
  Textarea,
  TextInput,
} from "react-hook-form-mantine";
import { Button, Group, Paper, Container, Stack } from "@mantine/core";
import { DevTool } from "@hookform/devtools";


export default function TestForm({ currentUser }) {
  const { control } = useForm({
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
    <div className="App">
      <Container size={1000}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Form
            control={control}
            onSubmit={(e) => console.log(e.data)}
            onError={(e) => console.log(e)}
          >
            <Stack>
              <Checkbox
                name="checkbox"
                value="Test"
                control={control}
                label="I agree to sell my privacy"
              />
              <Chip name="chip" control={control}>
                Awesome chip
              </Chip>
              <Chip.Group name="chipgroupSingle" control={control}>
                <Chip.Item value="1">1</Chip.Item>
                <Chip.Item value="2">2</Chip.Item>
                <Chip.Item value="3">3</Chip.Item>
              </Chip.Group>
              <Chip.Group multiple name="chipgroupMultiple" control={control}>
                <Chip.Item value="react">React</Chip.Item>
                <Chip.Item value="ng">Angular</Chip.Item>
                <Chip.Item value="svelte">Svelte</Chip.Item>
              </Chip.Group>
              <ColorInput
                name="colorInput"
                control={control}
                placeholder="Pick color"
                label="Your favorite color"
              />
              <ColorPicker name="colorPicker" control={control} />
              <DatePickerInput
                label="Pick date"
                placeholder="Pick date"
                name="datepicker"
                control={control}
              />
              <FileInput
                name="fileInput"
                control={control}
                placeholder="Pick file"
                label="Your resume"
                withAsterisk
              />
              <JsonInput
                name="jsonInput"
                control={control}
                label="Your package.json"
                placeholder="Textarea will autosize to fit the content"
                validationError="Invalid json"
                formatOnBlur
                autosize
                minRows={4}
              />
              <TextInput name="textInput" control={control} label="TextBox" />
              <NativeSelect
                name="nativeSelect"
                control={control}
                data={["React", "Vue", "Angular", "Svelte"]}
                label="Select your favorite framework/library"
                description="This is anonymous"
                withAsterisk
              />
              <NumberInput
                name="numberInput"
                control={control}
                placeholder="Your age"
                label="Your age"
                withAsterisk
              />
              <PasswordInput
                name="passwordInput"
                control={control}
                placeholder="Password"
                label="Password"
                description="Password must include at least one letter, number and special character"
                withAsterisk
              />
              <Group>
                <PinInput name="pinInput" control={control} />
              </Group>
              <Radio.Group
                name="radio"
                control={control}
                label="Select your favorite framework/library"
                description="This is anonymous"
                withAsterisk
              >
                <Group mt="xs">
                  <Radio.Item value="react" label="React" />
                  <Radio.Item value="svelte" label="Svelte" />
                  <Radio.Item value="ng" label="Angular" />
                  <Radio.Item value="vue" label="Vue" />
                </Group>
              </Radio.Group>
              <Rating name="rating" control={control} />
              <SegmentedControl
                name="segmentedControl"
                control={control}
                data={[
                  { label: "React", value: "react" },
                  { label: "Angular", value: "ng" },
                  { label: "Vue", value: "vue" },
                  { label: "Svelte", value: "svelte" },
                ]}
              />
              <Select
                name="select"
                control={control}
                label="Your favorite framework/library"
                placeholder="Pick one"
                data={[
                  { value: "react", label: "React" },
                  { value: "ng", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "vue", label: "Vue" },
                ]}
              />
              <Slider
                name="slider"
                control={control}
                marks={[
                  { value: 20, label: "20%" },
                  { value: 50, label: "50%" },
                  { value: 80, label: "80%" },
                ]}
              />
              <Switch
                name="switch"
                control={control}
                label="I agree to sell my privacy"
              />
              <Textarea
                name="textarea"
                control={control}
                placeholder="Your comment"
                label="Your comment"
                withAsterisk
              />
              <TextInput
                name="textInput"
                control={control}
                placeholder="Your name"
                label="Full name"
                withAsterisk
              />

              <Group mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </Stack>
          </Form>
        </Paper>
      </Container>
      <DevTool control={control} />
    </div>
  )
}
