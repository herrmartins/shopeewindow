import CategoryBand from "../components/categories/CategoryBand";

export default function ProductsLayout({ children }) {
  return (
    <div className="flex flex-col w-full">
      <CategoryBand />
      <main className="flex flex-col flex-grow px-4">
        {children}
      </main>
    </div>
  );
}
