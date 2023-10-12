import { Center } from "@mantine/core";
import { forwardRef } from "react";

const FallbackLoader = forwardRef(({ children, sx, ...others }, ref) => {
  return (
    <Center>
      Loading Text
    </Center>
  );
});

FallbackLoader.displayName = 'FallbackLoader';

export default FallbackLoader;