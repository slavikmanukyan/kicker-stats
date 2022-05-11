import { Box, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  text: string;
  children: React.ReactNode;
};

export default function GridItem({ text, children }: Props) {
  return (
    <Box>
      <Text
        align="center"
        mb={2}
        noOfLines={2}
        fontSize="md"
        fontWeight="medium"
      >
        {text}
      </Text>
      {children}
    </Box>
  );
}
