"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="bg-background" type="submit" disabled={pending}>
      Create Playlist
    </Button>
  );
};

export default SubmitBtn;
