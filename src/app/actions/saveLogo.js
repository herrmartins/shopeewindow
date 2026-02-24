'use server';

import { deleteFromLocalStorage, uploadToLocalStorage } from '@/app/lib/localStorage';
import { getConfigModel } from '@/app/models/Config';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';

export default async function saveLogo(prevState, formData) {
  let logoUrl;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return { status: 'error', message: 'Usuário não autenticado' };
    }

    const file = formData.get('logo');
    if (!file || file.size === 0) {
      return { status: 'error', message: 'Nenhum arquivo selecionado' };
    }

    if (!file.type?.startsWith('image/')) {
      return { status: 'error', message: 'Arquivo inválido. Envie uma imagem.' };
    }

    // Upload para local storage
    logoUrl = await uploadToLocalStorage(file, 'logos', {
      prefix: 'logo',
      normalizeImage: true,
    });

    // Salvar no banco
    const Config = await getConfigModel();
    const previousConfig = await Config.findOne({ key: 'logoUrl' }).lean();

    await Config.findOneAndUpdate(
      { key: 'logoUrl' },
      { value: logoUrl },
      { upsert: true, new: true }
    );

    if (
      previousConfig?.value &&
      previousConfig.value.startsWith('/uploads/logos/') &&
      previousConfig.value !== logoUrl
    ) {
      await deleteFromLocalStorage(previousConfig.value, 'logos');
    }

    revalidatePath('/');

    return { status: 'success', message: 'Logo atualizado com sucesso' };
  } catch (error) {
    console.error('Erro ao salvar logo:', error);

    if (logoUrl) {
      await deleteFromLocalStorage(logoUrl, 'logos');
    }

    return {
      status: 'error',
      message: 'Falha ao processar/salvar a imagem. O logo anterior foi mantido.',
    };
  }
}
