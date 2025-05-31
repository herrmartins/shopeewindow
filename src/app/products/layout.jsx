import CategoryBand from "../components/categories/CategoryBand";

export default function ProductsLayout({ children }) {
  return (
    <>
      <CategoryBand />
      {children}
    </>
  );
}
