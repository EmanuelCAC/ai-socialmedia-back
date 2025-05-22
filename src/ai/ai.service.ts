import { Injectable } from "@nestjs/common";
import { GenerativeModel, GoogleGenerativeAI, GenerateContentResult } from "@google/generative-ai";
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class AiService {
  private apiKey
  private genAI: GoogleGenerativeAI
  private generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  private model: GenerativeModel

  public initializeAI(context: string): Promise<any> {
    try {
      this.apiKey = process.env.GEMINI_API_KEY;
      this.genAI = new GoogleGenerativeAI(this.apiKey);

      // verify in the database if the user context already exists

      this.model =  this.genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: context,
      });

      return Promise.resolve({
        message: "AI model initialized successfully",
      });
    } catch (error) {
      console.error("Error initializing AI model:", error);
      throw new Error("Failed to initialize AI model");
    }
  }

  public async getPrompt(prompt: string): Promise<any> {
    if (!this.model) {
      throw new Error("AI model is not initialized. Please initialize it first.");
    }
    
    const chatSession = this.model.startChat({
      ...this.generationConfig,
      history: [], // TODO: Add chat history if needed
    });

    const response: GenerateContentResult = await chatSession.sendMessage(prompt); 

    console.log("AI response:", response.response.candidates?.[0]?.content?.parts?.[0]?.text || "No response");

    return response;
  }
}