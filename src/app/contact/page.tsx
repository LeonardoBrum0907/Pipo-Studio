'use client';

import { HomePageSection } from "@/components/HomePageSection";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { submitContactFormAction } from "@/actions/contact";
import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
   const { pending } = useFormStatus();
   const t = useTranslations('contactPage');

   return (
      <Button
         type="submit"
         size="lg"
         className="bg-foreground-secondary text-white py-4"
         disabled={pending}
      >
         {pending ? t('form.submitting') : t('form.submit')}
      </Button>
   );
}

export default function Contact() {
   const t = useTranslations('contactPage');
   const formRef = useRef<HTMLFormElement>(null);
   const [state, formAction] = useActionState(submitContactFormAction, null);

   useEffect(() => {
      if (state?.success && formRef.current) {
         formRef.current.reset();
      }
   }, [state?.success]);

   return (
      <HomePageSection className="gap-4">
         <h1 className="text-foreground-secondary text-5xl md:text-6xl">{t('title')}</h1>
         <p>{t('description')}</p>

         <form ref={formRef} action={formAction} className="flex flex-col gap-8 mt-10">
            <div className="flex flex-col gap-2" >
               <label htmlFor="name">{t('form.fullName.label')}</label>
               <Input type="text" name="name" placeholder={t('form.fullName.placeholder')} className="h-14" />
            </div>
            <div className="flex flex-col gap-2" data-lag="0.1">
               <label htmlFor="email">{t('form.email.label')}</label>
               <Input type="email" name="email" placeholder={t('form.email.placeholder')} className="h-14" />
            </div>
            <div className="flex flex-col gap-2" data-lag="0.2">
               <label htmlFor="company">{t('form.company.label')}</label>
               <Input type="text" name="company" placeholder={t('form.company.placeholder')} className="h-14" />
            </div>
            <div className="flex flex-col gap-2" data-lag="0.3">
               <label htmlFor="segment">{t('form.segment.label')}</label>
               <Input type="text" name="segment" placeholder={t('form.segment.placeholder')} className="h-14" />
            </div>

            <div className="flex" data-lag="0.4">
               <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="employeeCount">{t('form.employeeCount.label')}</label>
                  <RadioGroup name="employeeCount" className="flex flex-col gap-4">
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="1" id="self-employed-professional" />
                        <Label htmlFor="self-employed-professional">{t('form.employeeCount.options.selfEmployed')}</Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="2-10" id="micro-business" />
                        <Label htmlFor="micro-business">{t('form.employeeCount.options.micro')}</Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="11-50" id="small-business" />
                        <Label htmlFor="small-business">{t('form.employeeCount.options.small')}</Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="51-200" id="medium-business" />
                        <Label htmlFor="medium-business">{t('form.employeeCount.options.medium')}</Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="200+" id="large-business" />
                        <Label htmlFor="large-business">{t('form.employeeCount.options.large')}</Label>
                     </div>
                  </RadioGroup>
               </div>
               <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="brandingInvestment">{t('form.brandingInvestment.label')}</label>
                  <RadioGroup name="brandingInvestment" className="flex flex-col gap-4">
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="10k" id="up-to-10k" />
                        <Label htmlFor="up-to-10k">{t('form.brandingInvestment.options.upTo10k')}</Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="10k-20k" id="10k-20k" />
                        <Label htmlFor="10k-20k">{t('form.brandingInvestment.options.10kTo20k')}</Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="20k-40k" id="20k-40k" />
                        <Label htmlFor="20k-40k">{t('form.brandingInvestment.options.20kTo40k')}</Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="40k+" id="40k+" />
                        <Label htmlFor="40k+">{t('form.brandingInvestment.options.over40k')}</Label>
                     </div>
                  </RadioGroup>
               </div>
            </div>

            <div className="flex flex-col gap-2" data-lag="0.5">
               <label htmlFor="challenges">{t('form.challenges.label')}</label>
               <Input type="text" name="challenges" placeholder={t('form.challenges.placeholder')} className="h-14" />
            </div>

            {state?.success && (
               <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                  <h3 className="font-semibold text-green-800">{t('form.success.title')}</h3>
                  <p className="text-green-700">{t('form.success.message')}</p>
               </div>
            )}

            {state && !state.success && state.error && (
               <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <h3 className="font-semibold text-red-800">{t('form.error.title')}</h3>
                  <p className="text-red-700">{state.error || t('form.error.message')}</p>
               </div>
            )}

            <div className="flex justify-end">
               <SubmitButton />
            </div>
         </form>
      </HomePageSection>
   )
}