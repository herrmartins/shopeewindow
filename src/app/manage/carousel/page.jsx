import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CarouselConfigForm from "../components/CarouselConfigForm";

const CarouselPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Acesso negado...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <CarouselConfigForm />
      </div>
    </div>
  );
};

export default CarouselPage;