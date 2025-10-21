import { useState } from "react";
import { cn } from "@/lib/utils";

import { Field, FieldDescription, FieldTitle } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";

export default function Controls({ className, ...props }) {
  const [value, setValue] = useState([5]);
  return (
    <div className="w-full grow flex">
      <Field>
        <FieldTitle>
          Grid Size <span className="ml-auto">{value}</span>
        </FieldTitle>
        <Slider
          onValueChange={setValue}
          value={value}
          max={32}
          min={3}
          step={1}
          aria-label="Grid Size"
        />
      </Field>
    </div>
  );
}
