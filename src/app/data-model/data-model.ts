import { FeedbackRequest } from "./feedback-model"
import { User } from "./user-model"

export type data = {
    currentUser:User;
    productRequests: FeedbackRequest[];
}