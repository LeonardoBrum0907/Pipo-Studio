import { HomePageSection } from "@/components/HomePageSection";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

export default function Contact() {
   return (
      <HomePageSection className="gap-4">
         <h1 className="text-foreground-secondary text-5xl md:text-6xl">Investment Proposal Form</h1>
         <p>
            This form is the first step to better understand the project's challenges and objectives, let's get started?
         </p>
         <form action="" className="flex flex-col gap-8 mt-10">
            <div className="flex flex-col gap-2">
               <label htmlFor="name">What is your full name?</label>
               <Input type="text" name="name" placeholder="Name" className="h-14" />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="name">Enter your best email</label>
               <Input type="text" name="email" placeholder="Email" className="h-14" />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="name">What is the name of your company?</label>
               <Input type="text" name="company" placeholder="Company" className="h-14" />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="name">What does your company do within the F&B sector? (ex.: coffee shop, ice cream shop, artisanal products, beverages, wellness, etc.)</label>
               <Input type="text" name="segment" placeholder="Segment" className="h-14" />
            </div>

            <div className="flex">
               <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="name">How many employees does your company currently have?</label>
                  <RadioGroup className="flex flex-col gap-4">
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="1" id="self-employed-professional" />
                        <Label htmlFor="self-employed-professional">Self-Employed Professional</Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="2-10" id="micro-business" />
                        <Label htmlFor="micro-business">Micro Business (2-10 employees)</Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="11-50" id="small-business" />
                        <Label htmlFor="small-business">Small Business (11-50 employees)</Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="51-200" id="medium-business" />
                        <Label htmlFor="medium-business">Medium Business (51-200 employees)</Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="200+" id="large-business" />
                        <Label htmlFor="large-business">Large Business (200+ employees)</Label>
                     </div>
                  </RadioGroup>
               </div>
               <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="name">How much do you currently invest in branding?</label>
                  <RadioGroup className="flex flex-col gap-4">
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="10k" id="up-to-10k" />
                        <Label htmlFor="up-to-10k">Up to R$10k</Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="10k-20k" id="10k-20k" />
                        <Label htmlFor="10k-20k">R$10k – 20k</Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="20k-40k" id="20k-40k" />
                        <Label htmlFor="20k-40k">R$20k – 40k</Label>
                     </div>
                     <div className="flex items-center gap-2">
                        <RadioGroupItem value="40k+" id="40k+" />
                        <Label htmlFor="40k+">More than R$40k</Label>
                     </div>
                  </RadioGroup>
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <label htmlFor="name">
                  What are the main challenges your brand is facing today?
               </label>
               <Input type="text" name="challenges" placeholder="Challenges" className="h-14" />
            </div>

            <div className="flex justify-end">
               <Button type="submit" size="lg" className="bg-foreground-secondary text-white py-4">Submit</Button>
            </div>
         </form>
      </HomePageSection>
   )
}