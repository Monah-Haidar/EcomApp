import Config from 'react-native-config';
import {Product} from '../hooks/useProducts/useProducts';

export const notificationService = (product: Product) => {
  if (!Config.ONESIGNAL_API_KEY || !Config.ONESIGNAL_APP_ID) {
    console.error('OneSignal configuration missing');
    return;
  }

  const url =
    Config.ONESIGNAL_API_URL ||
    'https://api.onesignal.com/notifications?c=push';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: Config.ONESIGNAL_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      app_id: Config.ONESIGNAL_APP_ID,
      headings: {
        en: 'New Product Added',
      },
      contents: {
        en: `A new product has been added: ${product.title}`,
      },
      big_picture: `${Config.BASE_URL}${product.images[0]?.url}`,
      large_icon:
        'https://media.onesignal.com/automated_push_templates/price_drop_alert_template.png',
      url: `ecomapp://products/${product._id}`,
      included_segments: ['Active Subscriptions'],
    }),
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
};
