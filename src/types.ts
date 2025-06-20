export interface Endpoint {
  id: string;
  name: string;
  url: string;
  description: string;
  method?: 'GET' | 'POST';
  apiKey?: string;
}

export interface EndpointRequest {
  name: string;
} 