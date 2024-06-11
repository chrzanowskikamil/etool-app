'use client';
import { montserratFont } from '@/utils/font';
import { Toaster } from 'sonner';

const toastPosition = 'top-right';
const toastOffset = '52px';

export function ToasterProvider() {
  return (
    <Toaster
      toastOptions={{
        style: {
          fontFamily: `${montserratFont.style.fontFamily}`,
        },
      }}
      offset={toastOffset}
      position={toastPosition}
      richColors
      theme='dark'
    />
  );
}
