'use server';

import { uploadToCloudinary } from '@/app/lib/claudinary';
import { getConfigModel } from '@/app/models/Config';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';

export default async function saveLogo(prevState, formData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return { status: 'error', message: 'Usuário não autenticado' };
    }

    const file = formData.get('logo');
    if (!file || file.size === 0) {
      return { status: 'error', message: 'Nenhum arquivo selecionado' };
    }

    // Upload para Cloudinary
    const logoUrl = await uploadToCloudinary(file, 'logos');

    // Salvar no banco
    const Config = await getConfigModel();
    await Config.findOneAndUpdate(
      { key: 'logoUrl' },
      { value: logoUrl },
      { upsert: true, new: true }
    );

    revalidatePath('/');

    return { status: 'success', message: 'Logo atualizado com sucesso' };
  } catch (error) {
    console.error('Erro ao salvar logo:', error);
    return { status: 'error', message: 'Erro ao salvar logo' };
  }
}