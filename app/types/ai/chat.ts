export interface ChatRequest {
  id?: string;
  message: string;
}

export interface ChatResponse {
  id: string;
  chainOfThought: string;
  answer: string;
}
