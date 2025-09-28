'use client'

import { Locale } from "@/i18n/config";
import { useTransition } from "react";
import { setUserLocale } from "@/services/locale";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./Select";
import { Languages } from "lucide-react";

interface LocaleSwitcherSelectProps {
   defaultValue: string;
   items: Array<{
      label: string;
      value: Locale;
   }>;
}

export function LocaleSwitcherSelect({ defaultValue, items }: LocaleSwitcherSelectProps) {
   const [isPending, startTransition] = useTransition();

   const handleChange = (locale: Locale) => {
      startTransition(() => {
         setUserLocale(locale);
      })
   }

   return (
      <Select
         defaultValue={defaultValue}
         onValueChange={(value) => handleChange(value as Locale)}
         disabled={isPending}
      >
         <SelectTrigger>
            <Languages />
         </SelectTrigger>
         <SelectContent>
            {items.map((item) => (
               <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}