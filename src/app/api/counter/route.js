import { getConfigModel } from "../../models/Config";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const getOnly = searchParams.get('getOnly') === 'true';

    const Config = await getConfigModel();
    let config = await Config.findOne({ key: "visitor_count" });

    if (!config) {
      config = new Config({ key: "visitor_count", value: "0" });
      await config.save();
    }

    const currentCount = parseInt(config.value);

    if (!getOnly) {
      // Incrementar contador apenas se não for apenas para leitura
      const newCount = currentCount + 1;
      config.value = newCount.toString();
      await config.save();
      return NextResponse.json({ count: newCount });
    } else {
      // Apenas retornar o contador atual
      return NextResponse.json({ count: currentCount });
    }
  } catch (error) {
    console.error("Erro ao atualizar contador:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}