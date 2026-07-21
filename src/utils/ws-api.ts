const apiUrl = process.env.BURGER_API_URL as string;
const wsBaseUrl = apiUrl.replace(/^http/, 'ws').replace(/\/api\/?$/, '');

export const FEED_WS_URL = `${wsBaseUrl}/orders/all`;
export const ORDERS_WS_URL = `${wsBaseUrl}/orders`;
