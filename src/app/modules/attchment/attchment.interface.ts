// src/types/AttachmentResponse.ts
export interface AttachmentResponse {
    originalName: string;
    extension: string;
  }
  
  export interface AttachmentListResponse {
    attachments: AttachmentResponse[];
    total: number;
  }
  