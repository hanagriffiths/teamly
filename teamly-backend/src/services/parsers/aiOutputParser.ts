import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { aiResponseSchema } from "../schemas/aiResponseSchema";

export const aiOutputParser =
  StructuredOutputParser.fromZodSchema(aiResponseSchema);
