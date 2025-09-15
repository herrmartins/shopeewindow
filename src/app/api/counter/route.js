import { getConfigModel } from "../../models/Config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const Config = await getConfigModel();
    let config = await Config.findOne({ key: "visitor_count" });

    if (!config) {
      config = new Config({ key: "visitor_count", value: "1" });
      await config.save();
      return NextResponse.json({ count: 1 });
    }

    const count = parseInt(config.value) + 1;
    config.value = count.toString();
    await config.save();

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Erro ao atualizar contador:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}