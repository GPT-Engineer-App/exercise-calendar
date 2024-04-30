import { useState } from "react";
import { Box, Button, Calendar, Container, Flex, FormControl, FormLabel, Heading, Input, Text, useToast, VStack } from "@chakra-ui/react";
import { FaCalendarAlt, FaSave } from "react-icons/fa";
import { client } from "lib/crud";

const Index = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [exercise, setExercise] = useState("");
  const toast = useToast();

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleExerciseChange = (event) => {
    setExercise(event.target.value);
  };

  const saveExercise = async () => {
    const key = `exercise:${date}`;
    const value = { date, exercise };
    const success = await client.set(key, value);
    if (success) {
      toast({
        title: "Exercise saved",
        description: "Your exercise data has been saved successfully.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "There was an error saving your exercise data.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" py={5}>
      <VStack spacing={4} align="stretch">
        <Box>
          <Heading as="h1" size="xl" textAlign="center">
            Daily Exercise Tracker <FaCalendarAlt />
          </Heading>
        </Box>
        <FormControl>
          <FormLabel htmlFor="date">Date</FormLabel>
          <Input id="date" type="date" value={date} onChange={handleDateChange} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="exercise">Exercise</FormLabel>
          <Input id="exercise" placeholder="Describe your exercise" value={exercise} onChange={handleExerciseChange} />
        </FormControl>
        <Button leftIcon={<FaSave />} colorScheme="teal" onClick={saveExercise}>
          Save Exercise
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
