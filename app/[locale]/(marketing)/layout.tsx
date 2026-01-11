interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1 bg-white">{children}</main>
    </div>
  );
}

