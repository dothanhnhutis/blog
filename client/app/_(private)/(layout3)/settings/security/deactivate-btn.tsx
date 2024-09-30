"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/components/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { disactivateAccount } from "@/app/actions";
import { LoaderPinwheelIcon } from "lucide-react";

const DeactivateBtn = () => {
  const { currentUser } = useAuthContext();
  const [open, setOpen] = React.useState<boolean>(false);
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      await disactivateAccount("/account/settings");
    },
    onSettled() {
      setOpen(false);
    },
  });
  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!isPending) setOpen(open);
      }}
    >
      <AlertDialogTrigger asChild>
        <Button
          disabled={currentUser?.role == "Admin"}
          className="rounded-full"
          variant="destructive"
        >
          Deactivate
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will deactivate your account. Your account must be
            activated when you sign in again
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => {
              mutate();
            }}
            className="bg-destructive hover:bg-destructive/80 text-foreground"
          >
            {isPending && (
              <LoaderPinwheelIcon className="h-4 w-4 animate-spin flex-shrink-0 mr-2" />
            )}
            Deactivate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeactivateBtn;
