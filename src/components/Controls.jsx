import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import {
  Field,
  FieldGroup,
  FieldDescription,
  FieldTitle,
  FieldLabel
} from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";

export default function Controls({ className, ...props }) {
  const [value, setValue] = useState([5]);
  const [kolamType, setKolamType] = useState('dotgrid');
  const [kolamShape, setKolamShape] = useState('square');

  const data = {value, kolamType}

  useEffect(() => { 
    window.kolamControlData = data;
  }, [data]);

  return (
    <div className="w-full grow flex">
      <FieldGroup>
        <Field orientation={"horizontal"}>
          <FieldTitle className="text-nowrap">Kolam Type</FieldTitle>
          <ToggleGroup type="single" variant="outline" size={"sm"} value={kolamType} onValueChange={setKolamType}>
            <ToggleGroupItem value="dotgrid" aria-label="Toggle dot grid kolam type" >
              Dot Grid
            </ToggleGroupItem>
            <ToggleGroupItem value="circular" aria-label="Toggle circular kolam type" disabled>
              Circular
            </ToggleGroupItem>
          </ToggleGroup>
        </Field>
        <Field orientation={"horizontal"}>
          <FieldTitle className="text-nowrap">Kolam Shape</FieldTitle>
          <ToggleGroup type="single" variant="outline" size={"sm"} value={kolamShape} onValueChange={setKolamShape}>
            <ToggleGroupItem value="square" aria-label="Toggle dot grid kolam type" >
              Square
            </ToggleGroupItem>
            <ToggleGroupItem value="rhombus" aria-label="Toggle circular kolam type" >
              Rhombus
            </ToggleGroupItem>
            <ToggleGroupItem value="star" aria-label="Toggle circular kolam type" >
              Star
            </ToggleGroupItem>
          </ToggleGroup>
        </Field>
        <Field orientation={"horizontal"}>
          <FieldTitle className="text-nowrap">Grid Size</FieldTitle>
          <Slider
            onValueChange={setValue}
            value={value}
            max={32}
            min={3}
            step={1}
            aria-label="Grid Size"
          />{" "}
          <span className="ml-auto font-medium">{value}</span>
        </Field>
      </FieldGroup>
    </div>
  );
}
