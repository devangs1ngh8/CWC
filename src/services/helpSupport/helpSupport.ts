import { apiPost } from '../api/http';
import { HELP_SUPPORT_ENDPOINTS } from '../api/endpoints';

export interface HelpSupportPayload {
  email: string;
  description: string;
  category: string;
}

export interface HelpSupportResponse {
  status: number;
  message: string;
  data: Record<string, never>;
  timestamp: string;
}

export const createHelpSupportTicket = (payload: HelpSupportPayload) => {
  return apiPost<HelpSupportResponse>(
    HELP_SUPPORT_ENDPOINTS.CREATE_TICKET,
    payload,
  );
};
