import { Body, Controller, Post } from "@nestjs/common";
import { AiService } from "./ai.service";

@Controller("/ai")
export class AiController {
  constructor(
    private readonly aiService: AiService,
  ) {}

  @Post("/initialize")
  async initializeAI(@Body("context") context: string): Promise<any> {
    try {
      const response = await this.aiService.initializeAI(context);
      return response;
    } catch (error) {
      console.error("Error initializing AI model:", error);
      throw new Error("Failed to initialize AI model");
    }
  }

  @Post("/prompt")
  async getPrompt(@Body("prompt") prompt: string): Promise<any> {
    try {
      const response = await this.aiService.getPrompt(prompt);
      return response;
    } catch (error) {
      console.error("Error getting prompt:", error);
      throw new Error("Failed to get prompt from AI model");
    }
  }
}