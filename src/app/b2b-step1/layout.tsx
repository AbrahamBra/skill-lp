// Frozen snapshot — step 1 (design-eye only, pre-humanizer)
export default function B2BStep1Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body { background: #fafafa !important; }
      `}</style>
      {children}
    </>
  );
}
