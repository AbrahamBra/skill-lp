// Frozen snapshot — step 2 (design-eye + humanizer, pre-design-signature)
export default function B2BStep2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body { background: #fafafa !important; }
      `}</style>
      {children}
    </>
  );
}
