import { getDisplayValue } from "@/lib/utils";

interface UserSearchResultRowProps {
  label: string;
  value: string | undefined;
}

const UserSearchResultRow = ({ label, value }: UserSearchResultRowProps) => {
  return (
    <div className="flex justify-between text-sm gap-20">
      <span className="font-bold">{`${label}:`}</span>
      <span className="truncate max-w-[14remx]">{getDisplayValue(value)}</span>
    </div>
  );
};

export default UserSearchResultRow;
