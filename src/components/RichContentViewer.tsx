"use client"

import { quickStartViewerPlugins, RicosViewer, type RichContent } from '@wix/ricos';
import "@wix/ricos/css/all-plugins-viewer.css"

export function RichContentViewer({ richContent }: { richContent: RichContent }) {
   const plugins = quickStartViewerPlugins();
   return (
      <div className='rich-content-wrapper'>
         <RicosViewer
            plugins={plugins}
            content={richContent}
         />
      </div>
   )
}
