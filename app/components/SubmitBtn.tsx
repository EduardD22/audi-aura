"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="bg-background hover:bg-background/90 "
      type="submit"
      disabled={pending}
    >
      {pending ? "Creating Playlist..." : "Create Playlist"}
    </Button>
  );
};

export default SubmitBtn;
