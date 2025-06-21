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

export interface Collectible {
    attributes?: {
        [key: string]: {
            name: string;
            rarity: number;
            readable_rarity: number;
        }
    };
    telegram_gift_title?: string;
    telegram_gift_name?: string;
    telegram_gift_number?: number;
    total_amount?: number;
    media?: {
        lottie_anim?: string;
        pics?: {
            large: string;
            medium: string;
            small: string;
        };
    };
    media_preview?: string;
    providers?: {
        [key: string]: {
            collection_floor: number;
        };
    };
    rarity_index?: number;
    id?: number;
}