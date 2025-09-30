import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
   title: "Cases",
   description: "Cases",
}

export interface CasesListMock {
   projectName: string;
   brandLogo: string;
   gallery: string[];
   _id: string;
   _owner: string;
   companyName: string;
   projectDescription: string;
}

export const casesListMock: CasesListMock[] = [
   {
      projectName: 'BrightEdu Campaign - 1',
      brandLogo: '/images/image-1.png',
      gallery: ['/images/image-1.png', '/images/image-1.png'],
      _id: '4e471f21-bc0d-4119-9c37-d807169578e6',
      _owner: '15a1833c-783a-4131-b16b-258852f5e0d5',
      companyName: 'BrightEdu Learning',
      projectDescription: 'Creating a vibrant brand image for an e-learning platform targeting children and teenagers'
   },
   {
      projectName: 'BrightEdu Campaign - 2',
      brandLogo: '/images/image-2.png',
      gallery: ['/images/image-2.png', '/images/image-2.png'],
      _id: '4e471f21-bc0d-4119-9c37-d807169578e6',
      _owner: '15a1833c-783a-4131-b16b-258852f5e0d5',
      companyName: 'BrightEdu Learning',
      projectDescription: 'Creating a vibrant brand image for an e-learning platform targeting children and teenagers'
   },
   {
      projectName: 'BrightEdu Campaign - 3',
      brandLogo: '/images/image-3.png',
      gallery: ['/images/image-3.png', '/images/image-3.png'],
      _id: '4e471f21-bc0d-4119-9c37-d807169578e6',
      _owner: '15a1833c-783a-4131-b16b-258852f5e0d5',
      companyName: 'BrightEdu Learning',
      projectDescription: 'Creating a vibrant brand image for an e-learning platform targeting children and teenagers'
   },
   {
      projectName: 'BrightEdu Campaign - 4',
      brandLogo: '/images/image-4.png',
      gallery: ['/images/image-4.png', '/images/image-4.png'],
      _id: '4e471f21-bc0d-4119-9c37-d807169578e6',
      _owner: '15a1833c-783a-4131-b16b-258852f5e0d5',
      companyName: 'BrightEdu Learning',
      projectDescription: 'Creating a vibrant brand image for an e-learning platform targeting children and teenagers'
   }
]

export default async function Cases() {
   // const wixClient = await getWixClient()
   // const { items } = await wixClient.items.query('BrandingProjects').find()
   // console.log(items)
   return (
      <div className="flex gap-4">
         {casesListMock.map((item, idx) => (
            <div key={idx}>
               <Link href={`/cases/${item.projectName.replace(/ /g, '-')}`}>
                  <Image src={item.brandLogo} alt={item.projectName} width={100} height={100} />
               </Link>
            </div>
         ))}
      </div>
   )
}