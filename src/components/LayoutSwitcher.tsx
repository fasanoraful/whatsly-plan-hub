import { Button } from "@/components/ui/button";
import { useLayout } from "@/contexts/LayoutContext";

const LayoutSwitcher = () => {
  const { layout, setLayout } = useLayout();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant={layout === 'default' ? 'default' : 'outline'}
        onClick={() => setLayout('default')}
      >
        Padrão
      </Button>
      <Button
        size="sm"
        variant={layout === 'minimal' ? 'default' : 'outline'}
        onClick={() => setLayout('minimal')}
      >
        Minimal
      </Button>
      <Button
        size="sm"
        variant={layout === 'compact' ? 'default' : 'outline'}
        onClick={() => setLayout('compact')}
      >
        Compacto
      </Button>
    </div>
  );
};

export default LayoutSwitcher;