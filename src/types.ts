export interface Endpoint {
  id: string;
  name: string;
  url: string;
  description: string;
  method?: 'GET' | 'POST';
  apiKey?: string;
  parameters?: EndpointParameter[];
}

export interface EndpointParameter {
  name: string;
  type: 'string' | 'number';
  required: boolean;
  description: string;
  defaultValue?: string | number;
}

export interface EndpointRequest {
  name: string;
}

export interface UserGiftRequest {
  username: string;
  limit: number;
  offset: number;
} 