import { getConfigModel } from '@/app/models/Config';

export default async function getLogo() {
  try {
    const Config = await getConfigModel();
    const config = await Config.findOne({ key: 'logoUrl' });
    return config ? config.value : '/shared/logo1.jpg';
  } catch (error) {
    console.error('Erro ao obter logo:', error);
    return '/shared/logo1.jpg';
  }
}