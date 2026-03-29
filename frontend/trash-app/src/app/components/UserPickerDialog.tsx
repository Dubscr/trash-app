import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useCurrentUser } from "../context/CurrentUserContext";

export function UserPickerDialog() {
  const { currentUser, options, setCurrentUsername } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [draftUsername, setDraftUsername] = useState(currentUser.username);

  useEffect(() => {
    if (open) {
      setDraftUsername(currentUser.username);
    }
  }, [currentUser.username, open]);

  function handleSave() {
    setCurrentUsername(draftUsername);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded transition-colors"
          style={{
            color: "var(--ivory)",
            backgroundColor: "rgba(246, 247, 235, 0.12)",
          }}
        >
          <UserRound size={18} />
          <span>{currentUser.label}</span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        style={{
          backgroundColor: "var(--ivory)",
          color: "var(--fern)",
          borderColor: "var(--lavender-grey)",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "var(--fern)" }}>Choose current user</DialogTitle>
          <DialogDescription style={{ color: "var(--charcoal-brown)" }}>
            Uploads and the User Page will use this selected name.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <Select value={draftUsername} onValueChange={setDraftUsername}>
            <SelectTrigger
              aria-label="Select current user"
              style={{
                backgroundColor: "white",
                color: "var(--fern)",
                borderColor: "var(--lavender-grey)",
              }}
            >
              <SelectValue placeholder="Choose a user" />
            </SelectTrigger>
            <SelectContent
              style={{
                backgroundColor: "var(--ivory)",
                color: "var(--fern)",
                borderColor: "var(--lavender-grey)",
              }}
            >
              {options.map((option) => (
                <SelectItem key={option.username} value={option.username}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded transition-colors"
            style={{
              backgroundColor: "var(--fern)",
              color: "var(--ivory)",
            }}
          >
            Save user
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
