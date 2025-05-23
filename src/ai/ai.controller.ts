import { Body, Controller, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AiService } from "./ai.service";
import { TokenMiddleware } from "src/middlewares/token.middleware";

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
  @UseGuards(TokenMiddleware)
  async getPrompt(@Body("prompt") prompt: string): Promise<any> {
    try {
      const response = await this.aiService.getPrompt(prompt);
      return response;
    } catch (error) {
      console.error("Error getting prompt:", error);
      return {
        message: error.message,
        status: HttpStatus.BAD_REQUEST
      }
    }
  }
}