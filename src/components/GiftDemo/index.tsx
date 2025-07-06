import React from 'react';
import { Collectible } from '../../types';
import GiftListCard from '../GiftListCard';
import './GiftDemo.css';

const GiftDemo: React.FC = () => {
  // Тестовые данные подарков
  const demoGifts: Collectible[] = [
    {
      id: 1,
      telegram_gift_name: "Золотая монета",
      telegram_gift_title: "Золотая монета",
      telegram_gift_number: 1,
      rarity_index: 0.001,
      total_amount: 1000,
      media_preview: "https://via.placeholder.com/300x200/FFD700/000000?text=Золотая+монета",
      media: {
        lottie_anim: "https://assets2.lottiefiles.com/packages/lf20_UJNc2t.json",
        pics: {
          large: "https://via.placeholder.com/600x400/FFD700/000000?text=Золотая+монета",
          medium: "https://via.placeholder.com/300x200/FFD700/000000?text=Золотая+монета",
          small: "https://via.placeholder.com/150x100/FFD700/000000?text=Золотая+монета"
        }
      },
      attributes: {
        "color": {
          name: "Цвет",
          rarity: 0.1,
          readable_rarity: 10
        },
        "material": {
          name: "Материал",
          rarity: 0.05,
          readable_rarity: 5
        }
      },
      providers: {
        "opensea": {
          collection_floor: 0.5
        }
      }
    },
    {
      id: 2,
      telegram_gift_name: "Серебряная звезда",
      telegram_gift_title: "Серебряная звезда",
      telegram_gift_number: 2,
      rarity_index: 0.005,
      total_amount: 5000,
      media_preview: "https://via.placeholder.com/300x200/C0C0C0/000000?text=Серебряная+звезда",
      media: {
        lottie_anim: "https://assets5.lottiefiles.com/packages/lf20_2znxgjyt.json",
        pics: {
          large: "https://via.placeholder.com/600x400/C0C0C0/000000?text=Серебряная+звезда",
          medium: "https://via.placeholder.com/300x200/C0C0C0/000000?text=Серебряная+звезда",
          small: "https://via.placeholder.com/150x100/C0C0C0/000000?text=Серебряная+звезда"
        }
      },
      attributes: {
        "size": {
          name: "Размер",
          rarity: 0.15,
          readable_rarity: 15
        }
      }
    },
    {
      id: 3,
      telegram_gift_name: "Бриллиантовый кристалл",
      telegram_gift_title: "Бриллиантовый кристалл",
      telegram_gift_number: 3,
      rarity_index: 0.0001,
      total_amount: 100,
      media_preview: "https://via.placeholder.com/300x200/00FFFF/000000?text=Бриллиантовый+кристалл",
      media: {
        lottie_anim: "https://assets9.lottiefiles.com/packages/lf20_2znxgjyt.json",
        pics: {
          large: "https://via.placeholder.com/600x400/00FFFF/000000?text=Бриллиантовый+кристалл",
          medium: "https://via.placeholder.com/300x200/00FFFF/000000?text=Бриллиантовый+кристалл",
          small: "https://via.placeholder.com/150x100/00FFFF/000000?text=Бриллиантовый+кристалл"
        }
      },
      attributes: {
        "clarity": {
          name: "Чистота",
          rarity: 0.01,
          readable_rarity: 1
        },
        "cut": {
          name: "Огранка",
          rarity: 0.02,
          readable_rarity: 2
        }
      },
      providers: {
        "opensea": {
          collection_floor: 2.0
        },
        "rarible": {
          collection_floor: 1.8
        }
      }
    },
    {
      id: 4,
      telegram_gift_name: "Рубиновое сердце",
      telegram_gift_title: "Рубиновое сердце",
      telegram_gift_number: 4,
      rarity_index: 0.002,
      total_amount: 2000,
      media_preview: "https://via.placeholder.com/300x200/FF0000/FFFFFF?text=Рубиновое+сердце",
      media: {
        lottie_anim: "https://assets3.lottiefiles.com/packages/lf20_2znxgjyt.json",
        pics: {
          large: "https://via.placeholder.com/600x400/FF0000/FFFFFF?text=Рубиновое+сердце",
          medium: "https://via.placeholder.com/300x200/FF0000/FFFFFF?text=Рубиновое+сердце",
          small: "https://via.placeholder.com/150x100/FF0000/FFFFFF?text=Рубиновое+сердце"
        }
      }
    },
    {
      id: 5,
      telegram_gift_name: "Изумрудный лист",
      telegram_gift_title: "Изумрудный лист",
      telegram_gift_number: 5,
      rarity_index: 0.008,
      total_amount: 8000,
      media_preview: "https://via.placeholder.com/300x200/00FF00/000000?text=Изумрудный+лист",
      media: {
        lottie_anim: "https://assets7.lottiefiles.com/packages/lf20_2znxgjyt.json",
        pics: {
          large: "https://via.placeholder.com/600x400/00FF00/000000?text=Изумрудный+лист",
          medium: "https://via.placeholder.com/300x200/00FF00/000000?text=Изумрудный+лист",
          small: "https://via.placeholder.com/150x100/00FF00/000000?text=Изумрудный+лист"
        }
      }
    },
    {
      id: 6,
      telegram_gift_name: "Сапфировый океан",
      telegram_gift_title: "Сапфировый океан",
      telegram_gift_number: 6,
      rarity_index: 0.003,
      total_amount: 3000,
      media_preview: "https://via.placeholder.com/300x200/0000FF/FFFFFF?text=Сапфировый+океан",
      media: {
        lottie_anim: "https://assets1.lottiefiles.com/packages/lf20_2znxgjyt.json",
        pics: {
          large: "https://via.placeholder.com/600x400/0000FF/FFFFFF?text=Сапфировый+океан",
          medium: "https://via.placeholder.com/300x200/0000FF/FFFFFF?text=Сапфировый+океан",
          small: "https://via.placeholder.com/150x100/0000FF/FFFFFF?text=Сапфировый+океан"
        }
      }
    }
  ];

  return (
    <div className="gift-demo">
      <div className="demo-header">
        <h2>Демонстрация мини-карточек подарков</h2>
        <p>Нажмите на любую карточку, чтобы открыть модальное окно с подробной информацией и Lottie анимацией</p>
      </div>
      <GiftListCard giftList={demoGifts} />
    </div>
  );
};

export default GiftDemo; 