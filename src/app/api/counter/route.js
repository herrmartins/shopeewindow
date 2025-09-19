import { getConfigModel } from "../../models/Config";
import { NextResponse } from "next/server";
 
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const getOnly = searchParams.get('getOnly') === 'true';
 
    const Config = await getConfigModel();
    let totalConfig = await Config.findOne({ key: "visitor_count" });
    if (!totalConfig) {
      totalConfig = new Config({ key: "visitor_count", value: "0" });
      await totalConfig.save();
    }
    const currentTotal = parseInt(totalConfig.value);
 
    const todayDate = new Date().toISOString().slice(0, 10);
    let dailyConfig = await Config.findOne({ key: "visitor_count_daily" });
    if (!dailyConfig) {
      dailyConfig = new Config({
        key: "visitor_count_daily",
        value: JSON.stringify({ date: todayDate, count: 0 }),
      });
      await dailyConfig.save();
    }
 
    let dailyObj;
    try {
      dailyObj = JSON.parse(dailyConfig.value);
    } catch (e) {
      dailyObj = { date: todayDate, count: 0 };
    }
 
    if (dailyObj.date !== todayDate) {
      dailyObj.date = todayDate;
      dailyObj.count = 0;
    }
 
    if (!getOnly) {
      const newTotal = currentTotal + 1;
      totalConfig.value = newTotal.toString();
      await totalConfig.save();
 
      dailyObj.count = (dailyObj.count || 0) + 1;
      dailyConfig.value = JSON.stringify(dailyObj);
      await dailyConfig.save();
 
      return NextResponse.json({ count: newTotal, dailyCount: dailyObj.count });
    } else {
      return NextResponse.json({ count: currentTotal, dailyCount: dailyObj.count });
    }
  } catch (error) {
    console.error("Erro ao atualizar contador:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}