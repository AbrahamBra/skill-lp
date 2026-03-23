// src/app/b2b/layout.tsx
export default function B2BLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body { background: #fafafa !important; }
      `}</style>
      {children}
    </>
  );
}
