import { ReactNode } from "react";
import { useLayout } from "@/contexts/LayoutContext";
import DefaultLayout from "@/layouts/DefaultLayout";
import MinimalLayout from "@/layouts/MinimalLayout";
import CompactLayout from "@/layouts/CompactLayout";

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const { layout } = useLayout();

  switch (layout) {
    case 'minimal':
      return <MinimalLayout>{children}</MinimalLayout>;
    case 'compact':
      return <CompactLayout>{children}</CompactLayout>;
    default:
      return <DefaultLayout>{children}</DefaultLayout>;
  }
};

export default LayoutWrapper;