import { FeedbackRequest } from "./feedback-model";
export interface FeedbackResponse {
    productRequests: FeedbackRequest[];
}