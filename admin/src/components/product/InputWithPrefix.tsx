// components/product/InputWithPrefix.tsx
import { Input } from "@/components/ui/input";

interface InputWithPrefixProps {
  id: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputWithPrefix({
  id,
  value,
  onChange,
}: InputWithPrefixProps) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1 text-gray-500">R$</span>
      <Input id={id} value={value} onChange={onChange} className="pl-10" />
    </div>
  );
}