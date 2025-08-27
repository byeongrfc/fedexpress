import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
  targetFull: boolean;
  canAdd: boolean;
  canDelete: boolean;
  setCanAdd: (value: boolean) => void;
  setCanDelete: (value: boolean) => void;
  clearTargetAddress: () => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  setShowMap: (value: boolean) => void;
}

export default function MapActions({
  targetFull,
  canAdd,
  canDelete,
  setCanAdd,
  setCanDelete,
  clearTargetAddress,
  searchValue,
  setSearchValue,
  setShowMap,
}: Props) {
  return (
    <>
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 items-end w-max">
        <Input
          className="text-white"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          type="button"
          disabled={targetFull}
          className={cn(
            "px-2.5 py-1.5 bg-blue-500 text-white rounded-sm transition-all ease-linear duration-100 disabled:opacity-50",
            canAdd && "scale-125"
          )}
          onClick={() => {
            if (!targetFull) setCanAdd(!canAdd);
            setCanDelete(false);
          }}
        >
          Add
        </button>
        <button
          type="button"
          className={`px-2.5 py-1.5 bg-red-500 text-white rounded-sm transition-all ease-linear duration-100 ${
            canDelete ? "scale-125" : ""
          }`}
          onClick={() => {
            setCanDelete(!canDelete);
            setCanAdd(false);
          }}
        >
          Delete
        </button>
        <button
          type="button"
          className="px-2.5 py-1.5 bg-orange-500 text-white rounded-sm transition-all ease-linear duration-100"
          onClick={() => {
            clearTargetAddress();
            setCanAdd(false);
            setCanDelete(false);
          }}
        >
          Clear
        </button>
        <button
          type="button"
          className="px-2.5 py-1.5 bg-green-500 text-white rounded-sm transition-all ease-linear duration-100"
          onClick={() => {
            setShowMap(false);
            setCanAdd(false);
            setCanDelete(false);
          }}
        >
          Close
        </button>
      </div>
    </>
  );
}
