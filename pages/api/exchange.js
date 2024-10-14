import axios from 'axios';

export default async function handler(req, res) {
  const headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'origin': 'https://search.naver.com',
    'referer': 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%ED%99%98%EC%9C%A8%EA%B3%84%EC%82%B0',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  };

  const params = {
    'key': 'calculator',
    'pkid': '141',
    'q': '환율',
    'where': 'm',
    'u1': 'keb',
    'u6': 'standardUnit',
    'u7': '0',
    'u3': 'USD',
    'u4': 'KRW',
    'u8': 'down',
    'u2': '2',
  };

  try {
    const response = await axios.get('https://m.search.naver.com/p/csearch/content/qapirender.nhn', {
      params: params,
      headers: headers
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    res.status(500).json({ error: 'Failed to fetch exchange rate' });
  }
}

