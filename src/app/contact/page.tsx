import { HomePageSection } from "@/components/HomePageSection";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { useTranslations } from "next-intl";

export default function Contact() {
   const t = useTranslations('contactPage');

   return (
      <HomePageSection className="gap-4">
         <h1 className="text-foreground-secondary text-5xl md:text-6xl">{t('title')}</h1>
         <p>{t('description')}</p>
         <form action="" className="flex flex-col gap-8 mt-10">
            <div className="flex flex-col gap-2">
               <label htmlFor="name">{t('form.fullName.label')}</label>
               <Input type="text" name="name" placeholder={t('form.fullName.placeholder')} className="h-14" />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="email">{t('form.email.label')}</label>
               <Input type="email" name="email" placeholder={t('form.email.placeholder')} className="h-14" />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="company">{t('form.company.label')}</label>
               <Input type="text" name="company" placeholder={t('form.company.placeholder')} className="h-14" />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="segment">{t('form.segment.label')}</label>
               <Input type="text" name="segment" placeholder={t('form.segment.placeholder')} className="h-14" />
            </div>

            <div className="flex">
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

            <div className="flex flex-col gap-2">
               <label htmlFor="challenges">{t('form.challenges.label')}</label>
               <Input type="text" name="challenges" placeholder={t('form.challenges.placeholder')} className="h-14" />
            </div>

            <div className="flex justify-end">
               <Button type="submit" size="lg" className="bg-foreground-secondary text-white py-4">{t('form.submit')}</Button>
            </div>
         </form>
      </HomePageSection>
   )
}